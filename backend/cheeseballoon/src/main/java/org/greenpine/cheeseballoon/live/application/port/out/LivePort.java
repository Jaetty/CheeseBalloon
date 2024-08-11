package org.greenpine.cheeseballoon.live.application.port.out;

import org.greenpine.cheeseballoon.live.application.port.in.dto.FindLivesReqDto;
import org.greenpine.cheeseballoon.live.application.port.in.dto.SearchLivesReqDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindLivesResDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.SearchLivesResDto;

import java.util.List;

public interface LivePort {
    List<FindLivesResDto> findLivesByCategory(FindLivesReqDto reqDto);
    List<FindLivesResDto> findLivesAll(FindLivesReqDto reqDto);

    List<SearchLivesResDto> searchLives(SearchLivesReqDto reqDto);

}
