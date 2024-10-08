package org.greenpine.cheeseballoon.notice.adapter.out.persistence;

import java.time.LocalDateTime;

public interface NoticeInfo {
    Long getNotice_id();
    String getTitle();
    String getContent();
    String getThumbnail();
    String getNickname();
    LocalDateTime getReg_dt();
    String getPrev_notice_title();
    Long getPrev_notice_id();
    String getNext_notice_title();
    Long getNext_notice_id();
}
