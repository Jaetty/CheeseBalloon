package org.greenpine.cheeseballoon.notice.application.port.out;

import org.greenpine.cheeseballoon.notice.application.port.in.dto.*;
import org.greenpine.cheeseballoon.notice.application.port.out.dto.FindAllNoticeResDto;
import org.greenpine.cheeseballoon.notice.application.port.out.dto.FindNoticeResDto;
import org.greenpine.cheeseballoon.notice.application.port.out.dto.RegisterNoticeImgResDto;

import java.util.List;

public interface NoticePort {
    FindNoticeResDto findNotice(FindNoticeReqDto reqDto);
    List<FindAllNoticeResDto> findAllNotice(FindAllNoticeReqDto reqDto);
    void registerNotice(Long memberId, RegisterNoticeReqDto reqDto);
    void modifyNotice(ModifyNoticeReqDto reqDto);
    void deleteNotice(DeleteNoticeReqDto reqDto);
}
