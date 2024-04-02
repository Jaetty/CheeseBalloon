package org.greenpine.cheeseballoon.member.adapter.in.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.greenpine.cheeseballoon.global.response.StatusEnum;
import org.greenpine.cheeseballoon.member.application.port.out.message.MemberResMsg;
import org.greenpine.cheeseballoon.member.application.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    @PostMapping("/login")
    public ResponseEntity<CustomBody> login(){
        log.info("login - Call");
        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, MemberResMsg.SUCCESS, null));
    }

    @PostMapping("/login/google")
    public ResponseEntity<CustomBody> loginGoogle(){
        log.info("login - Call");
        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, MemberResMsg.SUCCESS, null));
    }

    @PostMapping("/login/test")
    public ResponseEntity<CustomBody> loginTest(@AuthenticationPrincipal Long memberId){
        log.info("loginTest - Call " + memberId);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, MemberResMsg.SUCCESS, null));
    }
}
