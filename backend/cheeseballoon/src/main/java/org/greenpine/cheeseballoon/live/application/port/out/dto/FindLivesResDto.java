package org.greenpine.cheeseballoon.live.application.port.out.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FindLivesResDto {
    Long streamId;
    Long liveId;
    Long liveLogId;
    String name;
    String title;
    String thumbnailUrl;
    char platform;
    String profileUrl;
    String category;
    int viewerCnt;
    String streamUrl;
    String channelUrl;
}
