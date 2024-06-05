package org.greenpine.cheeseballoon.ranking.application.port.out.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FindTotalAirTimeRankingResDto {

    Long streamerId;
    String name;
    int rank;
    String platform;
    String profileUrl;
    String totalAirTime;
    int rankDiff;
    String diff;
    boolean bookmark;

}
