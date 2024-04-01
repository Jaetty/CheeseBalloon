package org.greenpine.cheeseballoon.live.adapter.out.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


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



}
