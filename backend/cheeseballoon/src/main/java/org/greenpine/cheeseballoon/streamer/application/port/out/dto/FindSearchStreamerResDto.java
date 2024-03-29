package org.greenpine.cheeseballoon.streamer.application.port.out.dto;

import jakarta.persistence.Convert;
import lombok.*;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class FindSearchStreamerResDto {

    Long streamerId;
    String name;
    boolean isLive;
    String profileUrl;
    String channelUrl;
    int follower;
    char platform;

}
