package org.greenpine.cheeseballoon.streamer.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StreamerLogRepository extends JpaRepository<StreamerLogEntity,Long> {

    @Query("SELECT sl FROM StreamerLogEntity sl " +
            "WHERE sl.streamer.streamerId IN :streamers " +
            "AND (sl.streamer.streamerId, sl.regDt) IN " +
            "(SELECT sl2.streamer.streamerId, MAX(sl2.regDt) FROM StreamerLogEntity sl2 GROUP BY sl2.streamer.streamerId)")
    List<StreamerLogEntity> findStreamerLogEntitiesByNameSearch(List<Long> streamers);

}
