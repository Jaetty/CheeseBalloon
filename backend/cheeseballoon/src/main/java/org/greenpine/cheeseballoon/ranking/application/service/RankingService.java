package org.greenpine.cheeseballoon.ranking.application.service;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.ranking.application.port.in.RankingUsecase;
import org.greenpine.cheeseballoon.ranking.application.port.in.dto.FindFollowRankingReqDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.RankingPort;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindFollowRankingResDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RankingService implements RankingUsecase {

    private final RankingPort rankingPort;
    @Override
    public List<FindFollowRankingResDto> findFollowRanking(FindFollowRankingReqDto reqDto) {
        List<FindFollowRankingResDto> res = rankingPort.findFollowRanking(reqDto);
        return res;
    }
}
