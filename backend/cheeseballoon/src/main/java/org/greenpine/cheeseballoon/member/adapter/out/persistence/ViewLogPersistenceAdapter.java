package org.greenpine.cheeseballoon.member.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.member.application.port.in.dto.AddViewLogReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.DeleteViewLogReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.FindViewLogReqDto;
import org.greenpine.cheeseballoon.member.application.port.out.ViewLogPort;
import org.greenpine.cheeseballoon.member.application.port.out.dto.FindViewLogResDto;
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

    }

    @Override
    public void deleteViewLog(DeleteViewLogReqDto reqDto) {

    }
}
