package org.greenpine.cheeseballoon.ranking.adapter.out.persistence;

public interface FindLiveRankingInterface {
    Long getStreamer_id();
    Long getLive_id();
    Long getLive_log_id();
    String getName();
    String getTitle();
    String getThumbnail_url();
    char getPlatform();
    String getProfile_url();
    String getCategory();
    int getViewer_cnt();
    String getStream_url();
    String getChannel_url();
    Integer getBookmark();
}
