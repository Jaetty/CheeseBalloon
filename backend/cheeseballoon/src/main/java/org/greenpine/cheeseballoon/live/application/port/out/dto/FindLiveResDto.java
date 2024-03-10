package org.greenpine.cheeseballoon.live.application.port.out.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FindLiveResDto {
    Long streamId;
    Long liveId;
    String name;
    String title;
    String thumbnail;
    char platform;
    String profileUrl;
    String category;
    int viewerCnt;
    String streamUrl;
    String channelUrl;
}
