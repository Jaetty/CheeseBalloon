package org.greenpine.cheeseballoon.member.application.port.in;

import org.greenpine.cheeseballoon.member.application.port.in.dto.AddViewLogReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.DeleteViewLogReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.FindViewLogReqDto;
import org.greenpine.cheeseballoon.member.application.port.out.dto.FindViewLogResDto;

import java.util.List;

public interface ViewLogUsecase {
    List<FindViewLogResDto> findViewLog(FindViewLogReqDto reqDto);

    void addViewLog(AddViewLogReqDto reqDto);

    void deleteViewLog(DeleteViewLogReqDto reqDto);
}
