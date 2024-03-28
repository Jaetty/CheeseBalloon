package org.greenpine.cheeseballoon.live.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CycleLogRepository extends JpaRepository<CycleLogEntity,Long> {
    @Query(value="SELECT * FROM cycle_logs" +
            " ORDER BY cycle_log_id DESC limit 1"
            , nativeQuery = true)
    CycleLogEntity findLatestCycleLog();
}
