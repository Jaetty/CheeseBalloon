package org.greenpine.cheeseballoon.live.adapter.out.persistence;

import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.FindTimeDetailResDtoInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

// 나중에 로그인 했을 때 member_id값을 토큰에서 가져와서 member_id 값에 맞게 조회하게 만들어야함.

public interface LiveRepository extends JpaRepository<LiveEntity,Long> {

//    @Query("SELECT LiveEntity FROM LiveEntity le where le.streamer.streamerId = :streamerId order by le.liveId ")
    LiveEntity findFirstByStreamer_StreamerIdOrderByLiveId(Long streamerId);

    @Query(value = "SELECT live_id AS liveId, SUM( CASE WHEN total_time IS NULL THEN 0 ELSE total_time END) AS totalAirTime, date FROM\n" +
            "(SELECT live_id, TIME_TO_SEC(TIMEDIFF(max_time, min_time)) AS total_time, date FROM\n" +
            "(SELECT lives.live_id, MIN(cycle_logs.cycle_dt) min_time,  MAX(cycle_logs.cycle_dt) max_time, DATE_FORMAT(cycle_dt, '%Y-%m-%d') AS date\n" +
            "FROM lives, live_logs, cycle_logs \n" +
            "WHERE lives.streamer_id = :streamerId AND lives.live_id = live_logs.live_id AND cycle_dt BETWEEN :startDate AND :endDate \n" +
            "AND cycle_logs.cycle_log_id = live_logs.cycle_log_id\n" +
            "GROUP BY live_id, date) AS temp) AS time_detail\n" +
            "GROUP BY DATE;", nativeQuery = true)
    List<FindTimeDetailResDtoInterface> findDetailTimeByDatesAndStreamerId(Long streamerId, LocalDateTime startDate, LocalDateTime endDate);

}
