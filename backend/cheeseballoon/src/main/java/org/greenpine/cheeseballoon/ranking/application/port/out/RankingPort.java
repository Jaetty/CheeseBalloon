package org.greenpine.cheeseballoon.ranking.application.port.out;

import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.FindAvgViewerRankResDtoInterface;
import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.FindFollowerRankResDtoInterface;
import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.FindRatingRankResDtoInterface;
import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.FindTopViewerRankResDtoInterface;

import java.time.LocalDateTime;
import java.util.List;

public interface RankingPort {

    List<FindAvgViewerRankResDtoInterface> findAvgViewerRanking(LocalDateTime startDate, LocalDateTime endDate, String platform, long memberId);
    List<FindTopViewerRankResDtoInterface> findTopViewerRanking(LocalDateTime startDate, LocalDateTime endDate, String platform, long memberId);
    List<FindFollowerRankResDtoInterface> findFollowerRanking(LocalDateTime startDate, LocalDateTime endDate, String platform, long memberId);
    List<FindRatingRankResDtoInterface> findRatingRanking(LocalDateTime startDate, LocalDateTime endDate, String platform, long memberId);
}
