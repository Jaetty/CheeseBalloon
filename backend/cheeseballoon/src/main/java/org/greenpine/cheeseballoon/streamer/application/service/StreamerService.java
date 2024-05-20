package org.greenpine.cheeseballoon.streamer.application.service;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.global.utils.DateCalculator;
import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.*;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.*;
import org.greenpine.cheeseballoon.streamer.application.port.in.StreamerUsecase;
import org.greenpine.cheeseballoon.streamer.application.port.out.StreamerPort;
import org.greenpine.cheeseballoon.streamer.domain.StreamerLiveDomain;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
// 서비스는 유스케이스의 구현을 담당하고 Port를 사용함
public class StreamerService implements StreamerUsecase {

    private final StreamerPort streamerPort;

    @Override
    public List<FindSearchStreamerResDtoInterface> searchStreamer(String query, long memberId) {

        List<FindSearchStreamerResDtoInterface> result =  streamerPort.searchStreamersByName(query, memberId);

        return result;
    }

    @Override
    public FindStreamerDetailResDto streamerDetail(Long streamerId, long memberId) {

        FindStreamerDetailResDto ret = streamerPort.streamerDetail(streamerId, memberId);

        return ret;
    }

    @Override
    public FindStreamerDetailLiveResDto streamerDetailLive(Long streamerId) {

        StreamerLiveDomain liveDomain = streamerPort.streamerDetailLive(streamerId);
        liveDomain.liveCheck();

        FindStreamerDetailLiveResDto result = FindStreamerDetailLiveResDto.builder()
                .isLive(liveDomain.getLive())
                .streamerUrl(liveDomain.getStreamUrl())
                .thumbnailUrl(liveDomain.getThumbnailUrl())
                .build();


        return result;
    }

    @Override
    public List<FindStreamerFollowDto> streamerDetailFollower(Long streamerId, int date) {

        List<StreamerLogEntity> list = streamerPort.streamerDetailFollower(streamerId, date);

        List<FindStreamerFollowDto> ret = new ArrayList<>();

        for(int i=0; i<list.size(); i++){
            ret.add(new FindStreamerFollowDto(list.get(i).getRegDt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")), list.get(i).getFollower()));
        }

        return ret;
    }

    @Override
    public FindStreamerViewerDto streamerDetailViewer(Long streamerId, int date) {

        List<FindStreamerDailyViewerResDtoInterface>[] values = streamerPort.streamerDetailViewer(streamerId, date);

        List<DailyAvgViewer> dailyAvgViewer = new ArrayList<>();

        int curr_max = 0;
        int curr_avg = 0;

        if(!values[0].isEmpty()){

            int sum = 0;
            int count = 0;

            for(FindStreamerDailyViewerResDtoInterface var : values[0]){
                DailyAvgViewer temp = new DailyAvgViewer();
                temp.setViewer(var.getViewer());
                temp.setDate(var.getDate());
                temp.setMaxViewer(var.getMaxViewer());
                dailyAvgViewer.add(temp);

                curr_max = Math.max(curr_max,var.getMaxViewer());
                sum += var.getViewer();
                count++;
            }
            curr_avg = sum/count;
        }

        int before_max = 0;
        int before_avg = 0;

        if(!values[1].isEmpty()){

            int sum = 0;
            int count = 0;

            for(FindStreamerDailyViewerResDtoInterface var : values[1]){

                before_max = Math.max(before_max,var.getMaxViewer());
                sum += var.getViewer();
                count++;
            }
            before_avg = sum/count;
        }

        FindStreamerViewerDto dto = new FindStreamerViewerDto(curr_max, curr_max - before_max, curr_avg, curr_avg - before_avg, dailyAvgViewer);

        return dto;
    }

    @Override
    public FindStreamerRatingDto streamerDetailRating(Long streamerId, int date) {

        LocalDateTime[] dates = DateCalculator.getPeriod(date);

        StreamerEntity streamerEntity = streamerPort.findByStreamerId(streamerId);
        List<FindStreamerRatingResDtoInterface> list = streamerPort.streamerDetailRating(streamerId, dates[0], dates[1]);

        if(list.isEmpty()){
            return null;
        }

        List<DailyRate> dailyRates = new ArrayList<>();

        double totalRating = 0, platformRating = 0;
        int count = 0;

        if(streamerEntity.getPlatform() == 'C'){

            for(FindStreamerRatingResDtoInterface val : list){
                dailyRates.add(new DailyRate(val.getTotalRating(), val.getChzzkRating(), val.getDate()));
                totalRating += val.getTotalRating();
                platformRating += val.getChzzkRating();
                count++;
            }

        }
        else{

            for(FindStreamerRatingResDtoInterface val : list){
                dailyRates.add(new DailyRate(val.getTotalRating(), val.getSoopRating(), val.getDate()));
                totalRating += val.getTotalRating();
                platformRating += val.getSoopRating();
                count++;
            }

        }

        totalRating = Math.round(totalRating/count * 100)/100.0;
        platformRating = Math.round(platformRating/count * 100) / 100.0;

        return FindStreamerRatingDto.builder().dailyRates(dailyRates).totalRating(totalRating).platformRating(platformRating).build();
    }

    @Override
    public FindStreamerCategoryDto streamerDetailCategory(Long streamerId, int date) {

        LocalDateTime[] dates = DateCalculator.getPeriod(date);
        List<FindStreamerCategoryResDtoInterface> list = streamerPort.streamerDetailCategory(streamerId, dates[0], dates[1]);
        List<DailyCategory> dailyCategories = new ArrayList<>();

        int totalTime = 0;

        for(FindStreamerCategoryResDtoInterface val : list){

            totalTime += val.getTime();
            dailyCategories.add(DailyCategory.builder().date(val.getDate()).time(val.getTime()).category(val.getCategory()).avgViewer(val.getAvgViewer()).build());

        }

        return FindStreamerCategoryDto.builder().totalTime(totalTime).dailyCategories(dailyCategories).build();
    }

}
