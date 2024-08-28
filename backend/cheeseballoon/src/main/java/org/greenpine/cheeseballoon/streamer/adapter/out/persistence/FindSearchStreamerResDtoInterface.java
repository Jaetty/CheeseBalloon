package org.greenpine.cheeseballoon.streamer.adapter.out.persistence;

import java.math.BigInteger;

public interface FindSearchStreamerResDtoInterface {
    Long getStreamer_id();

    String getName();

    boolean getIsLive();

    String getProfile_url();

    String getChannel_url();

    int getFollower();

    char getPlatform();
    Boolean getBookmark();
}
