package org.greenpine.cheeseballoon.ranking.application.port.out;

import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

public interface RankingPort {

    List<FindAvgViewerRankResDtoInterface> findAvgViewerRanking(String dtCode, String platform, long memberId);
    List<FindTopViewerRankResDtoInterface> findTopViewerRanking(String dtCode, String platform, long memberId);
    List<FindFollowerRankResDtoInterface> findFollowerRanking(LocalDateTime startDate, LocalDateTime endDate, String platform, long memberId);
    List<FindRatingRankResDtoInterface> findRatingRanking(String dtCode, String platform, long memberId);
    List<FindTotalAirTimeRankResDtoInterface> findTotalAirTimeRanking(String dtCode, String platform, long memberId);
}
