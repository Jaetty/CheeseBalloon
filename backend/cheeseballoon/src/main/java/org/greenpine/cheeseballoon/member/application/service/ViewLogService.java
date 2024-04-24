package org.greenpine.cheeseballoon.member.application.service;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.member.application.port.in.ViewLogUsecase;
import org.greenpine.cheeseballoon.member.application.port.in.dto.AddViewLogReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.DeleteViewLogReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.FindViewLogReqDto;
import org.greenpine.cheeseballoon.member.application.port.out.dto.FindViewLogResDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ViewLogService implements ViewLogUsecase {

    @Override
    public List<FindViewLogResDto> findViewLog(FindViewLogReqDto reqDto) {
        return null;
    }

    @Override
    public void addViewLog(AddViewLogReqDto reqDto) {

    }

    @Override
    public void deleteViewLog(DeleteViewLogReqDto reqDto) {

    }
}
