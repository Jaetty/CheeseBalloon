package org.greenpine.cheeseballoon.ranking.adapter.out.persistence;

public interface FindLiveRankingInterface {
    Long getStreamId();
    Long getLiveId();
    Long getLiveLogId();
    String getName();
    String getTitle();
    String getThumbnailUrl();
    char getPlatform();
    String getProfileUrl();
    String getCategory();
    int getViewerCnt();
    String getStreamUrl();
    String getChannelUrl();
    Boolean getBookmark();
}
