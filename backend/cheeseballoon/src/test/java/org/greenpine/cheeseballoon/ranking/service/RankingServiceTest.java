package org.greenpine.cheeseballoon.ranking.service;

import org.greenpine.cheeseballoon.global.utils.DateCalculator;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindAvgViewerRankingResDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindFollowerRankingResDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindRatingRankingResDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindTopViewerRankingResDto;
import org.greenpine.cheeseballoon.ranking.application.service.RankingService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
public class RankingServiceTest {

    @Autowired
    private RankingService rankingService;

    @Test
    void ratingTest(){

        LocalDateTime[] dates = DateCalculator.getPeriod(1);
        List<FindRatingRankingResDto> testData = rankingService.findRatingRanking(dates,"%", -1);

        StringBuilder sb = new StringBuilder();

        for(FindRatingRankingResDto val : testData){
            sb.append("값 : " + val.getRating() + " 랭크(차이) : " + val.getRank() + " " + val.getRankDiff() + " 이름&플랫폼 : " + val.getName() + " "+ val.getPlatform() +"\n");
        }

        System.out.println(sb.toString());

    }

    @Test
    void avgViewerTest(){
        LocalDateTime[] dates = DateCalculator.getPeriod(1);
        List<FindAvgViewerRankingResDto> testData = rankingService.findAvgViewerRanking(dates,"%", -1);

        StringBuilder sb = new StringBuilder();

        for(FindAvgViewerRankingResDto val : testData){
            sb.append("값 : " + val.getAverageViewer() + " 랭크(차이) : " + val.getRank() + " " + val.getRankDiff() + " 이름&플랫폼 : " + val.getName() + " "+ val.getPlatform() +"\n");
        }

        System.out.println(sb.toString());

    }

    @Test
    void topViewerTest(){
        LocalDateTime[] dates = DateCalculator.getPeriod(1);
        List<FindTopViewerRankingResDto> testData = rankingService.findTopViewerRanking(dates,"%", -1);

        StringBuilder sb = new StringBuilder();

        for(FindTopViewerRankingResDto val : testData){
            sb.append("값 : " + val.getTopViewer() + " 랭크(차이) : " + val.getRank() + " " + val.getRankDiff() + " 이름&플랫폼 : " + val.getName() + " "+ val.getPlatform() +"\n");
        }

        System.out.println(sb.toString());

    }

    @Test
    void followerTest(){
        LocalDateTime[] dates = DateCalculator.getSpecificPeriod(1);
        List<FindFollowerRankingResDto> testData = rankingService.findFollowerRanking(dates,"%", -1);

        StringBuilder sb = new StringBuilder();

        for(FindFollowerRankingResDto val : testData){
            sb.append("값 : " + val.getFollower() + " 랭크(차이) : " + val.getRank() + " " + val.getRankDiff() + " 이름&플랫폼 : " + val.getName() + " "+ val.getPlatform() +"\n");
        }

        System.out.println(sb.toString());

    }

}
