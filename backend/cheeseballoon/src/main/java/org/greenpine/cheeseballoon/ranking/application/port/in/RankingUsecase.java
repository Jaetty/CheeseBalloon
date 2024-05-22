package org.greenpine.cheeseballoon.ranking.application.port.in;

import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindAvgViewerRankingResDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindFollowerRankingResDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindRatingRankingResDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindTopViewerRankingResDto;

import java.time.LocalDateTime;
import java.util.List;

public interface RankingUsecase {
    List<FindAvgViewerRankingResDto> findAvgViewerRanking(LocalDateTime[] dates, String platform, long memberId);
    List<FindTopViewerRankingResDto> findTopViewerRanking(LocalDateTime[] dates, String platform, long memberId);
    List<FindFollowerRankingResDto> findFollowerRanking(LocalDateTime[] dates, String platform, long memberId);
    List<FindRatingRankingResDto> findRatingRanking(LocalDateTime[] dates, String platform, long memberId);
}
