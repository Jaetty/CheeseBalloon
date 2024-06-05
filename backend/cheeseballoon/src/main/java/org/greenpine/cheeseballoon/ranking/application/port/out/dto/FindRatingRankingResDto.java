package org.greenpine.cheeseballoon.ranking.application.port.out.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FindRatingRankingResDto {

    Long streamerId;
    String name;
    int rank;
    String platform;
    String profileUrl;
    double rating;
    int rankDiff;
    double diff;
    boolean bookmark;

}
