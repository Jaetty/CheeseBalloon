package org.greenpine.cheeseballoon.live.application.port.in;

import org.greenpine.cheeseballoon.live.application.port.in.dto.FindLiveReqDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindLiveResDto;

import java.util.List;

public interface LiveUsecase {

    List<FindLiveResDto> findLives(FindLiveReqDto findLiveReqDto);
}
