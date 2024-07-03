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

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ViewLogPersistenceAdapter implements ViewLogPort {
    private final ViewLogRepository viewLogRepository;

    @Override
    public List<FindViewLogResDto> findViewLog(FindViewLogReqDto reqDto) {
        Long memberId = reqDto.getMemberId();
        LocalDateTime start = LocalDateTime.of(reqDto.getStart(), LocalTime.MIN);
        LocalDateTime end = LocalDateTime.of(reqDto.getEnd(), LocalTime.MAX);
        List<ViewLogWithStream> viewLogs = viewLogRepository.findByMemberAndDateTime(memberId, start, end);

        return viewLogs.stream().map(v -> FindViewLogResDto.builder()
                .viewLogId(v.getView_log_id())
                .streamerId(v.getStreamer_id())
                .name(v.getName())
                .profileUrl(v.getProfile_url())
                .title(v.getTitle())
                .category(v.getCategory())
                .regDt(v.getReg_dt())
                .build()
        ).toList();
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
