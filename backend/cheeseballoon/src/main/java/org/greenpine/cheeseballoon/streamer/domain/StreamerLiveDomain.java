package org.greenpine.cheeseballoon.streamer.domain;

import lombok.Getter;

public class StreamerLiveDomain {

    @Getter
    private Long liveId;
    @Getter
    private Long liveOriginId;
    @Getter
    private String streamUrl;
    @Getter
    private String thumbnailUrl;
    private Boolean isLive;

    @Getter
    private StreamerDomain streamer;

    public StreamerLiveDomain() {
    }

    public StreamerLiveDomain(Long liveId, Long liveOriginId, String streamUrl, String thumbnailUrl, Boolean isLive, StreamerDomain streamer) {
        this.liveId = liveId;
        this.liveOriginId = liveOriginId;
        this.streamUrl = streamUrl;
        this.thumbnailUrl = thumbnailUrl;
        this.isLive = isLive;
        this.streamer = streamer;
    }

    public void liveCheck(){
        if(!this.isLive){
            this.thumbnailUrl = "blank";
            this.streamUrl = "blank";
        }
    }

    public void setLiveId(Long liveId) {
        this.liveId = liveId;
    }

    public void setLiveOriginId(Long liveOriginId) {
        this.liveOriginId = liveOriginId;
    }

    public void setStreamUrl(String streamUrl) {
        this.streamUrl = streamUrl;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    public Boolean getLive() {
        return isLive;
    }

    public void setLive(Boolean live) {
        isLive = live;
    }

    public void setStreamer(StreamerDomain streamer) {
        this.streamer = streamer;
    }

}
