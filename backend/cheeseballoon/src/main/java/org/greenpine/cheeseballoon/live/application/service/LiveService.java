package org.greenpine.cheeseballoon.live.application.service;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.live.application.port.in.CategoryUsecase;
import org.greenpine.cheeseballoon.live.application.port.in.LiveUsecase;
import org.greenpine.cheeseballoon.live.application.port.in.dto.FindLivesReqDto;
import org.greenpine.cheeseballoon.live.application.port.in.dto.SearchLivesReqDto;
import org.greenpine.cheeseballoon.live.application.port.out.CategoryPort;
import org.greenpine.cheeseballoon.live.application.port.out.LivePort;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindCategoriesResDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindHotCategoriesResDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindLivesResDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.SearchLivesResDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LiveService implements LiveUsecase, CategoryUsecase {

    private final LivePort livePort;
    private final CategoryPort categoryPort;

    @Override
    @Transactional
    public List<FindLivesResDto> findLives(FindLivesReqDto reqDto) {
        if(reqDto.getCategories() ==null || reqDto.getCategories().isEmpty()){
            List<FindLivesResDto> res = livePort.findLivesAll(reqDto);
            return res;
        }else{
            List<FindLivesResDto> res = livePort.findLivesByCategory(reqDto);
            return res;
        }
    }

    @Override
    @Transactional
    public List<SearchLivesResDto> searchLives(SearchLivesReqDto reqDto) {

        List<SearchLivesResDto> res=livePort.searchLives(reqDto);

        return res;
    }

    @Override
    public FindCategoriesResDto findCategories(String query) {
        return categoryPort.findCategories(query);
    }

    @Override
    public FindHotCategoriesResDto findHotCategories(int limit) {
        return categoryPort.findHotCategories(limit);
        /*List<String>categories = new ArrayList<>();
        categories.add("배그");
        categories.add("리그 오브 레전드");
        categories.add("보라");
        categories.add("버츄얼");
        categories.add("철권");
        categories.add("스타크래프트");
        categories.add("하스스톤");
        categories.add("스포츠");

        return FindHotCategoriesResDto.builder()
                .categories(categories)
                .build();*/
    }
}
