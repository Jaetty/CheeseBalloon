package org.greenpine.cheeseballoon.streamer.application.port.out.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class FindStreamerSummaryResDto {

    Integer rank;
    Integer diff;
    Integer avgViewer;
    Integer viewerDiff;
    Integer totalAirTime;
    Integer timeDiff;
    Integer follow;
    Integer followDiff;
    Double rating;
    Double ratingDiff;

}
