package org.greenpine.cheeseballoon.notice.adapter.in.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.greenpine.cheeseballoon.global.exception.NotFindException;
import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.greenpine.cheeseballoon.global.response.StatusEnum;
import org.greenpine.cheeseballoon.notice.application.port.in.NoticeUsecase;
import org.greenpine.cheeseballoon.notice.application.port.in.dto.*;
import org.greenpine.cheeseballoon.notice.application.port.out.dto.RegisterNoticeImgResDto;
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
        noticeUsecase.findNotice(reqDto);
        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, NoticeResMsg.SUCCESS, null));
    }

    @GetMapping("/all")
    public ResponseEntity<CustomBody> findAllNotice(FindAllNoticeReqDto reqDto){
        log.info("findAllNotice - Call");
        noticeUsecase.findAllNotice(reqDto);
        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, NoticeResMsg.SUCCESS, null));
    }

    @PostMapping("/img")
    public ResponseEntity<CustomBody> registerNoticeImg(@RequestPart MultipartFile file) {
        log.info("registerNoticeImg - Call");
        try{
            RegisterNoticeImgResDto resDto = noticeUsecase.registerNoticeImg(file);
            return ResponseEntity.ok(new CustomBody(StatusEnum.OK, NoticeResMsg.SUCCESS, resDto));
        }
        catch ( Exception e ){
            return ResponseEntity.ok(new CustomBody(StatusEnum.OK, NoticeResMsg.INTERNAL_SERVER_ERROR, null));
        }
        //return null;
    }

    @DeleteMapping("/img")
    public ResponseEntity<CustomBody> deleteNoticeImg(@RequestBody DeleteNoticeImgReqDto reqDto) {
        log.info("deleteNoticeImg - Call");
        try {
            noticeUsecase.deleteNoticeImg(reqDto);
            return ResponseEntity.ok(new CustomBody(StatusEnum.OK, NoticeResMsg.SUCCESS, null));

        }catch ( NotFindException e){
            return ResponseEntity.ok(new CustomBody(StatusEnum.OK, NoticeResMsg.NOT_EXIST, null));
        }
        catch ( Exception e ){
            return ResponseEntity.ok(new CustomBody(StatusEnum.OK, NoticeResMsg.INTERNAL_SERVER_ERROR, null));
        }


    }

    @PostMapping("")
    public ResponseEntity<CustomBody> registerNotice(@AuthenticationPrincipal Long memberId, @RequestBody RegisterNoticeReqDto reqDto) {
        log.info("registerNotice - Call");
        noticeUsecase.registerNotice(memberId, reqDto);
        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, NoticeResMsg.SUCCESS, null));
    }

    @DeleteMapping("")
    public ResponseEntity<CustomBody> deleteNotice(@RequestBody DeleteNoticeReqDto reqDto) {
        log.info("deleteNotice - Call");
        try {
            noticeUsecase.deleteNotice(reqDto);
        }catch ( NotFindException e ){
            return ResponseEntity.ok(new CustomBody(StatusEnum.OK, NoticeResMsg.NOT_EXIST, null));
        }
        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, NoticeResMsg.SUCCESS, null));
    }
}
