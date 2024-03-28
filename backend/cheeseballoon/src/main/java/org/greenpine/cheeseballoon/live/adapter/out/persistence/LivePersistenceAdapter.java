package org.greenpine.cheeseballoon.live.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.live.application.port.in.dto.FindLivesReqDto;
import org.greenpine.cheeseballoon.live.application.port.out.CategoryPort;
import org.greenpine.cheeseballoon.live.application.port.out.LivePort;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindCategoriesResDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindHotCategoriesResDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindLivesResDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class LivePersistenceAdapter implements LivePort, CategoryPort {

    private final LiveLogRepository liveLogRepository;
    private final CategoryRepository categoryRepository;
    private final CycleLogRepository cycleLogRepository;

    @Override
    public List<FindLivesResDto> findLives(FindLivesReqDto findLiveReqDto) {
        System.out.println("!!!!!!!!!!!!!!");
        return null;
    }

    @Override
    public List<FindLivesResDto> findLivesAll(FindLivesReqDto findLiveReqDto) {
        CycleLogEntity lastestCycle = cycleLogRepository.findLatestCycleLog();
        Pageable page=PageRequest.of(findLiveReqDto.getOffset(),findLiveReqDto.getLimit(), Sort.by("viewerCnt").descending());
        Page<LiveLogEntity> liveLogPage = liveLogRepository.findByCycleLog(lastestCycle,page);
        List<LiveLogEntity> liveLogList = liveLogPage.getContent();

        List<FindLivesResDto> res= new ArrayList<>();
        for(LiveLogEntity liveLog : liveLogList){
            CategoryEntity category = liveLog.getCategory();
            LiveEntity live = liveLog.getLive();
            res.add(
                    FindLivesResDto.builder()
                            .category(category.getCategory())
                            .title(liveLog.getTitle())
                            .build()
            );
        }
        return res;
    }

    @Override
    public List<FindLivesResDto> searchLives(FindLivesReqDto findLiveReqDto) {
        return null;
    }

    @Override
    public FindCategoriesResDto findCategories(String query) {
        List<CategoryEntity> entities = categoryRepository.findAllByQuery(query);
        List<String>categories = new ArrayList<>();
        for(CategoryEntity ce : entities){
            categories.add(ce.getCategory());
        }
        return FindCategoriesResDto.builder()
                .categories(categories)
                .build();
    }

    @Override
    public FindHotCategoriesResDto findHotCategories(int limit) {
        return null;
    }
}
