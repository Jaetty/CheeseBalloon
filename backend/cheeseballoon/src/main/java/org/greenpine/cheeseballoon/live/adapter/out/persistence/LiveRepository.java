package org.greenpine.cheeseballoon.live.adapter.out.persistence;

import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindAvgViewerRankResDtoInterface;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindFollowerRankResDtoInterface;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindTopViewerRankResDtoInterface;
import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.StreamerEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

// 나중에 로그인 했을 때 member_id값을 토큰에서 가져와서 member_id 값에 맞게 조회하게 만들어야함.

public interface LiveRepository extends JpaRepository<LiveEntity,Long> {

//    @Query("SELECT LiveEntity FROM LiveEntity le where le.streamer.streamerId = :streamerId order by le.liveId ")
    LiveEntity findFirstByStreamer_StreamerIdOrderByLiveId(Long streamerId);

    LiveEntity findByLiveId(Long liveId);

    // 모든 플랫폼에서 시청자 수 기준으로 가져오는 sql
    // 나중에 로그인 했을 때 member_id값을 토큰에서 가져와서 member_id 값에 맞게 조회하게 만들어야함.
    @Query(value = "SELECT ranksql.rank AS rank, ranksql.streamer_id AS streamerId, ranksql.name, ranksql.platform, ranksql.profile_url AS profileUrl, ranksql.viewer_cnt AS averageViewer, case when b.bookmark_id > 0 then 'TRUE' else 'FALSE' END AS bookmark\n" +
            "FROM \n" +
            "(SELECT ROW_NUMBER() OVER(ORDER BY viewer_cnt DESC) AS rank, live.live_id, live.streamer_id, live.live_origin_id, live.stream_url, live.thumbnail_url, live_log.live_log_id ,live_log.cycle_log_id, live_log.category_id, live_log.title, round(avg(live_log.viewer_cnt),0) AS viewer_cnt, s.name, s.platform, s.profile_url\n" +
            "FROM lives AS live\n" +
            "inner join (SELECT * FROM live_logs WHERE cycle_log_id in (SELECT cycle_log_id FROM cycle_logs WHERE cycle_dt BETWEEN :beforeDay AND :today))\n" +
            "live_log ON live.live_id = live_log.live_id, streamers s\n" +
            "WHERE s.streamer_id = live.streamer_id\n" +
            "GROUP BY live.streamer_id\n" +
            "ORDER BY viewer_cnt DESC\n" +
            "LIMIT 300) AS ranksql\n" +
            "LEFT OUTER JOIN\n" +
            "(SELECT * FROM bookmarks WHERE member_id = :memberId) AS b\n" +
            "ON ranksql.streamer_id = b.streamer_id", nativeQuery = true)
    List<FindAvgViewerRankResDtoInterface> findAllAvgViewerRanking(LocalDateTime beforeDay, LocalDateTime today, Long memberId);

    // 특정 플랫폼에서 시청자 수 기준으로 가져오는 sql
    @Query(value = "SELECT ranksql.rank AS rank, ranksql.streamer_id AS streamerId, ranksql.name, ranksql.platform, ranksql.profile_url AS profileUrl, ranksql.viewer_cnt AS averageViewer, case when b.bookmark_id > 0 then 'TRUE' else 'FALSE' END AS bookmark\n" +
            "FROM \n" +
            "(SELECT ROW_NUMBER() OVER(ORDER BY viewer_cnt DESC) AS rank, live.live_id, live.streamer_id, live.live_origin_id, live.stream_url, live.thumbnail_url, live_log.live_log_id ,live_log.cycle_log_id, live_log.category_id, live_log.title, round(avg(live_log.viewer_cnt),0) AS viewer_cnt, s.name, s.platform, s.profile_url\n" +
            "FROM lives AS live\n" +
            "inner join (SELECT * FROM live_logs WHERE cycle_log_id in (SELECT cycle_log_id FROM cycle_logs WHERE cycle_dt BETWEEN :beforeDay AND :today))\n" +
            "live_log ON live.live_id = live_log.live_id, streamers s\n" +
            "WHERE s.streamer_id = live.streamer_id AND s.platform = :platform\n" +
            "GROUP BY live.streamer_id\n" +
            "ORDER BY viewer_cnt DESC\n" +
            "LIMIT 300) AS ranksql\n" +
            "LEFT OUTER JOIN\n" +
            "(SELECT * FROM bookmarks WHERE member_id = :memberId) AS b\n" +
            "ON ranksql.streamer_id = b.streamer_id", nativeQuery = true)
    List<FindAvgViewerRankResDtoInterface> findAvgViewerRankingByPlatform(LocalDateTime beforeDay, LocalDateTime today, char platform, Long memberId);

