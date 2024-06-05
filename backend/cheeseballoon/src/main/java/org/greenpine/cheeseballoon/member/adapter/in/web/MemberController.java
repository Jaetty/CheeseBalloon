package org.greenpine.cheeseballoon.member.adapter.in.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.greenpine.cheeseballoon.global.response.StatusEnum;
import org.greenpine.cheeseballoon.member.application.port.in.AuthUsecase;
import org.greenpine.cheeseballoon.member.application.port.in.BookmarkUsecase;
import org.greenpine.cheeseballoon.member.application.port.in.MemberUsecase;
import org.greenpine.cheeseballoon.member.application.port.in.ViewLogUsecase;
import org.greenpine.cheeseballoon.member.application.port.in.dto.*;
import org.greenpine.cheeseballoon.member.application.port.out.dto.FindBookmarkResDto;
import org.greenpine.cheeseballoon.member.application.port.out.dto.FindViewLogResDto;
import org.greenpine.cheeseballoon.member.application.port.out.dto.LoginResDto;
import org.greenpine.cheeseballoon.member.application.port.out.message.MemberResMsg;
import org.greenpine.cheeseballoon.member.application.service.OauthService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {
    private final OauthService oauthService;
    private final MemberUsecase memberUsecase;
    private final AuthUsecase authUsecase;
    private final BookmarkUsecase bookmarkUsecase;
    private final ViewLogUsecase viewLogUsecase;

    @PostMapping("/login")
    public ResponseEntity<CustomBody> login(){
        log.info("login - Call");
        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, MemberResMsg.SUCCESS, null));
    }

    @PostMapping("/accessToken")
    public ResponseEntity<CustomBody> getAccessToken(@AuthenticationPrincipal Long memberId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<GrantedAuthority> authorities = authentication.getAuthorities().stream()
                .map(authority -> (GrantedAuthority) authority)
                .toList();
        String role = authorities.get(0).toString();
        System.out.println(role);
        GetAccessTokenResDto resDto = oauthService.getNewAccessToken(memberId, role);
        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, MemberResMsg.SUCCESS, resDto));
    }

    @GetMapping("/login/google")
    public ResponseEntity<CustomBody> loginGoogle(@RequestParam String code){
        log.info("login/google - Call");
        return ResponseEntity.ok(null);
        /*try{
            UserInfoDto userInfoDto = oauthService.getGoogleUserInfo(code);
            LoginResDto resDto = authUsecase.login(userInfoDto);

        }catch (JsonProcessingException e){
            return ResponseEntity.ok(new CustomBody(StatusEnum.UNAUTHORIZED, MemberResMsg.NOT_FOUND_USER, null));
        }catch (BadRequestException e){
            return ResponseEntity.ok(new CustomBody(StatusEnum.UNAUTHORIZED, MemberResMsg.INTERNAL_SERVER_ERROR, null));
        }*/

    }

    @GetMapping("/login/google/code")
    public ResponseEntity<CustomBody> loginGoogleCode(@RequestParam String code){
        log.info("loginGoogleCode - Call");
        System.out.println(code);
        try{
            UserInfoDto userInfoDto = oauthService.getGoogleUserInfo(code);
            LoginResDto resDto = authUsecase.login(userInfoDto);

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
        return ResponseEntity.ok(null);
        /*try {
            UserInfoDto userInfoDto = oauthService.getKakaoUserInfo(code);
            LoginResDto resDto = authUsecase.login(userInfoDto);
            return ResponseEntity.ok(new CustomBody(StatusEnum.OK, MemberResMsg.SUCCESS, resDto));
        }catch (JsonProcessingException e){
            return ResponseEntity.ok(new CustomBody(StatusEnum.UNAUTHORIZED, MemberResMsg.NOT_FOUND_USER, null));
        }catch (BadRequestException e){
            return ResponseEntity.ok(new CustomBody(StatusEnum.UNAUTHORIZED, MemberResMsg.INTERNAL_SERVER_ERROR, null));
        }*/
    }

    @GetMapping("/login/kakao/code")
    public ResponseEntity<CustomBody> loginKakaoCode(@RequestParam String code) {
        log.info("loginKakaoCode - Call");

        try {
            UserInfoDto userInfoDto = oauthService.getKakaoUserInfo(code);
            LoginResDto resDto = authUsecase.login(userInfoDto);
            System.out.println("토큰 : "+resDto.getAccessToken());
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

    @GetMapping("/bookmark")
    public ResponseEntity<CustomBody> findBookmark(@AuthenticationPrincipal Long memberId){
        log.info("findBookmark - Call " + memberId);
        List<FindBookmarkResDto> res = bookmarkUsecase.findBookmark(
                FindBookmarkReqDto.builder()
                .memberId(memberId)
                .build()
        );
        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, MemberResMsg.SUCCESS, res));
    }

    @PostMapping("/bookmark")
    public ResponseEntity<CustomBody> addBookmark(@AuthenticationPrincipal Long memberId, @RequestBody AddBookmarkReqDto reqDto){
        log.info("addBookmark - Call " + memberId);
        reqDto.setMemberId(memberId);
        bookmarkUsecase.addBookmark(reqDto);
        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, MemberResMsg.SUCCESS, null));
    }

    @DeleteMapping("/bookmark")
    public ResponseEntity<CustomBody> deleteBookmark(@AuthenticationPrincipal Long memberId, @RequestBody DeleteBookmarkReqDto reqDto){
        log.info("deleteBookmark - Call " + memberId);
        reqDto.setMemberId(memberId);
        try{
            bookmarkUsecase.deleteBookmark(reqDto);
            return ResponseEntity.ok(new CustomBody(StatusEnum.OK, MemberResMsg.SUCCESS, null));
        }catch (DuplicateKeyException e){
            return ResponseEntity.ok(new CustomBody(StatusEnum.NOT_EXIST, MemberResMsg.NOT_EXIST, null));
        }

    }

    @GetMapping("/viewlog")
    public ResponseEntity<CustomBody> findViewLog(@AuthenticationPrincipal Long memberId, FindViewLogReqDto reqDto ){
        log.info("findViewLog - Call " + memberId);
        reqDto.setMemberId(memberId);
        System.out.println(reqDto.getStart());
        List<FindViewLogResDto> res = viewLogUsecase.findViewLog(reqDto);
        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, MemberResMsg.SUCCESS, res));
    }

    @PostMapping("/viewlog")
    public ResponseEntity<CustomBody> addViewLog(@AuthenticationPrincipal Long memberId, @RequestBody AddViewLogReqDto reqDto){
        log.info("addViewLog - Call " + memberId);
        reqDto.setMemberId(memberId);
        viewLogUsecase.addViewLog(reqDto);
        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, MemberResMsg.SUCCESS, null));
    }

    @DeleteMapping("/viewlog")
    public ResponseEntity<CustomBody> deleteViewLog(@AuthenticationPrincipal Long memberId, @RequestBody DeleteViewLogReqDto reqDto){
        log.info("deleteViewLog - Call " + memberId);
        reqDto.setMemberId(memberId);
        try {
            viewLogUsecase.deleteViewLog(reqDto);
            return ResponseEntity.ok(new CustomBody(StatusEnum.OK, MemberResMsg.SUCCESS, null));
        }catch (DuplicateKeyException e){
            return ResponseEntity.ok(new CustomBody(StatusEnum.NOT_EXIST, MemberResMsg.NOT_EXIST, null));
        }

    }
}
