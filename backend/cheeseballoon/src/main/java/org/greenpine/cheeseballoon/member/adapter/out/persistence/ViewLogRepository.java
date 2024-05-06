package org.greenpine.cheeseballoon.member.adapter.out.persistence;

import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveEntity;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface ViewLogRepository  extends JpaRepository<ViewLogEntity,Long> {
    @Query(value ="SELECT view_logs.*, streamers.streamer_id, streamers.name, streamers.profile_url, live_logs.title, categories.category FROM view_logs "+
            "LEFT JOIN lives ON lives.live_id = view_logs.live_id "+
            "LEFT JOIN streamers ON streamers.streamer_id = lives.streamer_id "+
            "LEFT JOIN live_logs ON live_logs.live_log_id = view_logs.view_log_id "+
            "LEFT JOIN categories ON categories.category_id = live_logs.category_id "+
            "WHERE member_id = :memberId AND reg_dt >= :start AND reg_dt <= :end"
            , nativeQuery = true)
    List<ViewLogWithStream> findByMemberAndDateTime(Long memberId, LocalDateTime start, LocalDateTime end);
    ViewLogEntity findByLiveAndLiveLogAndMember(LiveEntity live, LiveLogEntity liveLog, MemberEntity member);

    long deleteByViewLogIdAndMember(Long viewLogId, MemberEntity member);
}
