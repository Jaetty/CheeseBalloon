package org.greenpine.cheeseballoon.live.application.port.out.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SearchLivesResDto {
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
