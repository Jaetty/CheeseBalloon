package org.greenpine.cheeseballoon.ranking.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveRepository;
import org.greenpine.cheeseballoon.ranking.application.port.in.dto.FindFollowRankingReqDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.RankingPort;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindAvgViewerRankResDtoInterface;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindFollowRankingResDto;
import org.greenpine.cheeseballoon.ranking.domain.DateValue;
import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.StreamerRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class RankingPersistenceAdapter implements RankingPort {

    final private StreamerRepository streamerRepository;
    final private LiveRepository liveRepository;
    final private DateValue dateValue;

    @Override
    public List<FindFollowRankingResDto> findFollowRanking(FindFollowRankingReqDto reqDto) {
        return null;
    }

    @Override
    public List<FindAvgViewerRankResDtoInterface>[] findAvgViewerRanking(int date, char platform) {

        String[] dates = dateValue.getPeriod(date);

        List<FindAvgViewerRankResDtoInterface>[] ret = new List[2];

        // T는 전체 가져오기 T외의 값은 해당 플랫폼에 대해서만 가져오기
        if(platform=='T'){
            ret[0] = liveRepository.findAllAvgViewerRanking(dates[0], dates[1]);
            ret[1] = liveRepository.findAllAvgViewerRanking(dates[2], dates[3]);
        }
        else{
            ret[0] = liveRepository.findAvgViewerRankingByPlatform(dates[0], dates[1], platform);
            ret[1] = liveRepository.findAvgViewerRankingByPlatform(dates[2], dates[3], platform);
        }

        return ret;
    }


}
