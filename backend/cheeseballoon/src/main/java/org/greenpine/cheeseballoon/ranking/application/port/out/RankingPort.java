package org.greenpine.cheeseballoon.ranking.application.port.out;

import org.greenpine.cheeseballoon.ranking.application.port.in.dto.FindFollowRankingReqDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindAvgViewerRankResDtoInterface;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindFollowerRankingResDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindTopViewerRankResDtoInterface;

import java.util.List;

public interface RankingPort {
    List<FindFollowerRankingResDto> findFollowRanking(FindFollowRankingReqDto reqDto);

    List<FindAvgViewerRankResDtoInterface>[] findAvgViewerRanking(int date, char platform, long memberId);
    List<FindTopViewerRankResDtoInterface>[] findTopViewerRanking(int date, char platform, long memberId);
}
