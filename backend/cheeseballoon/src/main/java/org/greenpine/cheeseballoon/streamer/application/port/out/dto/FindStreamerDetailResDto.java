package org.greenpine.cheeseballoon.streamer.application.port.out.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class FindStreamerDetailResDto {

    Long streamerId;
    String name;
    boolean isLive;
    String profileUrl;
    String channelUrl;
    int follower;
    char platform;
    Integer rank;
    Integer diff;

}
