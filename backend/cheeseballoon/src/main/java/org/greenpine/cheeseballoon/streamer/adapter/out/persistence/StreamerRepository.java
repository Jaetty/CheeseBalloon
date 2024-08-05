package org.greenpine.cheeseballoon.streamer.adapter.out.persistence;

import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindStreamerDetailResDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

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
    @Query(value = "SELECT case when b.bookmark_id IS NOT NULL then 'true' ELSE 'false' END AS bookmark, streamer.streamer_id AS streamerId, streamer.name, streamer.isLive, streamer.profile_url AS profileUrl, streamer.channel_url AS channelUrl, streamer.follower, streamer.platform  FROM\n" +
            "(SELECT * FROM bookmarks WHERE member_id = :memberId) AS b right outer JOIN\n" +
            "(SELECT s.streamer_id, s.NAME, li.is_live AS isLive, s.profile_url, s.channel_url ,sl.follower, s.platform\n" +
            "FROM streamers s JOIN (SELECT streamer_id, follower, reg_dt \n" +
            "\tFROM streamer_logs \n" +
            "\tWHERE (streamer_id, reg_dt) IN (SELECT streamer_id, max(reg_dt) AS reg_dt FROM streamer_logs GROUP BY streamer_id) ORDER BY reg_dt DESC) sl\n" +
            "on s.streamer_id = sl.streamer_id, lives AS li\n" +
            "WHERE NAME LIKE CONCAT('%', :query, '%') AND li.streamer_id = s.streamer_id GROUP BY s.streamer_id) AS streamer\n" +
            "ON streamer.streamer_id = b.streamer_id", nativeQuery = true)
    List<FindSearchStreamerResDtoInterface> findStreamerInfoByName(String query, Long memberId);

    @Query(value = "SELECT l.streamer_id, t.live_log_id, t.live_id, t.cycle_log_id, MAX(t.viewer_cnt) AS maxViewer, ROUND(AVG(t.viewer_cnt),0) AS viewer, t.date FROM lives AS l INNER JOIN \n" +
            "(SELECT live_log_id, live_id, ll.cycle_log_id, viewer_cnt, date FROM live_logs AS ll \n" +
            "inner JOIN (SELECT cycle_log_id, DATE_FORMAT(cycle_dt, '%Y-%m-%d')AS date \n" +
            "FROM cycle_logs WHERE cycle_dt BETWEEN :beforeDay AND :today) AS c \n" +
            "ON ll.cycle_log_id = c.cycle_log_id ORDER BY live_id) AS t \n" +
            "ON l.live_id = t.live_id\n" +
            "WHERE streamer_id = :streamerId GROUP BY streamer_id, date ORDER BY streamer_id", nativeQuery = true)
    List<FindStreamerDailyViewerResDtoInterface> findDailyViewer(Long streamerId, LocalDateTime beforeDay, LocalDateTime today);

    @Query(value = "SELECT DATE, ROUND(AVG(chzzkRating),2) AS chzzkRating, ROUND(AVG(afreecaRating),2) AS soopRating, ROUND(AVG(totalRating),2) AS totalRating FROM\n" +
            "(SELECT l.streamer_id, l.live_id, viewer_cnt, cycle_log_id, afreeca_viewer_cnt, chzzk_viewer_cnt, cycle_dt AS `dateTime`, DATE_FORMAT(cycle_dt, '%Y-%m-%d') AS `date`, (viewer_cnt / afreeca_viewer_cnt)*100 AS afreecaRating, (viewer_cnt / chzzk_viewer_cnt)*100 AS chzzkRating, ( viewer_cnt / (afreeca_viewer_cnt + chzzk_viewer_cnt)) * 100 AS totalRating FROM lives AS l JOIN\n" +
            "(SELECT ll.live_id, ll.viewer_cnt, ll.cycle_log_id, cycle.afreeca_viewer_cnt, chzzk_viewer_cnt, cycle.cycle_dt FROM live_logs AS ll \n" +
            "JOIN (SELECT * FROM cycle_logs WHERE cycle_dt BETWEEN :beforeDay AND :today) AS cycle \n" +
            "ON ll.cycle_log_id = cycle.cycle_log_id) AS result ON result.live_id = l.live_id\n" +
            "WHERE streamer_id = :streamerId) AS ratings\n" +
            "GROUP BY DATE", nativeQuery = true)
    List<FindStreamerRatingResDtoInterface> findRatingInfo(Long streamerId, LocalDateTime beforeDay, LocalDateTime today);

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
