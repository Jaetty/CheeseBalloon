package org.greenpine.cheeseballoon.ranking.application.port.out;

import org.greenpine.cheeseballoon.ranking.application.port.in.dto.FindFollowRankingReqDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.*;

import java.time.LocalDateTime;
import java.util.List;

public interface RankingPort {

    List<FindAvgViewerRankResDtoInterface> findAvgViewerRanking(LocalDateTime startDate, LocalDateTime endDate, char platform, long memberId);
    List<FindTopViewerRankResDtoInterface> findTopViewerRanking(LocalDateTime startDate, LocalDateTime endDate, char platform, long memberId);
    List<FindFollowerRankResDtoInterface> findFollowerRanking(LocalDateTime startDate, LocalDateTime endDate, char platform, long memberId);
    List<FindRatingRankResDtoInterface> findRatingRanking(LocalDateTime startDate, LocalDateTime endDate, char platform, long memberId);
}
