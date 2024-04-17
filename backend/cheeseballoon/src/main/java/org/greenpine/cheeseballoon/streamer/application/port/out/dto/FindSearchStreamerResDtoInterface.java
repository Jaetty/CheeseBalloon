package org.greenpine.cheeseballoon.streamer.application.port.out.dto;

import java.math.BigInteger;

public interface FindSearchStreamerResDtoInterface {
    Long getStreamerId();

    String getName();

    boolean getIsLive();

    String getProfileUrl();

    String getChannelUrl();

    int getFollower();

    char getPlatform();
    Boolean getBookmark();
}
