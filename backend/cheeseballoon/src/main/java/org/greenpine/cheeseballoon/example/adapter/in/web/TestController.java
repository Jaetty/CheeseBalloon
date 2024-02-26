package org.greenpine.cheeseballoon.example.adapter.in.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.greenpine.cheeseballoon.example.application.port.in.AnotherUsecase;
import org.greenpine.cheeseballoon.example.application.port.in.TestUsecase;
import org.greenpine.cheeseballoon.example.application.port.in.dto.TestReqDto;
import org.greenpine.cheeseballoon.example.application.port.out.dto.TestResDto;
import org.greenpine.cheeseballoon.example.application.port.out.message.TestResMsg;
import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.greenpine.cheeseballoon.global.response.StatusEnum;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

    private final TestUsecase testUsecase; //컨트롤러가 서비스를 사용하기 위한 포트
    private final AnotherUsecase test2Usecase;

    @PostMapping("")
    public ResponseEntity<CustomBody> create(@RequestBody TestReqDto testReqDto){
        log.info("create - Call");

        TestResDto testResDto = testUsecase.create(testReqDto);
        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, TestResMsg.SUCCESS, testResDto));
    }

    @GetMapping("")
    public ResponseEntity<CustomBody> read(@RequestParam Long id){
        log.info("read - Call");

        TestResDto testResDto = testUsecase.read(id);
        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, TestResMsg.SUCCESS, testResDto));
    }

}
