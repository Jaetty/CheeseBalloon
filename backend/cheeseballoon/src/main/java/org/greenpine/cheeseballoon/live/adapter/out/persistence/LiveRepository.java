package org.greenpine.cheeseballoon.live.adapter.out.persistence;

import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindAvgViewerRankResDtoInterface;
import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.StreamerEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LiveRepository extends JpaRepository<LiveEntity,Long> {

//    @Query("SELECT LiveEntity FROM LiveEntity le where le.streamer.streamerId = :streamerId order by le.liveId ")
    LiveEntity findFirstByStreamer_StreamerIdOrderByLiveId(Long streamerId);

    LiveEntity findByLiveId(Long liveId);

    @Query(value = "SELECT ranksql.rank AS rank, ranksql.streamer_id AS streamerId, ranksql.name, ranksql.platform, ranksql.profile_url AS profileUrl, ranksql.viewer_cnt AS viewerCnt, case when b.bookmark_id > 0 then TRUE else FALSE END AS bookmark\n" +
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
            "(SELECT * FROM bookmarks WHERE member_id = -1) AS b\n" +
            "ON ranksql.streamer_id = b.streamer_id\n" +
            "LIMIT :limit OFFSET :off", nativeQuery = true)
    List<FindAvgViewerRankResDtoInterface> findAllAvgViewerRanking(int limit, int off, String beforeDay, String today);

    @Query(value = "SELECT ranksql.rank AS rank, ranksql.streamer_id AS streamerId, ranksql.name, ranksql.platform, ranksql.profile_url AS profileUrl, ranksql.viewer_cnt AS viewerCnt, case when b.bookmark_id > 0 then TRUE else FALSE END AS bookmark\n" +
            "FROM \n" +
            "(SELECT live.live_id, live.streamer_id, live.live_origin_id, live.stream_url, live.thumbnail_url, live_log.live_log_id ,live_log.cycle_log_id, live_log.category_id, live_log.title, round(avg(live_log.viewer_cnt),0) AS viewer_cnt, s.name, s.platform, s.profile_url\n" +
            "FROM lives AS live\n" +
            "inner join (SELECT * FROM live_logs WHERE cycle_log_id in (SELECT cycle_log_id FROM cycle_logs WHERE cycle_dt BETWEEN :beforeDay AND :today))\n" +
            "live_log ON live.live_id = live_log.live_id, streamers s\n" +
            "WHERE s.streamer_id = live.streamer_id AND s.platform = :platform\n" +
            "GROUP BY live.streamer_id\n" +
            "ORDER BY viewer_cnt DESC\n" +
            "LIMIT 300) AS ranksql\n" +
            "LEFT OUTER JOIN\n" +
            "(SELECT * FROM bookmarks WHERE member_id = -1) AS b\n" +
            "ON ranksql.streamer_id = b.streamer_id\n" +
            "ORDER BY viewer_cnt DESC\n" +
            "LIMIT :limit OFFSET :off", nativeQuery = true)
    List<FindAvgViewerRankResDtoInterface> findAvgViewerRankingByPlatform(int limit, int off, String beforeDay, String today, char platform);

}
