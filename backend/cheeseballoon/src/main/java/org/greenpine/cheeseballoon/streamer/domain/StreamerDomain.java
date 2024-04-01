package org.greenpine.cheeseballoon.streamer.domain;

public class StreamerDomain {

    private Long streamerId;
    private String originId;
    private String name;
    private String profileUrl;
    private String channelUrl;
    private Character platform;

    public StreamerDomain(Long streamerId, String originId, String name, String profileUrl, String channelUrl, Character platform) {
        this.streamerId = streamerId;
        this.originId = originId;
        this.name = name;
        this.profileUrl = profileUrl;
        this.channelUrl = channelUrl;
        this.platform = platform;
    }

    public Long getStreamerId() {
        return streamerId;
    }

    public void setStreamerId(Long streamerId) {
        this.streamerId = streamerId;
    }

    public String getOriginId() {
        return originId;
    }

    public void setOriginId(String originId) {
        this.originId = originId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProfileUrl() {
        return profileUrl;
    }

    public void setProfileUrl(String profileUrl) {
        this.profileUrl = profileUrl;
    }

    public String getChannelUrl() {
        return channelUrl;
    }

    public void setChannelUrl(String channelUrl) {
        this.channelUrl = channelUrl;
    }

    public Character getPlatform() {
        return platform;
    }

    public void setPlatform(Character platform) {
        this.platform = platform;
    }
}
