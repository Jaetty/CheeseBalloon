package org.greenpine.cheeseballoon.streamer.adapter.in.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.greenpine.cheeseballoon.global.response.StatusEnum;
import org.greenpine.cheeseballoon.global.utils.DateCalculator;
import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.FindSearchStreamerResDtoInterface;
import org.greenpine.cheeseballoon.streamer.application.port.in.StreamerUsecase;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.*;
import org.greenpine.cheeseballoon.streamer.application.port.out.message.StreamerResMsg;
import org.hibernate.validator.constraints.Range;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/streamer")
@RequiredArgsConstructor
public class StreamerController {

    // 유스케이스는 사용자 입장에서 원하는 기능들이 있다.
    final private StreamerUsecase streamerUsecase;

    @GetMapping("")
    public ResponseEntity<CustomBody> streamerDetail(@RequestParam Long streamerId, @AuthenticationPrincipal Long memberId){

        if(memberId == null){
            memberId = -1L;
        }

        FindStreamerDetailResDto ret = streamerUsecase.streamerDetail(streamerId, memberId);
//        FindStreamerDetailResDto ret = FindStreamerDetailResDto.builder()
//                .streamerId(285L)
//                .channelUrl("https://chzzk.naver.com/75cbf189b3bb8f9f687d2aca0d0a382b")
//                .platform('C')
//                .originId("75cbf189b3bb8f9f687d2aca0d0a382b")
//                .profileUrl("https://nng-phinf.pstatic.net/MjAyMzEyMTVfMTgx/MDAxNzAyNjAxMjEyMTYw.Hw6vs76aI0L1zeu4fziwXDE35gidFriwTSgAjq7KWxUg.0V3KaKvctGKcVYa76UiDVTXMjXeUSuUezHX6nGU4y9kg.PNG/123.png?type=f120_120_na")
//                .name("한동숙")
//                .bookmark(true)
//                .rank(5)
//                .diff(2).build();

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, StreamerResMsg.SUCCESS, ret));
    }

    @GetMapping("/live")
    public ResponseEntity<CustomBody> streamerDetailLive(@RequestParam Long streamerId){

        FindStreamerDetailLiveResDto ret = streamerUsecase.streamerDetailLive(streamerId);
//        FindStreamerDetailLiveResDto ret = FindStreamerDetailLiveResDto.builder().isLive(true).streamerUrl("https://chzzk.naver.com/live/75cbf189b3bb8f9f687d2aca0d0a382b").thumbnailUrl("https://livecloud-thumb.akamaized.net/chzzk/livecloud/KR/stream/26464698/live/5885133/record/27970556/thumbnail/image_480.jpg").build();

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, StreamerResMsg.SUCCESS, ret));
    }

    @GetMapping("/search")
    public ResponseEntity<CustomBody> searchStreamer(@RequestParam String query, @AuthenticationPrincipal Long memberId){

        if(memberId == null){
            memberId = -1L;
        }

        List<FindSearchStreamerResDtoInterface> ret = streamerUsecase.searchStreamer(query, memberId);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, StreamerResMsg.SUCCESS, ret));

    }

    @GetMapping("/summary")
    public ResponseEntity<CustomBody> streamerDetailSummary(@RequestParam Long streamerId){

        String[] dtCode = DateCalculator.getDateCodes(1);
        LocalDateTime[] dates = DateCalculator.getSpecificPeriod(1);
        FindStreamerSummaryResDto ret = streamerUsecase.streamerDetailSummary(streamerId,dtCode,dates);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, StreamerResMsg.SUCCESS, ret));
    }

    @GetMapping("/viewer")
    public ResponseEntity<CustomBody> streamerViewerDetail(@RequestParam Long streamerId, @Range(min = 1, max = 3) int date){

        LocalDateTime[] dates = DateCalculator.getPeriod(date);
        String[] dtCode = DateCalculator.getDateCodes(date);
        FindStreamerViewerDto ret = streamerUsecase.streamerDetailViewer(streamerId, dates, dtCode);

//        FindStreamerViewerDto ret = FindStreamerViewerDto.builder()
//                .maxViewer(3000)
//                .maxDiff( date%2==0 ? 100 : -200 )
//                .avgViewer(2800)
//                .avgDiff(date%2==0 ? 30 : -20)
//                .dailyAvgViewers(null)
//                .build();
//
//        String val = "2024-03-1";
//
//        List<DailyAvgViewer> list = new ArrayList<>();
//
//        for(int i=0; i<7; i++){
//
//            int random = (int) (Math.random() * 150);
//
//            list.add(DailyAvgViewer.builder().viewer(2800 + i).date(val + i).maxViewer(3000 - random).build());
//        }
//
//        ret.setDailyAvgViewers(list);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, StreamerResMsg.SUCCESS, ret));

    }

    @GetMapping("/category")
    public ResponseEntity<CustomBody> streamerCategoryDetail(@RequestParam Long streamerId, @Range(min = 1, max = 3) int date){

        LocalDateTime[] dates = DateCalculator.getPeriod(date);
        FindStreamerCategoryDto ret = streamerUsecase.streamerDetailCategory(streamerId, dates);

//        int totalTime = 3600*24*5;
//
//        FindStreamerCategoryDto ret = FindStreamerCategoryDto.builder().totalTime(totalTime).build();
//
//        List<DailyCategory> list = new ArrayList<>();
//        String dateStr = "2024-05-0";
//
//        for(int i=0; i<7; i++){
//
//            list.add(DailyCategory.builder().date(dateStr+1+i).category("카테고리 id : "+i+1).time(totalTime/2).avgViewer(500 * (i+1)).build());
//        }
//
//        ret.setDailyCategories(list);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, StreamerResMsg.SUCCESS, ret));

    }

    @GetMapping("/time")
    public ResponseEntity<CustomBody> streamerTimeDetail(@RequestParam Long streamerId, @Range(min = 1, max = 3) int date){

        String[] dtCodes = DateCalculator.getDateCodes(date);
        LocalDateTime[] specificDates = DateCalculator.getSpecificPeriod(date);
        LocalDateTime[] dates = DateCalculator.getPeriod(date);
        FindStreamerTimeDto ret = streamerUsecase.streamerDetailTime(streamerId, dtCodes, dates, specificDates);

//        FindStreamerTimeDto ret = FindStreamerTimeDto.builder().timeDiff(date %2 == 0 ? 500 : -400).totalTime(3600*7).build();
//
//
//        String val = "2024-03-1";
//
//        List<DailyTime> list = new ArrayList<>();
//
//        for(int i=0; i<7; i++){
//
//            list.add(DailyTime.builder().time(3600).date(val + i).build());
//        }
//
//        ret.setDailyTimes(list);


        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, StreamerResMsg.SUCCESS, ret));

    }

    @GetMapping("/follow")
    public ResponseEntity<CustomBody> streamerFollowDetail(@RequestParam Long streamerId, @Range(min = 1, max = 3) int date){

        LocalDateTime[] dates = DateCalculator.getPeriod(date);
        List<FindStreamerFollowDto> ret = streamerUsecase.streamerDetailFollower(streamerId, dates);

//        List<FindStreamerFollowDto> ret = new ArrayList<>();
//        String val = "2024-03-1";
//
//        for(int i=0; i<7; i++){
//            ret.add(FindStreamerFollowDto.builder().follower(500+i).date(val + i).build());
//        }


        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, StreamerResMsg.SUCCESS, ret));

    }

    @GetMapping("/rating")
    public ResponseEntity<CustomBody> streamerRatingDetail(@RequestParam Long streamerId, @Range(min = 1, max = 3) int date){

        LocalDateTime[] dates = DateCalculator.getPeriod(date);
        String[] dtCode = DateCalculator.getDateCodes(date);
        FindStreamerRatingDto ret = streamerUsecase.streamerDetailRating(streamerId, dates, dtCode);

//        FindStreamerRatingDto ret = new FindStreamerRatingDto();
//        String val = "2024-03-1";
//        List<DailyRate> list = new ArrayList<>();
//
//        for(int i=0; i<7; i++){
//            list.add(DailyRate.builder().total(7.5 - i/2).platform(10.5 - i/3).date(val + i).build());
//        }
//
//        ret.setDailyRates(list);
//        ret.setTotalRating(7.12);
//        ret.setPlatformRating(8.74);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, StreamerResMsg.SUCCESS, ret));

    }


}
