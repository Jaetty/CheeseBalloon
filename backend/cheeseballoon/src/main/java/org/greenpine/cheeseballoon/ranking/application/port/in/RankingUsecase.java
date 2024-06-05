package org.greenpine.cheeseballoon.ranking.application.port.in;

import org.greenpine.cheeseballoon.ranking.application.port.out.dto.*;

import java.time.LocalDateTime;
import java.util.List;

public interface RankingUsecase {
    List<FindAvgViewerRankingResDto> findAvgViewerRanking(String[] dtCodes, String platform, long memberId);
    List<FindTopViewerRankingResDto> findTopViewerRanking(String[] dtCodes, String platform, long memberId);
    List<FindFollowerRankingResDto> findFollowerRanking(LocalDateTime[] dates, String platform, long memberId);
    List<FindRatingRankingResDto> findRatingRanking(String[] dtCodes, String platform, long memberId);
    List<FindTotalAirTimeRankingResDto> findTotalAirTimeRanking(String[] dtCodes, String platform, long memberId);
    List<FindLiveRankingResDto> findLiveRanking(Long memberId, Character platform);
}
