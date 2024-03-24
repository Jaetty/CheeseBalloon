package org.greenpine.cheeseballoon.ranking.adapter.in.web;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.greenpine.cheeseballoon.global.response.StatusEnum;
import org.greenpine.cheeseballoon.live.application.port.out.message.LiveResMsg;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/ranking")
@RequiredArgsConstructor
public class RankingController {

    @GetMapping("")
    public ResponseEntity<CustomBody> test(){

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, LiveResMsg.SUCCESS, null));
    }

}


