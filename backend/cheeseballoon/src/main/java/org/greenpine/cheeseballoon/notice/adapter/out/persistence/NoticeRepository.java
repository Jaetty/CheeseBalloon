package org.greenpine.cheeseballoon.notice.adapter.out.persistence;

import org.greenpine.cheeseballoon.member.adapter.out.persistence.BookmarkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NoticeRepository extends JpaRepository<NoticeEntity,Long> {
    @Query(value ="SELECT members.nickname, notices.* FROM notices " +
            "LEFT JOIN members ON notices.member_id=members.member_id " +
            "WHERE notices.notice_id = :noticeId"
            ,nativeQuery = true)
    NoticeInfo findNotice(Long noticeId);

    @Query(value ="SELECT members.nickname, notices.* FROM notices " +
            "LEFT JOIN members ON notices.member_id=members.member_id " +
            "ORDER BY notice_id DESC " +
            "LIMIT :limit OFFSET :offset"
            ,nativeQuery = true)
    List<NoticeInfo> findAllNotice(int limit, int offset);
}
