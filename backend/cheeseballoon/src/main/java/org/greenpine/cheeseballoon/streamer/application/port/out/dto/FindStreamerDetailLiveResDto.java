package org.greenpine.cheeseballoon.streamer.application.port.out.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class FindStreamerDetailLiveResDto {

    private long liveId;
    private long liveLogId;
    private boolean isLive;
    private String streamerUrl;
    private String thumbnailUrl;

}
