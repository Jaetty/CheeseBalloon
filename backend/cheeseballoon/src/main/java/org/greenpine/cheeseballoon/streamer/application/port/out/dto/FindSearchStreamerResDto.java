package org.greenpine.cheeseballoon.streamer.application.port.out.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FindSearchStreamerResDto {

    Long streamId;
    String name;
    boolean isLive;
    String profileUrl;
    String channelUrl;
    int follower;
    char platform;

}
