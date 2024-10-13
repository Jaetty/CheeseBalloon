package org.greenpine.cheeseballoon.streamer.adapter.out.persistence;

import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindStreamerDetailResDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface StreamerRepository extends JpaRepository<StreamerEntity,Long> {


    // 스트리머 PK 값으로 조회
    StreamerEntity findByStreamerId(Long id);

    @Query(value = "SELECT streamer.streamer_id AS streamerId, origin_id AS originId, name, profile_url AS profileUrl, channel_url AS channelUrl, platform, case when bookmark_id IS NULL then 'false' ELSE 'true' END AS bookmark\n" +
            "FROM (SELECT streamer_id, origin_id, name, profile_url, channel_url, platform FROM streamers WHERE streamer_id = :streamerId) AS streamer \n" +
            "LEFT outer JOIN bookmarks ON streamer.streamer_id = bookmarks.streamer_id AND bookmarks.member_id = :memberId", nativeQuery = true)
    FindStreamerDetailResDtoInterface findStreamerDetailByStreamerId(Long streamerId, Long memberId);

    // 스트리머 이름으로 스트리머 정보 가져오기 -> isLive도 가져와야해서 join이 있음
    @Query(value = "SELECT streamers.streamer_id AS streamerId, streamers.name, streamers.profile_url AS profileUrl, streamers.channel_url AS channelUrl, streamers.platform, streamer_logs.follower, case when bookmarks.bookmark_id IS NOT NULL then 'true' ELSE 'false' END AS bookmark, case when max(lives.is_live) = 1 then 'true' ELSE 'false' END  AS isLive\n" +
            "FROM streamers JOIN streamer_logs\n" +
            "on streamer_logs.streamer_id = streamers.streamer_id AND streamer_logs.reg_dt > DATE_SUB((SELECT MAX(reg_dt) FROM streamer_logs), INTERVAL 2 HOUR) AND streamers.`name` LIKE CONCAT('%',:query, '%')\n" +
            "JOIN lives on lives.streamer_id = streamers.streamer_id\n" +
            "LEFT OUTER JOIN bookmarks ON bookmarks.streamer_id = streamers.streamer_id AND bookmarks.member_id = :memberId \n" +
            "GROUP BY streamerId\n" +
            "LIMIT 30", nativeQuery = true)
    List<FindSearchStreamerResDtoInterface> findStreamerInfoByName(String query, Long memberId);

    @Query(value = "SELECT statistics.top_viewer AS maxViewer, statistics.average_viewer AS viewer, LEFT(dt_code,10) AS date FROM statistics WHERE streamer_id = :streamerId AND left(dt_code, 10) BETWEEN :beforeDay AND :today AND dt_code LIKE '%0'", nativeQuery = true)
    List<FindStreamerDailyViewerResDtoInterface> findDailyViewer(Long streamerId, LocalDate beforeDay, LocalDate today);

    @Query(value = "SELECT statistics.soop_rating AS soopRating, statistics.chzz_rating AS chzzkRating, statistics.rating AS totalRating, LEFT(dt_code,10) AS date FROM statistics WHERE streamer_id = :streamerId AND left(dt_code, 10) BETWEEN :beforeDay AND :today AND dt_code LIKE '%0';", nativeQuery = true)
    List<FindStreamerRatingResDtoInterface> findRatingInfo(Long streamerId, LocalDate beforeDay, LocalDate today);

    @Query(value = "SELECT TIME_TO_SEC(statistics.total_air_time) AS totalAirTime, LEFT(dt_code,10) AS date FROM statistics WHERE streamer_id = :streamerId AND left(dt_code, 10) BETWEEN :beforeDay AND :today AND dt_code LIKE '%0';", nativeQuery = true)
    List<FindTimeDetailResDtoInterface> findTimeInfo(Long streamerId, LocalDate beforeDay, LocalDate today);

    @Query(value = "SELECT COUNT(category) * 5 * 60 AS `time`, category, result.date, result.category_id AS categoryId, ROUND(AVG(result.viewer_cnt),0) AS avgViewer FROM categories JOIN\n" +
            "(SELECT c.cycle_dt, c.date, r.live_log_id, r.live_id, r.cycle_log_id, r.category_id, r.title, r.viewer_cnt, r.streamer_id, r.stream_url, r.thumbnail_url, r.is_live, r.`name`, r.profile_url, r.channel_url, r.platform FROM\n" +
            "(SELECT *, DATE(cycle_dt) AS date FROM cycle_logs WHERE cycle_dt BETWEEN :beforeDay AND :today) AS c JOIN\n" +
            "(SELECT ll.live_log_id, ll.live_id, ll.cycle_log_id, ll.category_id, ll.title, ll.viewer_cnt, l.streamer_id, l.stream_url, l.thumbnail_url, l.is_live, s.`name`, s.profile_url, s.channel_url, s.platform FROM live_logs AS ll, lives AS l, streamers AS s WHERE s.streamer_id = :streamerId AND l.streamer_id = :streamerId AND ll.live_id = l.live_id) \n" +
            "AS r ON r.cycle_log_id = c.cycle_log_id) AS result\n" +
            "ON categories.category_id = result.category_id\n" +
            "GROUP BY categoryId \n" +
            "ORDER BY `date`", nativeQuery = true)
    List<FindStreamerCategoryResDtoInterface> findCategoryInfo(Long streamerId, LocalDateTime beforeDay, LocalDateTime today);

}
