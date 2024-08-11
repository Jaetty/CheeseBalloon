package org.greenpine.cheeseballoon.notice.application.port.in;

import org.greenpine.cheeseballoon.notice.application.port.in.dto.*;
import org.greenpine.cheeseballoon.notice.application.port.out.dto.FindAllNoticeResDto;
import org.greenpine.cheeseballoon.notice.application.port.out.dto.FindNoticeResDto;
import org.greenpine.cheeseballoon.notice.application.port.out.dto.RegisterNoticeImgResDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface NoticeUsecase {
    FindNoticeResDto findNotice(FindNoticeReqDto reqDto);
    List<FindAllNoticeResDto> findAllNotice(FindAllNoticeReqDto reqDto);

    RegisterNoticeImgResDto registerNoticeImg(MultipartFile file) throws Exception;

    void deleteNoticeImg(DeleteNoticeImgReqDto reqDto) throws Exception;

    void registerNotice(Long memberId, RegisterNoticeReqDto reqDto);

    void deleteNotice(DeleteNoticeReqDto reqDto);

    void modifyNotice(ModifyNoticeReqDto reqDto);
}
