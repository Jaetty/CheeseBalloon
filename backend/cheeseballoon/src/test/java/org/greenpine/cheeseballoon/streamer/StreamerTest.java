package org.greenpine.cheeseballoon.streamer;

import org.greenpine.cheeseballoon.global.utils.DateCalculator;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveRepository;
import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.StatisticsRepository;
import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.*;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.DailyAvgViewer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class StreamerTest {

    @Autowired
    private StreamerRepository streamerRepository;
    @Autowired
    private StreamerLogRepository streamerLogRepository;
    @Autowired
    private StatisticsRepository statisticsRepository;
    @Autowired
    private LiveRepository liveRepository;

    @Test
    public void streamerDetailTest(){

        long streamerId = 3;
        long memberId = 3;

        FindStreamerDetailResDtoInterface ret = streamerRepository.findStreamerDetailByStreamerId(streamerId, memberId);

        System.out.println(ret.getStreamerId() +" " + ret.getName() + " " + ret.getBookmark());
    }

    @Test
    public void streamerSummaryTest(){

        long streamerId = 3;

        String[] dtCodes = DateCalculator.getDateCodes(1);
        LocalDateTime[] dates = DateCalculator.getSpecificPeriod(1);

        FindSummaryRankResDtoInterface currSummaryRank = statisticsRepository.findRankingByDtCodeAndStreamerIdAndDates(dtCodes[0], streamerId, dates[0], dates[1]);

        if (currSummaryRank == null){
            System.out.println("이번 주 데이터 없음");
        }
        else{
            System.out.println("랭크 : " + currSummaryRank.getRank() + " 평균 시청자 : " + currSummaryRank.getAverageViewer()
            + " 최대 시청자 : " + currSummaryRank.getTopViewer() + " 시청률 : " + currSummaryRank.getRating()
            + " 누적 방송 시간 : " + currSummaryRank.getTotalAirTime() + " 팔로워 : " + currSummaryRank.getFollower());
        }

    }

    @Test
    public void streamerViewerTest(){

        long streamer_id = 3;
        LocalDateTime[] dates = DateCalculator.getPeriod(1);

        System.out.println(LocalDateTime.now());

        List<FindStreamerDailyViewerResDtoInterface> ret = streamerRepository.findDailyViewer(streamer_id, dates[0], dates[1]);
        List<DailyAvgViewer> dailyAvgViewer = new ArrayList<>();

        for(LocalDate s = dates[0].toLocalDate(); !s.isEqual(dates[1].toLocalDate()); s = s.plusDays(1)){
            dailyAvgViewer.add(new DailyAvgViewer(s.toString(),0,0));
        }
        int index = 0;

        for(FindStreamerDailyViewerResDtoInterface val : ret){
            while (index < dailyAvgViewer.size()){
                if(dailyAvgViewer.get(index).getDate().toString().equals(val.getDate())){
                    dailyAvgViewer.get(index).setViewer(val.getViewer());
                    dailyAvgViewer.get(index++).setMaxViewer(val.getMaxViewer());
                    break;
                }
                index++;
            }
            System.out.println("값 : " + val.getMaxViewer() + " " + val.getViewer() + " date : " + val.getDate());
        }

        System.out.println(LocalDateTime.now());

    }

    @Test
    public void streamerCategoryTest(){

        long streamer_id = 3;
        LocalDateTime[] dates = DateCalculator.getPeriod(1);

        System.out.println(LocalDateTime.now());

        List<FindStreamerCategoryResDtoInterface> ret = streamerRepository.findCategoryInfo(streamer_id, dates[0], dates[1]);

        for(FindStreamerCategoryResDtoInterface val : ret){
            System.out.println("값 : " + val.getCategory() + " " + val.getAvgViewer() + " date : " + val.getDate());
        }

        System.out.println(LocalDateTime.now());

    }

    @Test
    public void streamerTimeTest(){

        long streamer_id = 3;
        LocalDateTime[] dates = DateCalculator.getPeriod(1);

        System.out.println(LocalDateTime.now());

        List<FindTimeDetailResDtoInterface> ret = liveRepository.findDetailTimeByDatesAndStreamerId(streamer_id, dates[0], dates[1]);

        for(FindTimeDetailResDtoInterface val : ret){
            System.out.println("값 : " + val.getTotalAirTime() + " " + val.getLiveId() + " date : " + val.getDate());
        }

        System.out.println(LocalDateTime.now());

    }

    @Test
    @Transactional
    public void streamerFollowerTest(){

        long streamer_id = 3;
        LocalDateTime[] dates = DateCalculator.getPeriod(1);

        System.out.println(LocalDateTime.now());

        StreamerEntity streamerEntity = streamerRepository.findByStreamerId(streamer_id);
        List<StreamerLogEntity> ret = streamerLogRepository.findStreamerLogEntitiesByStreamerAndRegDtBetween(streamerEntity, dates[0], dates[1]);

        for(StreamerLogEntity val : ret){
            System.out.println(val.getStreamer().getName() + " 팔로워 : " + val.getFollower() + " date : " + val.getRegDt().toLocalDate());
        }

        System.out.println(LocalDateTime.now());

    }

    @Test
    public void streamerRatingTest(){

        long streamer_id = 3;
        LocalDateTime[] dates = DateCalculator.getPeriod(1);

        System.out.println(LocalDateTime.now());

        List<FindStreamerRatingResDtoInterface> ret = streamerRepository.findRatingInfo(streamer_id, dates[0], dates[1]);

        for(FindStreamerRatingResDtoInterface val : ret){
            System.out.println("값 : " + val.getTotalRating() + " date : " + val.getDate());
        }

        System.out.println(LocalDateTime.now());

    }

}
