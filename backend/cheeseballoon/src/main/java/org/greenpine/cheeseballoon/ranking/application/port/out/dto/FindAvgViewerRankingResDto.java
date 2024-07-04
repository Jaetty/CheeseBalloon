package org.greenpine.cheeseballoon.ranking.application.port.out.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FindAvgViewerRankingResDto {

    Long streamerId;
    String name;
    int rank;
    String platform;
    String profileUrl;
    int averageViewer;
    int rankDiff;
    int diff;
    boolean bookmark;

}
