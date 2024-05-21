package org.greenpine.cheeseballoon.live.adapter.out.persistence;

import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.FindAvgViewerRankResDtoInterface;
import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.FindFollowerRankResDtoInterface;
import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.FindRatingRankResDtoInterface;
import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.FindTopViewerRankResDtoInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

// 나중에 로그인 했을 때 member_id값을 토큰에서 가져와서 member_id 값에 맞게 조회하게 만들어야함.

public interface LiveRepository extends JpaRepository<LiveEntity,Long> {

//    @Query("SELECT LiveEntity FROM LiveEntity le where le.streamer.streamerId = :streamerId order by le.liveId ")
    LiveEntity findFirstByStreamer_StreamerIdOrderByLiveId(Long streamerId);

    LiveEntity findByLiveId(Long liveId);

    // 모든 플랫폼에서 평균 시청자 수 기준으로 가져오는 sql
    @Query(value = "SELECT RANK, ranksql.streamer_id AS streamerId, averageViewer, profileUrl, platform, ranksql.name, case when bookmark_id IS NULL then 'false' ELSE 'true' END AS bookmark FROM \n" +
            "(SELECT ROW_NUMBER() OVER(ORDER BY averageViewer DESC) rank, live.streamer_id, ROUND(AVG(live_log.viewer_cnt),0) AS averageViewer, s.name, s.platform, s.profile_url AS profileUrl\n" +
            "FROM lives AS live\n" +
            "inner join (SELECT live_id, viewer_cnt FROM live_logs WHERE cycle_log_id in (SELECT cycle_log_id FROM cycle_logs WHERE cycle_dt BETWEEN :startDate AND :endDate))\n" +
            "live_log ON live.live_id = live_log.live_id, streamers s\n" +
            "WHERE s.streamer_id = live.streamer_id AND s.platform LIKE :platform \n" +
            "GROUP BY live.streamer_id\n" +
            "LIMIT 300) AS ranksql LEFT OUTER JOIN\n" +
            "(SELECT bookmark_id, streamer_id FROM bookmarks WHERE member_id = :memberId) AS b ON ranksql.streamer_id = b.streamer_id", nativeQuery = true)
    List<FindAvgViewerRankResDtoInterface> findAllAvgViewerRanking(LocalDateTime startDate, LocalDateTime endDate, char platform, Long memberId);

    // 모든 플랫폼에서 가장 많은 시청자 수 순위로 가져오기
    @Query(value = "SELECT RANK, ranksql.streamer_id AS streamerId, topViewer, profileUrl, platform, ranksql.name, case when bookmark_id IS NULL then 'false' ELSE 'true' END AS bookmark FROM \n" +
            "(SELECT ROW_NUMBER() OVER(ORDER BY topViewer DESC) rank, live.streamer_id, MAX(live_log.viewer_cnt) AS topViewer, s.name, s.platform, s.profile_url AS profileUrl\n" +
            "FROM lives AS live\n" +
            "inner join (SELECT live_id, viewer_cnt FROM live_logs WHERE cycle_log_id in (SELECT cycle_log_id FROM cycle_logs WHERE cycle_dt BETWEEN :startDate AND :endDate))\n" +
            "live_log ON live.live_id = live_log.live_id, streamers s\n" +
            "WHERE s.streamer_id = live.streamer_id AND s.platform LIKE :platform\n" +
            "GROUP BY live.streamer_id\n" +
            "LIMIT 300) AS ranksql LEFT OUTER JOIN\n" +
            "(SELECT bookmark_id, streamer_id FROM bookmarks WHERE member_id = :memberId) AS b ON ranksql.streamer_id = b.streamer_id", nativeQuery = true)
    List<FindTopViewerRankResDtoInterface> findAllTopViewerRanking(LocalDateTime startDate, LocalDateTime endDate, char platform, Long memberId);

    // 팔로워 랭킹 조회
    @Query(value = "SELECT ROW_NUMBER() OVER(ORDER BY r.follower DESC, r.name ASC) AS rank, case when b.bookmark_id IS NULL then 'false' ELSE 'true' END AS bookmark, r.streamer_id AS streamerId, r.name, r.profile_url AS profileUrl, r.platform, r.follower\n" +
            "FROM (SELECT * FROM bookmarks WHERE member_id = :memberId) AS b\n" +
            "right outer JOIN (SELECT s.streamer_id, s.name, s.profile_url, s.platform, sl.follower FROM streamers  AS s,\n" +
            "(SELECT streamer_id, follower FROM streamer_logs WHERE reg_dt BETWEEN :startDate AND :endDate GROUP BY streamer_id ORDER BY follower DESC LIMIT 300) AS sl\n" +
            "WHERE sl.streamer_id = s.streamer_id AND s.platform LIKE :platform) AS r\n" +
            "ON b.streamer_id = r.streamer_id\n", nativeQuery = true)
    List<FindFollowerRankResDtoInterface> findFollowerRanking(LocalDateTime startDate, LocalDateTime endDate, char platform, Long memberId);

    // 시청률 랭킹 조회
    @Query(value = "SELECT RANK, rating.streamer_id AS streamerId, name, platform, profile_url AS profileUrl, case when bookmark_id IS NULL then 'false' ELSE 'true' END AS bookmark, rating FROM\n" +
            "(SELECT ROW_NUMBER() OVER (ORDER BY rating DESC) AS RANK, s.streamer_id, s.name, s.profile_url, s.channel_url, s.platform, ROUND(rating, 2) as rating FROM\n" +
            "((SELECT l.streamer_id, viewer_cnt, (viewer_cnt / (afreeca_viewer_cnt + chzzk_viewer_cnt)) * 100 AS rating FROM lives AS l \n" +
            "JOIN (SELECT ll.live_id, ll.viewer_cnt, ll.cycle_log_id, cycle.afreeca_viewer_cnt, chzzk_viewer_cnt, cycle.cycle_dt FROM live_logs AS ll \n" +
            "JOIN (SELECT cycle_log_id, cycle_dt, afreeca_viewer_cnt, chzzk_viewer_cnt FROM cycle_logs WHERE cycle_dt BETWEEN :startDate AND :endDate) AS cycle ON ll.cycle_log_id = cycle.cycle_log_id) AS result \n" +
            "ON result.live_id = l.live_id GROUP BY streamer_id) AS r JOIN\n" +
            "(SELECT * FROM streamers WHERE platform LIKE :platform) AS s ON s.streamer_id = r.streamer_id ) LIMIT 300) AS rating LEFT OUTER JOIN\n" +
            "(SELECT bookmark_id, streamer_id FROM bookmarks WHERE member_id = :memberId) as book ON book.streamer_id = rating.streamer_id", nativeQuery = true)
    List<FindRatingRankResDtoInterface> findRatingRanking(LocalDateTime startDate, LocalDateTime endDate, char platform, Long memberId);

}
