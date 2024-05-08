package org.greenpine.cheeseballoon.ranking.adapter.in.web;


import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.greenpine.cheeseballoon.global.response.StatusEnum;
import org.greenpine.cheeseballoon.ranking.application.port.in.RankingUsecase;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindAvgViewerRankingResDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindFollowerRankingResDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindRatingRankingResDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindTopViewerRankingResDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.message.RankingResMsg;
import org.hibernate.validator.constraints.Range;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Slf4j
@RestController
@RequestMapping("/ranking")
@RequiredArgsConstructor
public class RankingController {

    private final RankingUsecase rankingUsecase;

    @GetMapping("/average")
    public ResponseEntity<CustomBody> findAvgViewerRanking(@RequestParam
                                                           @Range(min = 0, max = 3) int date,
                                                           @Pattern(regexp = "^[ASCT]") String platform,
                                                           @AuthenticationPrincipal Long memberId){

        if(memberId == null){
            memberId = -1L;
        }

        List<FindAvgViewerRankingResDto> ret = rankingUsecase.findAvgViewerRanking(date, platform.charAt(0), memberId);


        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, RankingResMsg.SUCCESS, ret));
    }

    @GetMapping("/topview")
    public ResponseEntity<CustomBody> findTopViewerRanking(@RequestParam
                                                           @Range(min = 0, max = 3) int date,
                                                           @Pattern(regexp = "^[ASCT]") String platform,
                                                           @AuthenticationPrincipal Long memberId){

        if(memberId == null){
            memberId = -1L;
        }

        List<FindTopViewerRankingResDto> ret = rankingUsecase.findTopViewerRanking(date, platform.charAt(0), memberId);


        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, RankingResMsg.SUCCESS, ret));
    }

    @GetMapping("/follow")
    public ResponseEntity<CustomBody> findFollowerRanking(@RequestParam
                                           @Range(min = 0, max = 3) int date,
                                           @Pattern(regexp = "^[ASCT]") String platform,
                                           @AuthenticationPrincipal Long memberId){

        if(memberId == null){
            memberId = -1L;
        }


        List<FindFollowerRankingResDto> ret1 = rankingUsecase.findFollowerRanking(date, platform.charAt(0), memberId);
        List<FindFollowerRankingResDto> testData = new ArrayList<>();

        Random random = new Random();

        // 테스트용 데이터 제공
        for(int i=0; i< 300; i++){

            FindFollowerRankingResDto temp = FindFollowerRankingResDto.builder()
                    .streamerId((long) i)
                    .name( i%3==0 ? "최대한 긴 글자의 방송인" : "방송인")
                    .rank(i+1)
                    .platform('A')
                    .profileUrl("https://nng-phinf.pstatic.net/MjAyMzEyMTlfMzYg/MDAxNzAyOTcwODY1OTUy.1hHkqzH-zyEhyW2EJNfj1q6r7XTDeQNNqL_owQQ6AFwg.mCjDaHbdF0jjfhB2PvFuFJLxL9jQ-PV0oSLLDRXoGLUg.GIF/popHEAD.gif?type=f120_120_na")
                    .follower(45000-i)
                    .diff(0)
                    .bookmark(i%2==0)
                    .build();

            if(i>0){
                // 등락 랜덤 처음은 무조건 0
                if(i%3==0) temp.setDiff(random.nextInt(100) * -1);
                else temp.setDiff(random.nextInt(100));
            }

            if(platform.charAt(0)=='T'){
                if(i%2==0) temp.setPlatform('C');
            }
            else{
                temp.setPlatform(platform.charAt(0));
            }

            testData.add(temp);

        }

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, RankingResMsg.SUCCESS, testData));
    }

    @GetMapping("/rating")
    public ResponseEntity<CustomBody> findRatingRanking(@RequestParam
                                           @Range(min = 0, max = 3) int date,
                                           @Pattern(regexp = "^[ASCT]") String platform,
                                           @AuthenticationPrincipal Long memberId){

        if(memberId == null){
            memberId = -1L;
        }

        List<FindRatingRankingResDto> ret1 = rankingUsecase.findRatingRanking(date, platform.charAt(0), memberId);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, RankingResMsg.SUCCESS, ret1));
    }

}


