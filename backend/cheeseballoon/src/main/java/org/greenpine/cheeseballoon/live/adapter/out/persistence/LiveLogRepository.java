package org.greenpine.cheeseballoon.live.adapter.out.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface LiveLogRepository extends JpaRepository<LiveLogEntity,Long> {
    Page<LiveLogEntity> findByCycleLog(CycleLogEntity cycleLog, Pageable page); //limit offset추가
}
