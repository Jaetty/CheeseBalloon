package org.greenpine.cheeseballoon.ranking.adapter.in.web;


import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.greenpine.cheeseballoon.global.response.StatusEnum;
import org.greenpine.cheeseballoon.global.utils.DateCalculator;
import org.greenpine.cheeseballoon.ranking.application.port.in.RankingUsecase;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.*;
import org.greenpine.cheeseballoon.ranking.application.port.out.message.RankingResMsg;
import org.hibernate.validator.constraints.Range;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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
                                                           @Pattern(regexp = "^[SCT]") @Size(min = 1, max = 1) String platform,
                                                           @AuthenticationPrincipal Long memberId){

        if(memberId == null){
            memberId = -1L;
        }

        if(platform.charAt(0)=='T'){
            platform = "%";
        }

        String[] dates = DateCalculator.getDateCodes(date);
        List<FindAvgViewerRankingResDto> ret = rankingUsecase.findAvgViewerRanking(dates, platform, memberId);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, RankingResMsg.SUCCESS, ret));
    }

    @GetMapping("/topview")
    public ResponseEntity<CustomBody> findTopViewerRanking(@RequestParam
                                                           @Range(min = 0, max = 3) int date,
                                                           @Pattern(regexp = "^[SCT]") @Size(min = 1, max = 1) String platform,
                                                           @AuthenticationPrincipal Long memberId){

        if(memberId == null){
            memberId = -1L;
        }

        if(platform.charAt(0)=='T'){
            platform = "%";
        }

        String[] dates = DateCalculator.getDateCodes(date);
        List<FindTopViewerRankingResDto> ret = rankingUsecase.findTopViewerRanking(dates, platform, memberId);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, RankingResMsg.SUCCESS, ret));
    }

    @GetMapping("/follow")
    public ResponseEntity<CustomBody> findFollowerRanking(@RequestParam
                                           @Range(min = 0, max = 3) int date,
                                           @Pattern(regexp = "^[SCT]") @Size(min = 1, max = 1) String platform,
                                           @AuthenticationPrincipal Long memberId){

        if(memberId == null){
            memberId = -1L;
        }

        if(platform.charAt(0)=='T'){
            platform = "%";
        }

        LocalDateTime[] dates = DateCalculator.getSpecificPeriod(date);

        List<FindFollowerRankingResDto> ret = rankingUsecase.findFollowerRanking(dates, platform, memberId);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, RankingResMsg.SUCCESS, ret));
    }

    @GetMapping("/rating")
    public ResponseEntity<CustomBody> findRatingRanking(@RequestParam
                                           @Range(min = 0, max = 3) int date,
                                           @Pattern(regexp = "^[SCT]") @Size(min = 1, max = 1) String platform,
                                           @AuthenticationPrincipal Long memberId){

        if(memberId == null){
            memberId = -1L;
        }

        if(platform.charAt(0)=='T'){
            platform = "%";
        }

        String[] dates = DateCalculator.getDateCodes(date);
        List<FindRatingRankingResDto> ret = rankingUsecase.findRatingRanking(dates, platform, memberId);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, RankingResMsg.SUCCESS, ret));
    }

    @GetMapping("/time")
    public ResponseEntity<CustomBody> findTotalAirTimeRanking(@RequestParam
                                                        @Range(min = 0, max = 3) int date,
                                                        @Pattern(regexp = "^[SCT]") @Size(min = 1, max = 1) String platform,
                                                        @AuthenticationPrincipal Long memberId){

        if(memberId == null){
            memberId = -1L;
        }

        if(platform.charAt(0)=='T'){
            platform = "%";
        }

        String[] dates = DateCalculator.getDateCodes(date);
        List<FindTotalAirTimeRankingResDto> ret = rankingUsecase.findTotalAirTimeRanking(dates, platform, memberId);


        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, RankingResMsg.SUCCESS, ret));
    }

    @GetMapping("/live")
    public ResponseEntity<CustomBody> findLiveRanking(@AuthenticationPrincipal Long memberId, @RequestParam Character platform){
        List<FindLiveRankingResDto> res = rankingUsecase.findLiveRanking(memberId, platform);
        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, RankingResMsg.SUCCESS, res));
    }
}


