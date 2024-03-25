package org.greenpine.cheeseballoon.ranking.application.port.out.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FollowRankingResDto {

    Long streamerId;
    String name;
    int rank;
    char platform;
    String profileUrl;
    int followCnt;
    int diff;
    boolean bookmark;

}
