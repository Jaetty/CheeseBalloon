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
    private final CycleLogRepository cycleLogRepository;

    @Override
    public List<FindLivesResDto> findLivesByCategory(FindLivesReqDto reqDto) {
        List<String> categoryStrs = reqDto.getCategories();
        int limit = reqDto.getLimit();
        int offset = reqDto.getOffset();
        List<LiveLogEntity> liveLogList = liveLogRepository.findByCycleLogAndCategory(categoryStrs, limit, offset );
        List<FindLivesResDto> res= new ArrayList<>();
        for(LiveLogEntity liveLog : liveLogList){
            CategoryEntity category = liveLog.getCategory();
            LiveEntity live = liveLog.getLive();
            StreamerEntity streamer = live.getStreamer();
            res.add(
                    FindLivesResDto.builder()
                            .liveId(live.getLiveId())
                            .liveLogId(liveLog.getLiveLogId())
                            .streamId(streamer.getStreamerId())
                            .thumbnailUrl(live.getThumbnailUrl())
                            .profileUrl(streamer.getProfileUrl())
                            .streamUrl(live.getStreamUrl())
                            .channelUrl(streamer.getChannelUrl())
                            .name(streamer.getName())
                            .viewerCnt(liveLog.getViewerCnt())
                            .platform(streamer.getPlatform())
                            .category(category.getCategory())
                            .title(liveLog.getTitle())
                            .build()
            );
        }
        return res;
    }

    @Override
    public List<FindLivesResDto> findLivesAll(FindLivesReqDto reqDto) {
        int limit = reqDto.getLimit();
        int offset = reqDto.getOffset();
        List<LiveLogEntity> liveLogList = liveLogRepository.findByCycleLog(limit, offset);
        List<FindLivesResDto> res= new ArrayList<>();
        for(LiveLogEntity liveLog : liveLogList){
            CategoryEntity category = liveLog.getCategory();
            LiveEntity live = liveLog.getLive();
            StreamerEntity streamer = live.getStreamer();
            res.add(
                    FindLivesResDto.builder()
                            .liveId(live.getLiveId())
                            .liveLogId(liveLog.getLiveLogId())
                            .streamId(streamer.getStreamerId())
                            .thumbnailUrl(live.getThumbnailUrl())
                            .profileUrl(streamer.getProfileUrl())
                            .streamUrl(live.getStreamUrl())
                            .channelUrl(streamer.getChannelUrl())
                            .name(streamer.getName())
                            .viewerCnt(liveLog.getViewerCnt())
                            .platform(streamer.getPlatform())
                            .category(category.getCategory())
                            .title(liveLog.getTitle())
                            .build()
            );
        }
        return res;
    }

    @Override
    public List<SearchLivesResDto> searchLives(SearchLivesReqDto reqDto) {
        String query = reqDto.getQuery();
        List<LiveLogEntity> liveLogEntities = liveLogRepository.searchByTitle(query);
        List<SearchLivesResDto> res = new ArrayList<>();
        for(LiveLogEntity liveLog : liveLogEntities){
            CategoryEntity category = liveLog.getCategory();
            LiveEntity live = liveLog.getLive();
            StreamerEntity streamer = live.getStreamer();
            res.add(
                    SearchLivesResDto.builder()
                            .liveId(live.getLiveId())
                            .liveLogId(liveLog.getLiveLogId())
                            .streamId(streamer.getStreamerId())
                            .thumbnailUrl(live.getThumbnailUrl())
                            .profileUrl(streamer.getProfileUrl())
                            .streamUrl(live.getStreamUrl())
                            .channelUrl(streamer.getChannelUrl())
                            .name(streamer.getName())
                            .viewerCnt(liveLog.getViewerCnt())
                            .platform(streamer.getPlatform())
                            .category(category.getCategory())
                            .title(liveLog.getTitle())
                            .build()
            );
        }
        return res;
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
