package org.greenpine.cheeseballoon.live.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;

public interface LiveLogRepository extends JpaRepository<LiveLogEntity,Long> {
    @Query(value = "SELECT l.*, ll.* , s.*, c.category FROM lives l " +
            "LEFT JOIN live_logs AS ll ON l.live_id = ll.live_id "+
            "LEFT JOIN categories AS c ON ll.category_id = c.category_id "+
            "LEFT JOIN streamers AS s ON l.streamer_id = s.streamer_id "+
            "WHERE cycle_log_id = (SELECT cycle_log_id FROM cycle_logs ORDER BY cycle_log_id DESC LIMIT 1) "+
            //"AND l.is_live=1 " +
            "ORDER BY ll.viewer_cnt DESC " +
            "LIMIT :limit OFFSET :offset"
            , nativeQuery = true)
    List<LiveInfo> findByCycleLog(int limit, int offset);

    @Query(value = "SELECT l.*, ll.* , s.*, c.category FROM lives l " +
            "LEFT JOIN live_logs AS ll ON l.live_id = ll.live_id "+
            "LEFT JOIN categories AS c ON ll.category_id = c.category_id "+
            "LEFT JOIN streamers AS s ON l.streamer_id = s.streamer_id "+
            "WHERE cycle_log_id = (SELECT cycle_log_id FROM cycle_logs ORDER BY cycle_log_id DESC LIMIT 1) "+
            "AND category IN :categoryStrs " +
            //"AND l.is_live=1 " +
            "ORDER BY ll.viewer_cnt DESC " +
            "LIMIT :limit OFFSET :offset"
            , nativeQuery = true)
    List<LiveInfo> findByCycleLogAndCategory(List<String> categoryStrs, int limit, int offset);

    @Query(value = "SELECT l.*, ll.* , s.*, c.category FROM lives l " +
            "LEFT JOIN live_logs AS ll ON l.live_id = ll.live_id "+
            "LEFT JOIN categories AS c ON ll.category_id = c.category_id "+
            "LEFT JOIN streamers AS s ON l.streamer_id = s.streamer_id "+
            "WHERE cycle_log_id = (SELECT cycle_log_id FROM cycle_logs ORDER BY cycle_log_id DESC LIMIT 1) "+
            //"AND l.is_live=1 " +
            "AND ll.title LIKE CONCAT('%', :query, '%') "+
            "ORDER BY ll.viewer_cnt DESC "
            , nativeQuery = true)
    List<LiveInfo> searchByTitle(String query);
    @Query(value = "SELECT *, COUNT(*) as sum FROM live_logs GROUP BY category_id"
    , nativeQuery = true)
    List<Object[]> test();


}
