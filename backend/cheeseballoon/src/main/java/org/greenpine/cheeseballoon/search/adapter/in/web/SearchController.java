package org.greenpine.cheeseballoon.search.adapter.in.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.greenpine.cheeseballoon.global.response.StatusEnum;
import org.greenpine.cheeseballoon.live.application.port.out.message.LiveResMsg;
import org.greenpine.cheeseballoon.search.application.port.in.SearchUsecase;
import org.greenpine.cheeseballoon.search.application.port.out.dto.FindSearchLiveResDto;
import org.greenpine.cheeseballoon.search.application.port.out.dto.FindSearchStreamerResDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {

    // 유스케이스는 입력으로 온 요청을 처리하는 역할
    final private SearchUsecase searchUsecase;

    @GetMapping("/streamer")
    public ResponseEntity<CustomBody> searchStreamer(@RequestParam String query){

        List<FindSearchStreamerResDto> ret = searchUsecase.searchStreamer(query);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, LiveResMsg.SUCCESS, ret));

    }

    @GetMapping("/live")
    public ResponseEntity<CustomBody> searchLive(@RequestParam String query){

        List<FindSearchLiveResDto> ret = searchUsecase.searchLive(query);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, LiveResMsg.SUCCESS, ret));

    }


}
