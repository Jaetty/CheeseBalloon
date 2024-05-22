package org.greenpine.cheeseballoon.ranking;

import org.greenpine.cheeseballoon.global.utils.DateCalculator;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveRepository;
import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.FindAvgViewerRankResDtoInterface;
import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.FindFollowerRankResDtoInterface;
import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.FindRatingRankResDtoInterface;
import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.FindTopViewerRankResDtoInterface;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
public class RankingTest {

    @Autowired
    private LiveRepository liveRepository;

    @Test
    void ratingTest(){

        LocalDateTime[] dates = DateCalculator.getPeriod(1);

        List<FindRatingRankResDtoInterface> testData = liveRepository.findRatingRanking(dates[0], dates[1],"%", -1L);

        StringBuilder sb = new StringBuilder();

        for(FindRatingRankResDtoInterface val : testData){
            sb.append("값 : " + val.getRating() + " 랭크(차이) : " + val.getRank() + " 이름&플랫폼 : " + val.getName() + " "+ val.getPlatform() +"\n");
        }

        System.out.println(sb.toString());

    }

    @Test
    void avgViewerTest(){
        LocalDateTime[] dates = DateCalculator.getPeriod(1);

        List<FindAvgViewerRankResDtoInterface> testData = liveRepository.findAllAvgViewerRanking(dates[0], dates[1],"%", -1L);

        StringBuilder sb = new StringBuilder();

        for(FindAvgViewerRankResDtoInterface val : testData){
            sb.append("값 : " + val.getAverageViewer() + " 랭크(차이) : " + val.getRank() + " 이름&플랫폼 : " + val.getName() + " "+ val.getPlatform() +"\n");
        }

        System.out.println(sb.toString());

    }

    @Test
    void topViewerTest(){
        LocalDateTime[] dates = DateCalculator.getPeriod(1);

        List<FindTopViewerRankResDtoInterface> testData = liveRepository.findAllTopViewerRanking(dates[0], dates[1],"%", -1L);

        StringBuilder sb = new StringBuilder();

        for(FindTopViewerRankResDtoInterface val : testData){
            sb.append("값 : " + val.getTopViewer() + " 랭크(차이) : " + val.getRank() + " 이름&플랫폼 : " + val.getName() + " "+ val.getPlatform() +"\n");
        }

        System.out.println(sb.toString());

    }

    @Test
    void followerTest(){
        LocalDateTime[] dates = DateCalculator.getPeriod(1);

        List<FindFollowerRankResDtoInterface> testData = liveRepository.findFollowerRanking(dates[0], dates[1],"%", -1L);

        StringBuilder sb = new StringBuilder();

        for(FindFollowerRankResDtoInterface val : testData){
            sb.append("값 : " + val.getFollower() + " 랭크(차이) : " + val.getRank() + " 이름&플랫폼 : " + val.getName() + " "+ val.getPlatform() +"\n");
        }

        System.out.println(sb.toString());

    }

}
