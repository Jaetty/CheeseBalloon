package org.greenpine.cheeseballoon.live.application.port.in;

import org.greenpine.cheeseballoon.live.application.port.in.dto.FindLivesReqDto;
import org.greenpine.cheeseballoon.live.application.port.in.dto.SearchLivesReqDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindLivesResDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.SearchLivesResDto;

import java.util.List;

public interface LiveUsecase {

    List<FindLivesResDto> findLives(FindLivesReqDto reqDto);
    List<SearchLivesResDto> searchLives(SearchLivesReqDto reqDto);

}
