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

import java.util.ArrayList;
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
    public List<FindAvgViewerRankResDtoInterface> findAvgViewerRanking(int limit, int off, int date, char platform) {

        String[] dates = dateValue.getPeriod(date);

        List<FindAvgViewerRankResDtoInterface> ret;

        System.out.println(dates[0] + " " + dates[1]);
        System.out.println(dates[2] + " " + dates[3]);

        if(platform=='T'){
            ret = liveRepository.findAllAvgViewerRanking(limit, off, dates[0], dates[1]);
        }
        else{
            ret = liveRepository.findAvgViewerRankingByPlatform(limit, off, dates[0], dates[1], platform);
        }

        return ret;
    }


}
