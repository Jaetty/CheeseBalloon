package org.greenpine.cheeseballoon.search.application.port.out.dto;

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
    String streamUrl;
    int followerCnt;
    char platform;

}
