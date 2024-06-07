package org.greenpine.cheeseballoon.notice.adapter.out.persistence;

import java.time.LocalDateTime;

public interface NoticeInfo {
    Long getNotice_id();
    String getTitle();
    String getContent();
    String getThumbnail();
    String getNickname();
    LocalDateTime getReg_dt();
}
