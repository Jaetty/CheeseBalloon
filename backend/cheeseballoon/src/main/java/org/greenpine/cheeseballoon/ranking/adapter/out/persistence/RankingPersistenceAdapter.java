package org.greenpine.cheeseballoon.ranking.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.ranking.application.port.out.RankingPort;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindLiveRankingResDto;
import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.StreamerLogRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class RankingPersistenceAdapter implements RankingPort {

    final private StatisticsRepository statisticsRepository;
    final private StreamerLogRepository streamerLogRepository;

    // 평균 시청자 수 db 값 가져오기
    @Override
    public List<FindAvgViewerRankResDtoInterface> findAvgViewerRanking(String dtCode, String platform, long memberId) {

        List<FindAvgViewerRankResDtoInterface> ret = statisticsRepository.findAverageViewerRanking(dtCode, platform, memberId);
        return ret;
    }

    // 최대 시청자 수 db 값 가져오기
    @Override
    public List<FindTopViewerRankResDtoInterface> findTopViewerRanking(String dtCode, String platform, long memberId) {

        List<FindTopViewerRankResDtoInterface> ret = statisticsRepository.findTopViewerRanking(dtCode, platform, memberId);

        return ret;
    }

    @Override
    public List<FindFollowerRankResDtoInterface> findFollowerRanking(LocalDateTime startDate, LocalDateTime endDate, String platform, long memberId) {

        List<FindFollowerRankResDtoInterface> ret = streamerLogRepository.findFollowerRanking(startDate, endDate, platform, memberId);

        return ret;
    }

    @Override
    public List<FindRatingRankResDtoInterface> findRatingRanking(String dtCode, String platform, long memberId) {

        List<FindRatingRankResDtoInterface> ret = statisticsRepository.findRatingRanking(dtCode, platform, memberId);
        return ret;
    }

    @Override
    public List<FindTotalAirTimeRankResDtoInterface> findTotalAirTimeRanking(String dtCode, String platform, long memberId) {

        List<FindTotalAirTimeRankResDtoInterface> ret = statisticsRepository.findTotalAirTimeRanking(dtCode, platform, memberId);
        return ret;
    }

    @Override
    public List<FindLiveRankingResDto> findLiveRanking(Long memberId, Character platform) {
        List<FindLiveRankingInterface> entities=null;
        if(memberId==null){
            if(platform=='T')
                entities = statisticsRepository.findLiveRanking();
            else
                entities = statisticsRepository.findLiveRankingWithPlatform(platform);

        }else{
            if(platform=='T')
                entities = statisticsRepository.findLiveRankingWithMemberId(memberId);
            else
                entities = statisticsRepository.findLiveRankingWithMemberIdAndPlatform(memberId,platform);
        }
//        for(FindLiveRankingInterface e : entities){
//            System.out.println(e.getLive_id() + " " + e.getName());
//        }
        return entities.stream().map(en -> FindLiveRankingResDto.builder()
                .streamerId(en.getStreamer_id())
                .liveId(en.getLive_id())
                .name(en.getName())
                .liveLogId(en.getLive_log_id())
                .title(en.getTitle())
                .profileUrl(en.getProfile_url())
                .streamUrl(en.getStream_url())
                .thumbnailUrl(en.getThumbnail_url())
                .viewerCnt(en.getViewer_cnt())
                .channelUrl(en.getChannel_url())
                .platform(en.getPlatform())
                .category(en.getCategory())
                .bookmark(en.getBookmark() != null && en.getBookmark() == 1)
                .build()
        ).toList();

    }


}
