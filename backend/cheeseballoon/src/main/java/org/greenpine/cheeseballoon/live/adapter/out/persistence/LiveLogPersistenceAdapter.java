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
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class LiveLogPersistenceAdapter implements LivePort, CategoryPort {

    private final LiveLogRepository liveLogRepository;
    @Override
    public List<FindLivesResDto> findLives(FindLivesReqDto findLiveReqDto) {
        Optional<LiveLogEntity> entity = liveLogRepository.findById(1L);
        System.out.println(entity);
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
