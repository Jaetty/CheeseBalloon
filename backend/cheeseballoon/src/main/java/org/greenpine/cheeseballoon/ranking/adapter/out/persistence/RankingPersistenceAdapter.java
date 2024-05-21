package org.greenpine.cheeseballoon.ranking.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveRepository;
import org.greenpine.cheeseballoon.ranking.application.port.out.RankingPort;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class RankingPersistenceAdapter implements RankingPort {

    final private LiveRepository liveRepository;

    // 평균 시청자 수 db 값 가져오기
    @Override
    public List<FindAvgViewerRankResDtoInterface> findAvgViewerRanking(LocalDateTime startDate, LocalDateTime endDate, char platform, long memberId) {

        List<FindAvgViewerRankResDtoInterface> ret = liveRepository.findAllAvgViewerRanking(startDate, endDate, platform, memberId);
        return ret;
    }

    // 최대 시청자 수 db 값 가져오기
    @Override
    public List<FindTopViewerRankResDtoInterface> findTopViewerRanking(LocalDateTime startDate, LocalDateTime endDate, char platform, long memberId) {

        List<FindTopViewerRankResDtoInterface> ret = liveRepository.findAllTopViewerRanking(startDate, endDate, platform, memberId);

        return ret;
    }

    @Override
    public List<FindFollowerRankResDtoInterface> findFollowerRanking(LocalDateTime startDate, LocalDateTime endDate, char platform, long memberId) {

        List<FindFollowerRankResDtoInterface> ret = liveRepository.findFollowerRanking(startDate, endDate, platform, memberId);

        return ret;
    }

    @Override
    public List<FindRatingRankResDtoInterface> findRatingRanking(LocalDateTime startDate, LocalDateTime endDate, char platform, long memberId) {

        List<FindRatingRankResDtoInterface> ret = liveRepository.findRatingRanking(startDate, endDate, platform, memberId);
        return ret;
    }


}
