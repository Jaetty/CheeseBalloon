package org.greenpine.cheeseballoon.streamer.adapter.out.persistence;

public interface FindStreamerDetailResDtoInterface {

    Long getStreamerId();
    String getName();
    String getOriginId();
    String getProfileUrl();
    String getChannelUrl();
    Boolean getBookmark();
    Character getPlatform();

}
