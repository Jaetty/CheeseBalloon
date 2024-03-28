package org.greenpine.cheeseballoon.streamer.adapter.in.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.greenpine.cheeseballoon.global.response.StatusEnum;
import org.greenpine.cheeseballoon.streamer.application.port.in.StreamerUsecase;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDto;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDtoInterface;
import org.greenpine.cheeseballoon.streamer.application.port.out.message.StreamerResMsg;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/streamer")
@RequiredArgsConstructor
public class StreamerController {

    // 유스케이스는 사용자 입장에서 원하는 기능들이 있다.
    final private StreamerUsecase streamerUsecase;

    @GetMapping("/search")
    public ResponseEntity<CustomBody> searchStreamer(@RequestParam String query){

        List<FindSearchStreamerResDtoInterface> ret = streamerUsecase.searchStreamer(query);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, StreamerResMsg.SUCCESS, ret));

    }



}
