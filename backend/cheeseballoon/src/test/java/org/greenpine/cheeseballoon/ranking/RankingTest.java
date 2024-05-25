package org.greenpine.cheeseballoon.ranking;

import org.greenpine.cheeseballoon.global.utils.DateCalculator;
import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.*;
import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.StreamerLogRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@SpringBootTest
public class RankingTest {

    @Autowired
    private StatisticsRepository statisticsRepository;
    @Autowired
    private StreamerLogRepository streamerLogRepository;

    @Test
    void ratingTest(){

        String[] dtCodes = DateCalculator.getDateCodes(1);

        System.out.println("시작 시간 : " + LocalTime.now().getSecond() + "." + LocalTime.now().getNano());

        List<FindRatingRankResDtoInterface> testData = statisticsRepository.findRatingRanking(dtCodes[0], "%", -1L);

        StringBuilder sb = new StringBuilder();

        for(FindRatingRankResDtoInterface val : testData){
            sb.append("값 : " + val.getRating() + " 랭크(차이) : " + val.getRank() + " 이름&플랫폼 : " + val.getName() + " "+ val.getPlatform() +"\n");
        }

        System.out.println(sb.toString());
        System.out.println("종료 시간 : " + LocalTime.now().getSecond() + "." + LocalTime.now().getNano());

    }

    @Test
    void avgViewerTest(){
        String[] dtCodes = DateCalculator.getDateCodes(1);

        System.out.println("시작 시간 : " + LocalTime.now().getSecond() + "." + LocalTime.now().getNano());

        List<FindAvgViewerRankResDtoInterface> testData = statisticsRepository.findAverageViewerRanking(dtCodes[0],"%", -1L);

        StringBuilder sb = new StringBuilder();

        for(FindAvgViewerRankResDtoInterface val : testData){
            sb.append("값 : " + val.getAverageViewer() + " 랭크(차이) : " + val.getRank() +
                    " 스트리머 id : " + val.getStreamerId() + " 이름&플랫폼 : " + val.getName() + " "+ val.getPlatform() +"\n");
        }

        System.out.println(sb.toString());
        System.out.println("종료 시간 : " + LocalTime.now().getSecond() + "." + LocalTime.now().getNano());

    }

    @Test
    void topViewerTest(){
        String[] dtCodes = DateCalculator.getDateCodes(1);

        System.out.println("시작 시간 : " + LocalTime.now().getSecond() + "." + LocalTime.now().getNano());

        List<FindTopViewerRankResDtoInterface> testData = statisticsRepository.findTopViewerRanking(dtCodes[0],"%", -1L);

        StringBuilder sb = new StringBuilder();

        for(FindTopViewerRankResDtoInterface val : testData){
            sb.append("값 : " + val.getTopViewer() + " 랭크(차이) : " + val.getRank() + " 이름&플랫폼 : " + val.getName() + " "+ val.getPlatform() +"\n");
        }

        System.out.println(sb.toString());
        System.out.println("종료 시간 : " + LocalTime.now().getSecond() + "." + LocalTime.now().getNano());

    }

    @Test
    void followerTest(){
        LocalDateTime[] dates = DateCalculator.getSpecificPeriod(1);

        System.out.println("시작 시간 : " + LocalTime.now().getSecond() + "." + LocalTime.now().getNano());
        List<FindFollowerRankResDtoInterface> testData = streamerLogRepository.findFollowerRanking(dates[0], dates[1],"%", -1L);

        StringBuilder sb = new StringBuilder();

        for(FindFollowerRankResDtoInterface val : testData){
            sb.append("값 : " + val.getFollower() + " 랭크(차이) : " + val.getRank() + " 이름&플랫폼 : " + val.getName() + " "+ val.getPlatform() +"\n");
        }

        System.out.println(sb.toString());
        System.out.println("종료 시간 : " + LocalTime.now().getSecond() + "." + LocalTime.now().getNano());
    }

    @Test
    void totalAirTimeTest(){

        String[] dtCodes = DateCalculator.getDateCodes(1);

        System.out.println("시작 시간 : " + LocalTime.now().getSecond() + "." + LocalTime.now().getNano());
        List<FindTotalAirTimeRankResDtoInterface> testData = statisticsRepository.findTotalAirTimeRanking(dtCodes[0],"%", -1L);

        StringBuilder sb = new StringBuilder();

        for(FindTotalAirTimeRankResDtoInterface val : testData){
            sb.append("값 : " + val.getTotalAirTime() + " 랭크 " + val.getRank() + " " + val.getTotalAirTime() +" 이름&플랫폼 : " + val.getName() + " "+ val.getPlatform() +"\n");
        }

        System.out.println(sb.toString());
        System.out.println("종료 시간 : " + LocalTime.now().getSecond() + "." + LocalTime.now().getNano());

    }

}
