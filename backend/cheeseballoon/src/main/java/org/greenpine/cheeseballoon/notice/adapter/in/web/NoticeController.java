package org.greenpine.cheeseballoon.notice.adapter.in.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.greenpine.cheeseballoon.global.response.StatusEnum;
import org.greenpine.cheeseballoon.notice.application.port.in.NoticeUsecase;
import org.greenpine.cheeseballoon.notice.application.port.in.dto.DeleteNoticeImgReqDto;
import org.greenpine.cheeseballoon.notice.application.port.in.dto.FindAllNoticeReqDto;
import org.greenpine.cheeseballoon.notice.application.port.in.dto.FindNoticeReqDto;
import org.greenpine.cheeseballoon.notice.application.port.in.dto.RegisterNoticeImgReqDto;
import org.greenpine.cheeseballoon.notice.application.port.out.message.NoticeResMsg;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
public class NoticeController {
    private final NoticeUsecase noticeUsecase;

    @GetMapping("")
    public ResponseEntity<CustomBody> findNotice(FindNoticeReqDto reqDto){
        log.info("findNotice - Call");

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, NoticeResMsg.SUCCESS, null));
    }

    @GetMapping("/all")
    public ResponseEntity<CustomBody> findAllNotice(FindAllNoticeReqDto reqDto){
        log.info("findAllNotice - Call");

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, NoticeResMsg.SUCCESS, null));
    }

    @PostMapping("/img")
    public ResponseEntity<CustomBody> registerNoticeImg(@RequestPart MultipartFile file) {
        log.info("registerNoticeImg - Call");
        System.out.println(file.getSize());
        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, NoticeResMsg.SUCCESS, null));
    }

    @DeleteMapping("/img")
    public ResponseEntity<CustomBody> deleteNoticeImg(@RequestBody DeleteNoticeImgReqDto reqDto) {
        log.info("registerNoticeImg - Call");
        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, NoticeResMsg.SUCCESS, null));
    }

    @PostMapping("")
    public ResponseEntity<CustomBody> registerNotice(@AuthenticationPrincipal Long memberId, @RequestBody RegisterNoticeImgReqDto reqDto) {
        log.info("registerNoticeImg - Call");
        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, NoticeResMsg.SUCCESS, null));
    }

    @DeleteMapping("")
    public ResponseEntity<CustomBody> deleteNotice(@AuthenticationPrincipal Long memberId, @RequestBody RegisterNoticeImgReqDto reqDto) {
        log.info("registerNoticeImg - Call");
        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, NoticeResMsg.SUCCESS, null));
    }
}
