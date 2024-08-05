package org.greenpine.cheeseballoon.notice.application.service;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.global.minio.MinioManager;
import org.greenpine.cheeseballoon.notice.application.port.in.NoticeUsecase;
import org.greenpine.cheeseballoon.notice.application.port.in.dto.*;
import org.greenpine.cheeseballoon.notice.application.port.out.NoticePort;
import org.greenpine.cheeseballoon.notice.application.port.out.dto.FindAllNoticeResDto;
import org.greenpine.cheeseballoon.notice.application.port.out.dto.FindNoticeResDto;
import org.greenpine.cheeseballoon.notice.application.port.out.dto.RegisterNoticeImgResDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService implements NoticeUsecase {

    private final NoticePort noticePort;
    private final MinioManager minioManager;
    @Override
    public FindNoticeResDto findNotice(FindNoticeReqDto reqDto) {
        return noticePort.findNotice(reqDto);
    }

    @Override
    public List<FindAllNoticeResDto> findAllNotice(FindAllNoticeReqDto reqDto) {
        return noticePort.findAllNotice(reqDto);
    }

    @Override
    public RegisterNoticeImgResDto registerNoticeImg(MultipartFile file) throws Exception {
        String bucketName = "notice";
        String imgUrl = minioManager.uploadFile(file, bucketName);
        return RegisterNoticeImgResDto.builder()
                .imgUrl(imgUrl)
                .build();
    }

    @Override
    public void deleteNoticeImg(DeleteNoticeImgReqDto reqDto) throws Exception {
        minioManager.deleteFile(reqDto.getImgUrl());
    }

    @Override
    @Transactional
    public void registerNotice(Long memberId, RegisterNoticeReqDto reqDto) {
        noticePort.registerNotice(memberId, reqDto);
    }

    @Override
    @Transactional
    public void deleteNotice(DeleteNoticeReqDto reqDto) {
        noticePort.deleteNotice(reqDto);
    }

    @Override
    @Transactional
    public void modifyNotice(ModifyNoticeReqDto reqDto) {
        noticePort.modifyNotice(reqDto);
    }
}
