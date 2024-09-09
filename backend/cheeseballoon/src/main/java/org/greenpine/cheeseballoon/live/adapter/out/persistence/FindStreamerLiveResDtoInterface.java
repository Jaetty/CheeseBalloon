package org.greenpine.cheeseballoon.live.adapter.out.persistence;

public interface FindStreamerLiveResDtoInterface {

    Long getLiveId();
    Long getLiveLogId();
    Boolean getIsLive();
    String getStreamUrl();
    String getThumbnailUrl();

}
