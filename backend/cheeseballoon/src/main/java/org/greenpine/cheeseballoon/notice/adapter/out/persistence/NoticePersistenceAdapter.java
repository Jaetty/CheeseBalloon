package org.greenpine.cheeseballoon.notice.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.global.exception.NotFindException;
import org.greenpine.cheeseballoon.member.adapter.out.persistence.MemberEntity;
import org.greenpine.cheeseballoon.notice.application.port.in.dto.*;
import org.greenpine.cheeseballoon.notice.application.port.out.NoticePort;
import org.greenpine.cheeseballoon.notice.application.port.out.dto.FindAllNoticeResDto;
import org.greenpine.cheeseballoon.notice.application.port.out.dto.FindNoticeResDto;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class NoticePersistenceAdapter implements NoticePort {
    private final NoticeRepository noticeRepository;
    @Override
    public FindNoticeResDto findNotice(FindNoticeReqDto reqDto) {
        NoticeInfo entity = noticeRepository.findNotice(reqDto.getNoticeId());
        return FindNoticeResDto.builder()
                .noticeId(entity.getNotice_id())
                .nickname(entity.getNickname())
                .title(entity.getTitle())
                .content(entity.getContent())
                .thumbnail(entity.getThumbnail())
                .regDt(entity.getReg_dt())
                .build();

    }

    @Override
    public List<FindAllNoticeResDto> findAllNotice(FindAllNoticeReqDto reqDto) {
        int limit = reqDto.getLimit();
        int offset = reqDto.getOffset();
        List<NoticeInfo> entities = noticeRepository.findAllNotice(limit, offset);
        return entities.stream().map(
                en ->FindAllNoticeResDto.builder()
                    .noticeId(en.getNotice_id())
                    .title(en.getTitle())
                    .content(en.getContent())
                    .nickname(en.getNickname())
                    .thumbnail(en.getThumbnail())
                    .regDt(en.getReg_dt())
                    .build()
            )
            .toList();
    }

    @Override
    public void registerNotice(Long memberId, RegisterNoticeReqDto reqDto) {
        MemberEntity member = MemberEntity.builder().memberId(memberId).build();
        NoticeEntity notice = NoticeEntity.builder()
                .title(reqDto.getTitle())
                .content(reqDto.getContent())
                .thumbnail(reqDto.getThumbnail())
                .member(member)
                .build();
        noticeRepository.save(notice);

    }

    @Override
    public void modifyNotice(ModifyNoticeReqDto reqDto) {
        NoticeEntity notice = noticeRepository.findById(reqDto.getNoticeId())
                .orElseThrow(NotFindException::new);
        notice.setContent(reqDto.getContent());
        notice.setThumbnail(reqDto.getThumbnail());
        notice.setTitle(reqDto.getTitle());
    }

    @Override
    public void deleteNotice(DeleteNoticeReqDto reqDto) {

        NoticeEntity notice = noticeRepository.findById(reqDto.getNoticeId())
                .orElseThrow(NotFindException::new);
        noticeRepository.delete(notice);

    }
}
