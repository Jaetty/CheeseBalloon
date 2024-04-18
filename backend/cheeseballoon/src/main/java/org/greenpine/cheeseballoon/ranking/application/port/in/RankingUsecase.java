package org.greenpine.cheeseballoon.ranking.application.port.in;

import org.greenpine.cheeseballoon.ranking.application.port.in.dto.FindFollowRankingReqDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindAvgViewerRankingResDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindFollowerRankingResDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindTopViewerRankingResDto;

import java.util.List;

public interface RankingUsecase {
    List<FindFollowerRankingResDto> findFollowRanking(FindFollowRankingReqDto reqDto);

    List<FindAvgViewerRankingResDto> findAvgViewerRanking(int date, char platform, long memberId);
    List<FindTopViewerRankingResDto> findTopViewerRanking(int date, char platform, long memberId);
}
