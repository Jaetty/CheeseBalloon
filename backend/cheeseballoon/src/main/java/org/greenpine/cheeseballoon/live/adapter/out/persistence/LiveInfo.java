package org.greenpine.cheeseballoon.live.adapter.out.persistence;

public interface LiveInfo {

    Long getStreamer_id();
    Long getLive_id();
    Long getLive_log_id();
    String getName();
    String getTitle();
    String getThumbnail_url();
    Character getPlatform();
    String getProfile_url();
    String getCategory();
    Integer getViewer_cnt();
    String getStream_url();
    String getChannel_url();

}
