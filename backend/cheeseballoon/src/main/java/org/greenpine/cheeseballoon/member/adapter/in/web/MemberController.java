package org.greenpine.cheeseballoon.member.adapter.in.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.greenpine.cheeseballoon.global.response.StatusEnum;
import org.greenpine.cheeseballoon.member.application.port.in.MemberUsecase;
import org.greenpine.cheeseballoon.member.application.port.in.dto.ChangeNicknameReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.GetAccessTokenResDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.UserInfoDto;
import org.greenpine.cheeseballoon.member.application.port.out.dto.LoginResDto;
import org.greenpine.cheeseballoon.member.application.port.out.message.MemberResMsg;
import org.greenpine.cheeseballoon.member.application.service.MemberService;
import org.greenpine.cheeseballoon.member.application.service.OauthService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {
    private final OauthService oauthService;
    private final MemberUsecase memberUsecase;
    @PostMapping("/login")
    public ResponseEntity<CustomBody> login(){
        log.info("login - Call");
        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, MemberResMsg.SUCCESS, null));
    }

    @PostMapping("/accessToken")
    public ResponseEntity<CustomBody> getAccessToken(@AuthenticationPrincipal Long memberId){
        GetAccessTokenResDto resDto = oauthService.getAccessToken(memberId);
        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, MemberResMsg.SUCCESS, resDto));
    }

    @GetMapping("/login/google")
    public ResponseEntity<CustomBody> loginGoogle(@RequestParam String code){
        log.info("login/google - Call");
        System.out.println(code);
        try{
            UserInfoDto userInfoDto = oauthService.getGoogleUserInfo(code);
            LoginResDto resDto = memberUsecase.login(userInfoDto);
            return ResponseEntity.ok(new CustomBody(StatusEnum.OK, MemberResMsg.SUCCESS, resDto));
        }catch (JsonProcessingException e){
            return ResponseEntity.ok(new CustomBody(StatusEnum.UNAUTHORIZED, MemberResMsg.NOT_FOUND_USER, null));
        }catch (BadRequestException e){
            return ResponseEntity.ok(new CustomBody(StatusEnum.UNAUTHORIZED, MemberResMsg.INTERNAL_SERVER_ERROR, null));
        }

    }

    @GetMapping("/login/kakao")
    public ResponseEntity<CustomBody> loginKakao(@RequestParam String code) {
        log.info("login/kakao - Call");

        System.out.println(code);
        try {
            UserInfoDto userInfoDto = oauthService.getKakaoUserInfo(code);
            LoginResDto resDto = memberUsecase.login(userInfoDto);
            return ResponseEntity.ok(new CustomBody(StatusEnum.OK, MemberResMsg.SUCCESS, resDto));
        }catch (JsonProcessingException e){
            return ResponseEntity.ok(new CustomBody(StatusEnum.UNAUTHORIZED, MemberResMsg.NOT_FOUND_USER, null));
        }catch (BadRequestException e){
            return ResponseEntity.ok(new CustomBody(StatusEnum.UNAUTHORIZED, MemberResMsg.INTERNAL_SERVER_ERROR, null));
        }
    }

    @PostMapping("/changeNickname")
    public ResponseEntity<CustomBody> changeNickname(@AuthenticationPrincipal Long memberId, @RequestBody ChangeNicknameReqDto reqDto) {
        log.info("changeNickname - Call");
        try{
            memberUsecase.changeNickname(memberId, reqDto);
        }catch (DataIntegrityViolationException e){
            return ResponseEntity.ok(new CustomBody(StatusEnum.BAD_REQUEST, MemberResMsg.DUP_NICKNAME, null));
        }

        return null;
    }


    @PostMapping("/login/test")
    public ResponseEntity<CustomBody> loginTest(@AuthenticationPrincipal Long memberId){
        log.info("loginTest - Call " + memberId);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, MemberResMsg.SUCCESS, null));
    }
}
