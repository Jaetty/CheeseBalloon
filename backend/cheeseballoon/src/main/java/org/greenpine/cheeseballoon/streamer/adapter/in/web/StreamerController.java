package org.greenpine.cheeseballoon.streamer.adapter.in.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.greenpine.cheeseballoon.global.response.StatusEnum;
import org.greenpine.cheeseballoon.streamer.application.port.in.StreamerUsecase;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.*;
import org.greenpine.cheeseballoon.streamer.application.port.out.message.StreamerResMsg;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, StreamerResMsg.SUCCESS, ret));
    }

    @GetMapping("/live")
    public ResponseEntity<CustomBody> streamerDetailLive(@RequestParam Long streamerId){

        FindStreamerDetailLiveResDto ret = streamerUsecase.streamerDetailLive(streamerId);

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

    @GetMapping("/viewer")
    public ResponseEntity<CustomBody> streamerViewerDetail(@RequestParam Long streamerId, int date){

        FindStreamerViewerDto ret = FindStreamerViewerDto.builder()
                .maxViewer(3000)
                .maxDiff( date%2==0 ? 100 : -200 )
                .avgViewer(2800)
                .avgDiff(date%2==0 ? 30 : -20)
                .dailyAvgViewers(null)
                .build();

        String val = "2024-03-1";

        List<DailyAvgViewer> list = new ArrayList<>();

        for(int i=0; i<7; i++){

            list.add(DailyAvgViewer.builder().avgViewer(2800 + i).date(val + i).build());
        }

        ret.setDailyAvgViewers(list);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, StreamerResMsg.SUCCESS, ret));

    }

    @GetMapping("/category")
    public ResponseEntity<CustomBody> streamerCategoryDetail(@RequestParam Long streamerId, int date){

        int totalTime = 3600*24*5;

        FindStreamerCategoryDto ret = FindStreamerCategoryDto.builder().totalTime(totalTime).build();

        List<DailyCategory> list = new ArrayList<>();

        for(int i=0; i<10; i++){

            list.add(DailyCategory.builder().category("카테고리 id : "+i+1).time(totalTime/2).avgViewer(500 * (i+1)).build());
        }

        ret.setDailyCategories(list);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, StreamerResMsg.SUCCESS, ret));

    }

    @GetMapping("/time")
    public ResponseEntity<CustomBody> streamerTimeDetail(@RequestParam Long streamerId, int date){

        FindStreamerTimeDto ret = FindStreamerTimeDto.builder().timeDiff(date %2 == 0 ? 500 : -400).totalTime(3600*7).build();


        String val = "2024-03-1";

        List<DailyTime> list = new ArrayList<>();

        for(int i=0; i<7; i++){

            list.add(DailyTime.builder().time(3600).date(val + i).build());
        }

        ret.setDailyTimes(list);


        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, StreamerResMsg.SUCCESS, ret));

    }

    @GetMapping("/follow")
    public ResponseEntity<CustomBody> streamerFollowDetail(@RequestParam Long streamerId, int date){

//        List<FindStreamerFollowDto> ret = streamerUsecase.streamerDetailFollower(streamerId, date);

        List<FindStreamerFollowDto> ret = new ArrayList<>();
        String val = "2024-03-1";

        for(int i=0; i<7; i++){
            ret.add(FindStreamerFollowDto.builder().follower(500+i).date(val + i).build());
        }


        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, StreamerResMsg.SUCCESS, ret));

    }

    @GetMapping("/rating")
    public ResponseEntity<CustomBody> streamerRatingDetail(@RequestParam Long streamerId, int date){

        FindStreamerRatingDto ret = FindStreamerRatingDto.builder().avgRating(10.24).build();

        String val = "2024-03-1";
        List<DailyRate> list = new ArrayList<>();

        for(int i=0; i<7; i++){
            list.add(DailyRate.builder().rating(10.5 - i).date(val + i).build());
        }

        ret.setDailyRates(list);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, StreamerResMsg.SUCCESS, ret));

    }


}
