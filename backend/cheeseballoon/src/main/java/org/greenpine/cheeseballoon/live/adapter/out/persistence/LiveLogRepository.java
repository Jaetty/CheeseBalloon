package org.greenpine.cheeseballoon.live.adapter.out.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;

public interface LiveLogRepository extends JpaRepository<LiveLogEntity,Long> {
    Page<LiveLogEntity> findByCycleLog(CycleLogEntity cycleLog, Pageable page);
    @Query(value = "SELECT * " +
            "FROM  live_logs " +
            "WHERE cycle_log_id = :cycleLogId " +
            "AND category_id in :categoryIds " +
            "LIMIT :limit OFFSET :offset"
            , nativeQuery = true)
    List<LiveLogEntity> findByCycleLogAndCategory(Long cycleLogId, List<Long> categoryIds, int limit, int offset);
}
