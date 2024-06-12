package org.greenpine.cheeseballoon.ranking.application.port.out;

import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.CycleLogEntity;

public interface CycleLogPort {
    CycleLogEntity findLatestCycleLog();
}
