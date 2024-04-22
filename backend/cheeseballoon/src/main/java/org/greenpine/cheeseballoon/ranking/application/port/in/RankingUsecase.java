package org.greenpine.cheeseballoon.ranking.application.port.in;

import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindAvgViewerRankingResDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindFollowerRankingResDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindTopViewerRankingResDto;

import java.util.List;

public interface RankingUsecase {
    List<FindAvgViewerRankingResDto> findAvgViewerRanking(int date, char platform, long memberId);
    List<FindTopViewerRankingResDto> findTopViewerRanking(int date, char platform, long memberId);
    List<FindFollowerRankingResDto> findFollowerRanking(int date, char platform, long memberId);
}