    // 모든 플랫폼에서 가장 많은 시청자 수 순위로 가져오기
    @Query(value = "SELECT ranksql.rank AS rank, ranksql.streamer_id AS streamerId, ranksql.name, ranksql.platform, ranksql.profile_url AS profileUrl, ranksql.viewer_cnt AS topViewer, case when b.bookmark_id > 0 then 'TRUE' else 'FALSE' END AS bookmark\n" +
            "FROM \n" +
            "(SELECT ROW_NUMBER() OVER(ORDER BY viewer_cnt DESC) AS rank, live.live_id, live.streamer_id, live.live_origin_id, live.stream_url, live.thumbnail_url, live_log.live_log_id ,live_log.cycle_log_id, live_log.category_id, live_log.title, round(max(live_log.viewer_cnt),0) AS viewer_cnt, s.name, s.platform, s.profile_url\n" +
            "FROM lives AS live\n" +
            "inner join (SELECT * FROM live_logs WHERE cycle_log_id in (SELECT cycle_log_id FROM cycle_logs WHERE cycle_dt BETWEEN :beforeDay AND :today))\n" +
            "live_log ON live.live_id = live_log.live_id, streamers s\n" +
            "WHERE s.streamer_id = live.streamer_id\n" +
            "GROUP BY live.streamer_id\n" +
            "ORDER BY viewer_cnt DESC\n" +
            "LIMIT 300) AS ranksql\n" +
            "LEFT OUTER JOIN\n" +
            "(SELECT * FROM bookmarks WHERE member_id = :memberId) AS b\n" +
            "ON ranksql.streamer_id = b.streamer_id", nativeQuery = true)
    List<FindTopViewerRankResDtoInterface> findAllTopViewerRanking(LocalDateTime beforeDay, LocalDateTime today, Long memberId);

    // 특정 플랫폼에서 가장 많은 시청자 수 기준으로 가져오는 sql
    @Query(value = "SELECT ranksql.rank AS rank, ranksql.streamer_id AS streamerId, ranksql.name, ranksql.platform, ranksql.profile_url AS profileUrl, ranksql.viewer_cnt AS topViewer, case when b.bookmark_id > 0 then 'TRUE' else 'FALSE' END AS bookmark\n" +
            "FROM \n" +
            "(SELECT ROW_NUMBER() OVER(ORDER BY viewer_cnt DESC) AS rank, live.live_id, live.streamer_id, live.live_origin_id, live.stream_url, live.thumbnail_url, live_log.live_log_id ,live_log.cycle_log_id, live_log.category_id, live_log.title, round(max(live_log.viewer_cnt),0) AS viewer_cnt, s.name, s.platform, s.profile_url\n" +
            "FROM lives AS live\n" +
            "inner join (SELECT * FROM live_logs WHERE cycle_log_id in (SELECT cycle_log_id FROM cycle_logs WHERE cycle_dt BETWEEN :beforeDay AND :today))\n" +
            "live_log ON live.live_id = live_log.live_id, streamers s\n" +
            "WHERE s.streamer_id = live.streamer_id AND s.platform = :platform \n" +
            "GROUP BY live.streamer_id\n" +
            "ORDER BY viewer_cnt DESC\n" +
            "LIMIT 300) AS ranksql\n" +
            "LEFT OUTER JOIN\n" +
            "(SELECT * FROM bookmarks WHERE member_id = :memberId) AS b\n" +
            "ON ranksql.streamer_id = b.streamer_id", nativeQuery = true)
    List<FindTopViewerRankResDtoInterface> findTopViewerRankingByPlatform(LocalDateTime beforeDay, LocalDateTime today, char platform, Long memberId);

    @Query(value = "SELECT ROW_NUMBER() OVER(ORDER BY r.follower DESC, r.name ASC) AS rank, case when b.bookmark_id IS NOT NULL then 'TRUE' ELSE 'FALSE' END AS bookmark, r.streamer_id AS streamerId, r.name, r.profile_url AS profileUrl, r.platform, r.follower\n" +
            "FROM (SELECT * FROM bookmarks WHERE member_id = :memberId) AS b\n" +
            "right outer JOIN (SELECT s.streamer_id, s.name, s.profile_url, s.platform, sl.follower FROM streamers  AS s,\n" +
            "(SELECT streamer_id, follower FROM streamer_logs WHERE reg_dt BETWEEN :beforeDay AND :today GROUP BY streamer_id ORDER BY follower DESC) AS sl\n" +
            "WHERE sl.streamer_id = s.streamer_id LIMIT 300) AS r\n" +
            "ON b.streamer_id = r.streamer_id\n" +
            "ORDER BY r.follower DESC", nativeQuery = true)
    List<FindFollowerRankResDtoInterface> findFollowerRanking(LocalDateTime beforeDay, LocalDateTime today, Long memberId);

    @Query(value = "SELECT ROW_NUMBER() OVER(ORDER BY r.follower DESC, r.name ASC) AS rank, case when b.bookmark_id IS NOT NULL then 'TRUE' ELSE 'FALSE' END AS bookmark, r.streamer_id AS streamerId, r.name, r.profile_url AS profileUrl, r.platform, r.follower\n" +
            "FROM (SELECT * FROM bookmarks WHERE member_id = :memberId) AS b\n" +
            "right outer JOIN (SELECT s.streamer_id, s.name, s.profile_url, s.platform, sl.follower FROM streamers  AS s,\n" +
            "(SELECT streamer_id, follower FROM streamer_logs WHERE reg_dt BETWEEN :beforeDay AND :today GROUP BY streamer_id ORDER BY follower DESC) AS sl\n" +
            "WHERE sl.streamer_id = s.streamer_id AND s.platform = :platform LIMIT 300) AS r\n" +
            "ON b.streamer_id = r.streamer_id\n" +
            "ORDER BY r.follower DESC", nativeQuery = true)
    List<FindFollowerRankResDtoInterface> findFollowerRankingByPlatform(LocalDateTime beforeDay, LocalDateTime today, char platform, Long memberId);

}
