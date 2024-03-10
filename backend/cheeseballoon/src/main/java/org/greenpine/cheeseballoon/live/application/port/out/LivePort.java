package org.greenpine.cheeseballoon.live.application.port.out;

import org.greenpine.cheeseballoon.live.application.port.in.dto.FindLiveReqDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindLiveResDto;

import java.util.List;

public interface LivePort {
    List<FindLiveResDto> findLives(FindLiveReqDto findLiveReqDto);
    List<FindLiveResDto> findLivesAll(FindLiveReqDto findLiveReqDto);
}
