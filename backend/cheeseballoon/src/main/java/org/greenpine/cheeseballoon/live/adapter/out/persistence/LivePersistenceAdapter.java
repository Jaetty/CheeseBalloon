package org.greenpine.cheeseballoon.live.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.live.application.port.in.dto.FindLivesReqDto;
import org.greenpine.cheeseballoon.live.application.port.out.CategoryPort;
import org.greenpine.cheeseballoon.live.application.port.out.LivePort;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindCategoriesResDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindHotCategoriesResDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindLivesResDto;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class LivePersistenceAdapter implements LivePort, CategoryPort {

    //private final LiveRepository liveRepository;
    @Override
    public List<FindLivesResDto> findLives(FindLivesReqDto findLiveReqDto) {
        return null;
    }

    @Override
    public List<FindLivesResDto> findLivesAll(FindLivesReqDto findLiveReqDto) {
        return null;
    }

    @Override
    public FindCategoriesResDto findCategories(String query) {
        return null;
    }

    @Override
    public FindHotCategoriesResDto findHotCategories(int limit) {
        return null;
    }
}
