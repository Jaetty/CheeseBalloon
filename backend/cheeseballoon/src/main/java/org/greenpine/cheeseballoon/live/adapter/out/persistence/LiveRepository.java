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
    @Query(value = "SELECT RANK, r.streamer_id AS streamerId, averageViewer, name, profile_url, platform, case when bookmark_id IS NULL then 'false' ELSE 'true' END AS bookmark\n" +
            "FROM (SELECT ROW_NUMBER() OVER(ORDER BY averageViewer DESC) RANK, s.streamer_id, averageViewer, NAME, profile_url, platform\n" +
            "FROM (SELECT live.streamer_id, round(avg(live_log.viewer_cnt),0) AS averageViewer\n" +
            "FROM (SELECT live_id, viewer_cnt FROM live_logs WHERE cycle_log_id in (SELECT cycle_log_id FROM cycle_logs WHERE cycle_dt BETWEEN :startDate AND :endDate)) AS live_log\n" +
            "inner join lives AS live ON live.live_id = live_log.live_id\n" +
            "GROUP BY streamer_id) AS r JOIN streamers AS s ON s.streamer_id=r.streamer_id WHERE s.platform LIKE :platform ) AS r LEFT OUTER JOIN (SELECT * FROM bookmarks WHERE member_id=:memberId) AS b ON r.streamer_id = b.streamer_id\n" +
            "ORDER BY rank LIMIT 300", nativeQuery = true)
    List<FindAvgViewerRankResDtoInterface> findAllAvgViewerRanking(LocalDateTime startDate, LocalDateTime endDate, String platform, Long memberId);

    // 모든 플랫폼에서 가장 많은 시청자 수 순위로 가져오기
    @Query(value = "SELECT RANK, r.streamer_id AS streamerId, topViewer, name, profile_url, platform, case when bookmark_id IS NULL then 'false' ELSE 'true' END AS bookmark\n" +
            "FROM (SELECT ROW_NUMBER() OVER(ORDER BY topViewer DESC) RANK, s.streamer_id, topViewer, NAME, profile_url, platform\n" +
            "FROM (SELECT live.streamer_id, MAX(live_log.viewer_cnt) AS topViewer\n" +
            "FROM (SELECT live_id, viewer_cnt FROM live_logs WHERE cycle_log_id in (SELECT cycle_log_id FROM cycle_logs WHERE cycle_dt BETWEEN :startDate AND :endDate)) AS live_log\n" +
            "inner join lives AS live ON live.live_id = live_log.live_id\n" +
            "GROUP BY streamer_id) AS r JOIN streamers AS s ON s.streamer_id=r.streamer_id WHERE s.platform LIKE :platform ) AS r LEFT OUTER JOIN (SELECT * FROM bookmarks WHERE member_id=:memberId) AS b ON r.streamer_id = b.streamer_id\n" +
            "ORDER BY rank LIMIT 300", nativeQuery = true)
    List<FindTopViewerRankResDtoInterface> findAllTopViewerRanking(LocalDateTime startDate, LocalDateTime endDate, String platform, Long memberId);

    // 팔로워 랭킹 조회
    @Query(value = "SELECT ROW_NUMBER() OVER(ORDER BY r.follower DESC, r.name ASC) AS rank, case when b.bookmark_id IS NULL then 'false' ELSE 'true' END AS bookmark, r.streamer_id AS streamerId, r.name, r.profile_url AS profileUrl, r.platform, r.follower\n" +
            "FROM (SELECT * FROM bookmarks WHERE member_id = :memberId) AS b\n" +
            "right outer JOIN (SELECT s.streamer_id, s.name, s.profile_url, s.platform, sl.follower FROM streamers  AS s,\n" +
            "(SELECT streamer_id, follower FROM streamer_logs WHERE reg_dt BETWEEN :startDate AND :endDate GROUP BY streamer_id) AS sl\n" +
            "WHERE sl.streamer_id = s.streamer_id AND s.platform LIKE :platform ORDER BY follower DESC LIMIT 300) AS r\n" +
            "ON b.streamer_id = r.streamer_id\n", nativeQuery = true)
    List<FindFollowerRankResDtoInterface> findFollowerRanking(LocalDateTime startDate, LocalDateTime endDate, String platform, Long memberId);

    // 시청률 랭킹 조회
    @Query(value = "SELECT RANK, r.streamer_id AS streamerId, rating, name, platform, profile_url, case when bookmark_id IS NULL then 'false' ELSE 'true' END AS bookmark\n" +
            "FROM (SELECT ROW_NUMBER() OVER(ORDER BY rating DESC) RANK, s.streamer_id, rating, NAME, profile_url, platform\n" +
            "FROM (SELECT live.streamer_id, round((viewer_cnt / (afreeca_viewer_cnt + chzzk_viewer_cnt)) * 100,2) AS rating\n" +
            "FROM (SELECT live_id, viewer_cnt, afreeca_viewer_cnt, chzzk_viewer_cnt FROM live_logs JOIN cycle_logs ON cycle_logs.cycle_log_id = live_logs.cycle_log_id WHERE cycle_dt BETWEEN :startDate AND :endDate) AS live_log\n" +
            "inner join lives AS live ON live.live_id = live_log.live_id\n" +
            "GROUP BY live.streamer_id) AS r JOIN streamers AS s ON s.streamer_id=r.streamer_id WHERE s.platform LIKE :platform ) AS r LEFT OUTER JOIN (SELECT * FROM bookmarks WHERE member_id=:memberId) AS b ON r.streamer_id = b.streamer_id\n" +
            "ORDER BY RANK LIMIT 300", nativeQuery = true)
    List<FindRatingRankResDtoInterface> findRatingRanking(LocalDateTime startDate, LocalDateTime endDate, String platform, Long memberId);

}
