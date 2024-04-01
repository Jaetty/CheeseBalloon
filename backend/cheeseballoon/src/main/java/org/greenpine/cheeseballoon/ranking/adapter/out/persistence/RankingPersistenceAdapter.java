package org.greenpine.cheeseballoon.ranking.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.ranking.application.port.in.dto.FindFollowRankingReqDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.RankingPort;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindFollowRankingResDto;
import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.StreamerLogRepository;
import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.StreamerRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class RankingPersistenceAdapter implements RankingPort {
    final private StreamerRepository streamerRepository;

    @Override
    public List<FindFollowRankingResDto> findFollowRanking(FindFollowRankingReqDto reqDto) {
        return null;
    }
}
