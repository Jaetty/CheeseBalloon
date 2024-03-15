package org.greenpine.cheeseballoon.search.application.port.out.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FindSearchLiveResDto {

    Long streamId;
    Long liveId;
    String name;
    String thumbnail;
    char platform;
    String profileUrl;
    String category;
    int viewerCnt;

}
