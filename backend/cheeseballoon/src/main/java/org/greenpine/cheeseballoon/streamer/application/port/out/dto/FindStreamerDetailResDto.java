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
    String originId;
    String profileUrl;
    String channelUrl;
    Boolean bookmark;
    char platform;

}
