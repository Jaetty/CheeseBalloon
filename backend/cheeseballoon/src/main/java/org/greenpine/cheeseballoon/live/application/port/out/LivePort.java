package org.greenpine.cheeseballoon.live.application.port.out;

import org.greenpine.cheeseballoon.live.adapter.out.persistence.FindBarchartDataResDtoInterface;
import org.greenpine.cheeseballoon.live.application.port.in.dto.FindLivesReqDto;
import org.greenpine.cheeseballoon.live.application.port.in.dto.SearchLivesReqDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindBarchartData;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindLivesResDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.SearchLivesResDto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface LivePort {
    List<FindLivesResDto> findLivesByCategory(FindLivesReqDto reqDto);
    List<FindLivesResDto> findLivesAll(FindLivesReqDto reqDto);
    List<SearchLivesResDto> searchLives(SearchLivesReqDto reqDto);

    List<FindBarchartDataResDtoInterface> findBarchartData(LocalDate startDate, LocalDate endDate);

}
