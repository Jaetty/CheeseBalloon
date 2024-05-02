package org.greenpine.cheeseballoon.member.adapter.out.persistence;

import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveEntity;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ViewLogRepository  extends JpaRepository<ViewLogEntity,Long> {
    ViewLogEntity findByLiveAndLiveLogAndMember(LiveEntity live, LiveLogEntity liveLog, MemberEntity member);

    long deleteByViewLogIdAndMember(Long viewLogId, MemberEntity member);
}
