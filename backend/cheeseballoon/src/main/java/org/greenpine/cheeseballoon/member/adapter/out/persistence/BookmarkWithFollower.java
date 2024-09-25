package org.greenpine.cheeseballoon.member.adapter.out.persistence;

import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.StreamerEntity;

public interface BookmarkWithFollower {
    Long getBookmark_id();
    Long getStreamer_id();
    String getName();
    Character getPlatform();
    String getProfile_url();
    String getChannel_url();
    Integer getFollower();
    String getStream_url();
    Boolean getIs_live();
}
