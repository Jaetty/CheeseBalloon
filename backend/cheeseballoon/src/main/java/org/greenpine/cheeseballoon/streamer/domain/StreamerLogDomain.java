package org.greenpine.cheeseballoon.streamer.domain;

import java.time.LocalDateTime;

public class StreamerLogDomain {

    private Long streamerLogId;
    private StreamerDomain streamer;
    private Integer follower;
    private LocalDateTime regDt;

    public StreamerLogDomain(Long streamerLogId, StreamerDomain streamer, Integer follower, LocalDateTime regDt) {
        this.streamerLogId = streamerLogId;
        this.streamer = streamer;
        this.follower = follower;
        this.regDt = regDt;
    }


    public Long getStreamerLogId() {
        return streamerLogId;
    }

    public void setStreamerLogId(Long streamerLogId) {
        this.streamerLogId = streamerLogId;
    }

    public StreamerDomain getStreamer() {
        return streamer;
    }

    public void setStreamer(StreamerDomain streamer) {
        this.streamer = streamer;
    }

    public Integer getFollower() {
        return follower;
    }

    public void setFollower(Integer follower) {
        this.follower = follower;
    }

    public LocalDateTime getRegDt() {
        return regDt;
    }

    public void setRegDt(LocalDateTime regDt) {
        this.regDt = regDt;
    }

}
