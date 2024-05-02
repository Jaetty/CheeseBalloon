package org.greenpine.cheeseballoon.member.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveEntity;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveLogEntity;
import org.greenpine.cheeseballoon.member.application.port.in.dto.AddViewLogReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.DeleteViewLogReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.FindViewLogReqDto;
import org.greenpine.cheeseballoon.member.application.port.out.ViewLogPort;
import org.greenpine.cheeseballoon.member.application.port.out.dto.FindViewLogResDto;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ViewLogPersistenceAdapter implements ViewLogPort {
    private final ViewLogRepository viewLogRepository;

    @Override
    public List<FindViewLogResDto> findViewLog(FindViewLogReqDto reqDto) {

        return null;
    }

    @Override
    public void addViewLog(AddViewLogReqDto reqDto) {
        LiveEntity live = LiveEntity.builder().liveId(reqDto.getLiveId()).build();
        LiveLogEntity liveLog = LiveLogEntity.builder().liveLogId(reqDto.getLiveLogId()).build();
        MemberEntity member = MemberEntity.builder().memberId(reqDto.getMemberId()).build();
        if(viewLogRepository.findByLiveAndLiveLogAndMember(live, liveLog, member) != null )return;
        
        ViewLogEntity viewLog = ViewLogEntity.builder()
                .live(live)
                .liveLog(liveLog)
                .member(member)
                .build();
        viewLogRepository.save(viewLog);

    }

    @Override
    public long deleteViewLog(DeleteViewLogReqDto reqDto) {
        MemberEntity member = MemberEntity.builder().memberId(reqDto.getMemberId()).build();
        return viewLogRepository.deleteByViewLogIdAndMember(reqDto.getViewLogId(), member);

    }
}
