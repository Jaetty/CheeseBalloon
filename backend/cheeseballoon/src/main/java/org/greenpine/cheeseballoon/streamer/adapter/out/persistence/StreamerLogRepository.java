package org.greenpine.cheeseballoon.streamer.adapter.out.persistence;

import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.FindFollowerRankResDtoInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface StreamerLogRepository extends JpaRepository<StreamerLogEntity,Long> {

    @Query("SELECT sl FROM StreamerLogEntity sl " +
            "WHERE sl.streamer.streamerId IN :streamers " +
            "AND (sl.streamer.streamerId, sl.regDt) IN " +
            "(SELECT sl2.streamer.streamerId, MAX(sl2.regDt) FROM StreamerLogEntity sl2 GROUP BY sl2.streamer.streamerId)")
    List<StreamerLogEntity> findStreamerLogEntitiesByNameSearch(List<Long> streamers);


    @Query(value = "SELECT ROW_NUMBER() OVER(ORDER BY r.follower DESC, r.name ASC) AS rank, case when b.bookmark_id IS NULL then 'false' ELSE 'true' END AS bookmark, r.streamer_id AS streamerId, r.name, r.profile_url AS profileUrl, r.platform, r.follower\n" +
            "FROM (SELECT * FROM bookmarks WHERE member_id = :memberId) AS b\n" +
            "right outer JOIN (SELECT s.streamer_id, s.name, s.profile_url, s.platform, sl.follower FROM streamers  AS s,\n" +
            "(SELECT streamer_id, follower FROM streamer_logs WHERE reg_dt BETWEEN :startDate AND :endDate GROUP BY streamer_id) AS sl\n" +
            "WHERE sl.streamer_id = s.streamer_id AND s.platform LIKE :platform ORDER BY follower DESC LIMIT 300) AS r\n" +
            "ON b.streamer_id = r.streamer_id\n", nativeQuery = true)
    List<FindFollowerRankResDtoInterface> findFollowerRanking(LocalDateTime startDate, LocalDateTime endDate, String platform, Long memberId);

    List<StreamerLogEntity> findStreamerLogEntitiesByStreamerAndRegDtBetween(StreamerEntity streamer, LocalDateTime start, LocalDateTime end);

}
