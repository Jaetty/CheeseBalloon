package org.greenpine.cheeseballoon.streamer.application.service;

import lombok.RequiredArgsConstructor;
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
    public FindStreamerSummaryResDto streamerDetailSummary(Long streamerId, String[] dtCodes, LocalDateTime[] specificDates) {

        FindSummaryRankResDtoInterface curr = streamerPort.streamerDetailSummary(streamerId, dtCodes[0], specificDates[0], specificDates[1]);
        FindSummaryRankResDtoInterface before = streamerPort.streamerDetailSummary(streamerId, dtCodes[1], specificDates[2], specificDates[3]);

        FindStreamerSummaryResDto ret = new FindStreamerSummaryResDto(0,0,0,0,0,0,0,0,0D,0D);

        if(curr != null){
            ret.setRank(curr.getRank());
            ret.setDiff(curr.getRank());
            ret.setAvgViewer(curr.getAverageViewer());
            ret.setViewerDiff(curr.getAverageViewer());
            ret.setFollow(curr.getFollower());
            ret.setFollowDiff(curr.getFollower());
            ret.setRating(curr.getRating());
            ret.setRatingDiff(curr.getRating());
            ret.setTotalAirTime(curr.getTotalAirTime());
            ret.setTotalAirTime(curr.getTotalAirTime());
        }

        if(before != null){

            Double rating_diff = Math.round( (ret.getRating() - before.getRating()) *100 ) / 100.0;

            ret.setDiff( ret.getRank() -before.getRank());
            ret.setTimeDiff(ret.getTotalAirTime() - before.getTotalAirTime());
            ret.setViewerDiff(ret.getAvgViewer() - before.getAverageViewer());
            ret.setRatingDiff(rating_diff);
            ret.setFollowDiff(ret.getFollow() - before.getFollower());
        }

        return ret;
    }

    @Override
    public FindStreamerDetailResDto streamerDetail(Long streamerId, long memberId) {

        FindStreamerDetailResDto streamerEntity = streamerPort.streamerDetail(streamerId, memberId);

        return streamerEntity;
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
    public List<FindStreamerFollowDto> streamerDetailFollower(Long streamerId, LocalDateTime[] dates) {

        List<StreamerLogEntity> list = streamerPort.streamerDetailFollower(streamerId, dates[0], dates[1]);

        List<FindStreamerFollowDto> ret = new ArrayList<>();

        for(int i=0; i<list.size(); i++){
            ret.add(new FindStreamerFollowDto(list.get(i).getRegDt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")), list.get(i).getFollower()));
        }

        return ret;
    }

    @Override
    public FindStreamerViewerDto streamerDetailViewer(Long streamerId, LocalDateTime[] dates) {

        List<FindStreamerDailyViewerResDtoInterface> curr = streamerPort.streamerDetailViewer(streamerId, dates[0], dates[1]);
        List<FindStreamerDailyViewerResDtoInterface> before = streamerPort.streamerDetailViewer(streamerId, dates[2], dates[3]);

        List<DailyAvgViewer> dailyAvgViewer = new ArrayList<>();

        int curr_max = 0;
        int curr_avg = 0;

        if(!curr.isEmpty()){

            int sum = 0;
            int count = 0;

            for(FindStreamerDailyViewerResDtoInterface var : curr){
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

        if(!before.isEmpty()){

            int sum = 0;
            int count = 0;

            for(FindStreamerDailyViewerResDtoInterface var : before){

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
    public FindStreamerRatingDto streamerDetailRating(Long streamerId, LocalDateTime[] dates) {

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
    public FindStreamerCategoryDto streamerDetailCategory(Long streamerId, LocalDateTime[] dates) {

        List<FindStreamerCategoryResDtoInterface> list = streamerPort.streamerDetailCategory(streamerId, dates[0], dates[1]);
        List<DailyCategory> dailyCategories = new ArrayList<>();

        int totalTime = 0;

        for(FindStreamerCategoryResDtoInterface val : list){

            totalTime += val.getTime();
            dailyCategories.add(DailyCategory.builder().date(val.getDate()).time(val.getTime()).category(val.getCategory()).avgViewer(val.getAvgViewer()).build());

        }

        return FindStreamerCategoryDto.builder().totalTime(totalTime).dailyCategories(dailyCategories).build();
    }

    @Override
    public FindStreamerTimeDto streamerDetailTime(Long streamerId, String[] dtCodes, LocalDateTime[] dates, LocalDateTime[] specificDates) {

        List<FindTimeDetailResDtoInterface> timeResult = streamerPort.streamerDetailTime(streamerId, dates[0], dates[1]);

        List<DailyTime> dailyTimes = new ArrayList<>();

        for(FindTimeDetailResDtoInterface val : timeResult){
            dailyTimes.add( DailyTime.builder()
                    .date(val.getDate())
                    .totalAirTime(val.getTotalAirTime())
                    .build());
        }

        FindSummaryRankResDtoInterface curr = streamerPort.streamerDetailSummary(streamerId, dtCodes[0], specificDates[0], specificDates[1]);
        FindSummaryRankResDtoInterface before = streamerPort.streamerDetailSummary(streamerId, dtCodes[1], specificDates[2], specificDates[3]);

        FindStreamerTimeDto ret = new FindStreamerTimeDto(0,0,dailyTimes);

        if(curr != null){
            ret.setTotalTime(curr.getTotalAirTime());
            ret.setTimeDiff(curr.getTotalAirTime());
        }

        if(before != null){
            ret.setTimeDiff(ret.getTotalTime() - before.getTotalAirTime());
        }

        return ret;
    }

}
