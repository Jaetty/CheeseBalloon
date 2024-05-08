package org.greenpine.cheeseballoon.ranking.application.port.out;

import org.greenpine.cheeseballoon.ranking.application.port.in.dto.FindFollowRankingReqDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.*;

import java.util.List;

public interface RankingPort {

    List<FindAvgViewerRankResDtoInterface>[] findAvgViewerRanking(int date, char platform, long memberId);
    List<FindTopViewerRankResDtoInterface>[] findTopViewerRanking(int date, char platform, long memberId);
    List<FindFollowerRankResDtoInterface>[] findFollowerRanking(int date, char platform, long memberId);
    List<FindRatingRankResDtoInterface>[] findRatingRanking(int date, char platform, long memberId);
}
