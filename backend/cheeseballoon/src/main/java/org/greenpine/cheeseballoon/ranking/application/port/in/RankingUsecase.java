package org.greenpine.cheeseballoon.ranking.application.port.in;

import org.greenpine.cheeseballoon.ranking.application.port.in.dto.FindFollowRankingReqDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindFollowRankingResDto;

import java.util.List;

public interface RankingUsecase {
    List<FindFollowRankingResDto> findFollowRanking(FindFollowRankingReqDto reqDto);
}
