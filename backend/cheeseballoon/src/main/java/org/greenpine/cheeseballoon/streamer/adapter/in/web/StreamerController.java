package org.greenpine.cheeseballoon.streamer.adapter.in.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.greenpine.cheeseballoon.global.response.StatusEnum;
import org.greenpine.cheeseballoon.global.utils.DateCalculator;
import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.FindSearchStreamerResDtoInterface;
import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.FindStreamerRecordDtoInterface;
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

import java.time.LocalDate;
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

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, StreamerResMsg.SUCCESS, ret));
    }

    @GetMapping("/record")
    public ResponseEntity<CustomBody> streamerRecord(@RequestParam Long streamerId){

        List<FindStreamerRecordDtoInterface> ret = streamerUsecase.streamerDetailRecord(streamerId);
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

        if(query.isEmpty()){
            query = " ";
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

        LocalDate[] dates = DateCalculator.getLocalDatePeriod(date);
        String[] dtCode = DateCalculator.getDateCodes(date);
        FindStreamerViewerDto ret = streamerUsecase.streamerDetailViewer(streamerId, dates, dtCode);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, StreamerResMsg.SUCCESS, ret));

    }

    @GetMapping("/category")
    public ResponseEntity<CustomBody> streamerCategoryDetail(@RequestParam Long streamerId, @Range(min = 1, max = 3) int date){

        LocalDateTime[] dates = DateCalculator.getPeriod(date);
        FindStreamerCategoryDto ret = streamerUsecase.streamerDetailCategory(streamerId, dates);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, StreamerResMsg.SUCCESS, ret));

    }

    @GetMapping("/time")
    public ResponseEntity<CustomBody> streamerTimeDetail(@RequestParam Long streamerId, @Range(min = 1, max = 3) int date){

        String[] dtCodes = DateCalculator.getDateCodes(date);
        LocalDate[] dates = DateCalculator.getLocalDatePeriod(date);
        LocalDateTime[] specificDates = DateCalculator.getSpecificPeriod(date);
        FindStreamerTimeDto ret = streamerUsecase.streamerDetailTime(streamerId, dates, dtCodes, specificDates);


        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, StreamerResMsg.SUCCESS, ret));

    }

    @GetMapping("/follow")
    public ResponseEntity<CustomBody> streamerFollowDetail(@RequestParam Long streamerId, @Range(min = 1, max = 3) int date){

        LocalDateTime[] dates = DateCalculator.getPeriod(date);
        List<FindStreamerFollowDto> ret = streamerUsecase.streamerDetailFollower(streamerId, dates);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, StreamerResMsg.SUCCESS, ret));

    }

    @GetMapping("/rating")
    public ResponseEntity<CustomBody> streamerRatingDetail(@RequestParam Long streamerId, @Range(min = 1, max = 3) int date){

        LocalDate[] dates = DateCalculator.getLocalDatePeriod(date);
        String[] dtCode = DateCalculator.getDateCodes(date);
        FindStreamerRatingDto ret = streamerUsecase.streamerDetailRating(streamerId, dates, dtCode);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, StreamerResMsg.SUCCESS, ret));

    }


}
