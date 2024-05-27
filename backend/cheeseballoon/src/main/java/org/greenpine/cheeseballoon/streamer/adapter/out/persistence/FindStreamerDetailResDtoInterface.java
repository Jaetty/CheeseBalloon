package org.greenpine.cheeseballoon.streamer.adapter.out.persistence;

public interface FindStreamerDetailResDtoInterface {

    Long getStreamerId();
    String getName();
    String getOriginId();
    String getProfileUrl();
    String channelUrl();
    Boolean getBookmark();
    Character getPlatform();

}
