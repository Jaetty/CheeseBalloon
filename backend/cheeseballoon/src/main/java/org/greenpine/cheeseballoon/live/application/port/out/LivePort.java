package org.greenpine.cheeseballoon.live.application.port.out;

import org.greenpine.cheeseballoon.live.application.port.in.dto.FindLivesReqDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindLivesResDto;

import java.util.List;

public interface LivePort {
    List<FindLivesResDto> findLives(FindLivesReqDto findLiveReqDto);
    List<FindLivesResDto> findLivesAll(FindLivesReqDto findLiveReqDto);
}
