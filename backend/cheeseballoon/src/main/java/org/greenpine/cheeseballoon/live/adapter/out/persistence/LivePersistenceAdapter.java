package org.greenpine.cheeseballoon.live.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.live.application.port.in.dto.FindLivesReqDto;
import org.greenpine.cheeseballoon.live.application.port.in.dto.SearchLivesReqDto;
import org.greenpine.cheeseballoon.live.application.port.out.CategoryPort;
import org.greenpine.cheeseballoon.live.application.port.out.LivePort;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindCategoriesResDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindHotCategoriesResDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindLivesResDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.SearchLivesResDto;
import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.StreamerEntity;
import org.springframework.stereotype.Repository;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class LivePersistenceAdapter implements LivePort, CategoryPort {

    private final LiveLogRepository liveLogRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public List<FindLivesResDto> findLivesByCategory(FindLivesReqDto reqDto) {
        List<String> categoryStrs = reqDto.getCategories();
        int limit = reqDto.getLimit();
        int offset = reqDto.getOffset();
        List<LiveInfo> liveInfos = liveLogRepository.findByCycleLogAndCategory(categoryStrs,limit, offset);

        return liveInfos.stream().map(li -> FindLivesResDto.builder()
                .liveId(li.getLive_id())
                .liveLogId(li.getLive_log_id())
                .streamerId(li.getStreamer_id())
                .thumbnailUrl(li.getThumbnail_url())
                .profileUrl(li.getProfile_url())
                .streamUrl(li.getStream_url())
                .channelUrl(li.getChannel_url())
                .name(li.getName())
                .viewerCnt(li.getViewer_cnt())
                .platform(li.getPlatform())
                .category(li.getCategory())
                .title(li.getTitle())
                .build()
        ).toList();
    }

    @Override
    public List<FindLivesResDto> findLivesAll(FindLivesReqDto reqDto) {
        int limit = reqDto.getLimit();
        int offset = reqDto.getOffset();
        List<LiveInfo> liveInfos = liveLogRepository.findByCycleLog(limit, offset);

        return liveInfos.stream().map(li -> FindLivesResDto.builder()
                .liveId(li.getLive_id())
                .liveLogId(li.getLive_log_id())
                .streamerId(li.getStreamer_id())
                .thumbnailUrl(li.getThumbnail_url())
                .profileUrl(li.getProfile_url())
                .streamUrl(li.getStream_url())
                .channelUrl(li.getChannel_url())
                .name(li.getName())
                .viewerCnt(li.getViewer_cnt())
                .platform(li.getPlatform())
                .category(li.getCategory())
                .title(li.getTitle())
                .build()
        ).toList();
    }

    @Override
    public List<SearchLivesResDto> searchLives(SearchLivesReqDto reqDto) {
        String query = reqDto.getQuery();
        List<LiveInfo> liveInfos = liveLogRepository.searchByTitle(query);

        return liveInfos.stream().map(li -> SearchLivesResDto.builder()
                .liveId(li.getLive_id())
                .liveLogId(li.getLive_log_id())
                .streamerId(li.getStreamer_id())
                .thumbnailUrl(li.getThumbnail_url())
                .profileUrl(li.getProfile_url())
                .streamUrl(li.getStream_url())
                .channelUrl(li.getChannel_url())
                .name(li.getName())
                .viewerCnt(li.getViewer_cnt())
                .platform(li.getPlatform())
                .category(li.getCategory())
                .title(li.getTitle())
                .build()
        ).toList();

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
        List<CategoryEntity> entities = categoryRepository.findHot(limit);
        List<String>categories = new ArrayList<>();
        for(CategoryEntity ce : entities){
            categories.add(ce.getCategory());
        }
        return FindHotCategoriesResDto.builder()
                .categories(categories)
                .build();

    }
}
