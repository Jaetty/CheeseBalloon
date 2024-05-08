package org.greenpine.cheeseballoon.member.adapter.out.persistence;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface ViewLogWithStream {
    long getView_log_id();
    long getStreamer_id();
    String getName();
    String getProfile_url();
    String getTitle();
    String getCategory();
    LocalDateTime getReg_dt();
}
