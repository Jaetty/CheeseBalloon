package org.greenpine.cheeseballoon.live.adapter.out.persistence;

import org.greenpine.cheeseballoon.live.application.port.out.dto.FindAvgViewerRankByStreamerIdAndDateDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.time.LocalDateTime;
import java.util.List;

public interface LiveLogRepository extends JpaRepository<LiveLogEntity,Long> {
    @Query(value = "SELECT * FROM live_logs " +
            "WHERE cycle_log_id = " +
            "(SELECT cycle_log_id FROM cycle_logs " +
            "ORDER BY cycle_log_id DESC LIMIT 1) "+
            "ORDER BY viewer_cnt DESC " +
            "LIMIT :limit OFFSET :offset "
            , nativeQuery = true)
    List<LiveLogEntity> findByCycleLog(int limit, int offset);

    @Query(value = "SELECT * FROM live_logs " +
            "WHERE category_id IN  " +
            "(select category_id from categories  " +
            "WHERE category IN  :categoryStrs) " +
            "AND cycle_log_id = " +
            "(SELECT cycle_log_id FROM cycle_logs " +
            "ORDER BY cycle_log_id DESC LIMIT 1) "+
            "ORDER BY viewer_cnt DESC " +
            "LIMIT :limit OFFSET :offset"
            , nativeQuery = true)
    List<LiveLogEntity> findByCycleLogAndCategory(List<String> categoryStrs, int limit, int offset);

    @Query(value = "SELECT ll.* FROM lives l, live_logs ll " +
            "WHERE l.live_id = ll.live_id "+
            "AND l.is_live=1 " +
            "AND ll.title LIKE CONCAT('%', :query, '%') "+
            "ORDER BY ll.viewer_cnt DESC "
            , nativeQuery = true)
    List<LiveLogEntity> searchByTitle(String query);

//    @Query(value = "SELECT r.rank, r.avg_viewer FROM lives l JOIN \n" +
//            "(SELECT ll.live_id, ROUND(AVG(ll.viewer_cnt),0) AS avg_viewer, RANK() OVER(ORDER BY avg_viewer DESC) AS Rank \n" +
//            "\tFROM live_logs AS ll JOIN (SELECT cycle_log_id FROM cycle_logs WHERE DATE_FORMAT(cycle_dt,'%Y-%m-%d') = :startDate) as cl on  cl.cycle_log_id =ll.cycle_log_id \n" +
//            "GROUP BY ll.live_id \n" +
//            "ORDER BY avg_viewer DESC\n" +
//            "LIMIT 500) r ON l.live_id = r.live_id\n" +
//            " WHERE streamer_id = :streamerId", nativeQuery = true)
//    FindAvgViewerRankByStreamerIdAndDateDto findAvgViewerRankByStreamerIdAndDate(Long streamerId, String startDate, String endDate);



}
