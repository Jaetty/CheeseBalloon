package org.greenpine.cheeseballoon.member.application.service;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.member.application.port.in.ViewLogUsecase;
import org.greenpine.cheeseballoon.member.application.port.in.dto.AddViewLogReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.DeleteViewLogReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.FindViewLogReqDto;
import org.greenpine.cheeseballoon.member.application.port.out.ViewLogPort;
import org.greenpine.cheeseballoon.member.application.port.out.dto.FindViewLogResDto;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ViewLogService implements ViewLogUsecase {
    private final ViewLogPort viewLogPort;

    @Override
    @Transactional
    public List<FindViewLogResDto> findViewLog(FindViewLogReqDto reqDto) {
        return viewLogPort.findViewLog(reqDto);
    }

    @Override
    @Transactional
    public void addViewLog(AddViewLogReqDto reqDto) {
        viewLogPort.addViewLog(reqDto);
    }

    @Override
    @Transactional
    public void deleteViewLog(DeleteViewLogReqDto reqDto) throws RuntimeException {
        long delCnt = viewLogPort.deleteViewLog(reqDto);
        if(delCnt==0L) throw new DuplicateKeyException("");
    }
}
