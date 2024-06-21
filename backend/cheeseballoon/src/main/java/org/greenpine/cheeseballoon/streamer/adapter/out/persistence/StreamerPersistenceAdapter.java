package org.greenpine.cheeseballoon.streamer.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveEntity;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveRepository;
import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.StatisticsEntity;
import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.StatisticsRepository;
import org.greenpine.cheeseballoon.streamer.application.port.out.StreamerPort;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.*;
import org.greenpine.cheeseballoon.streamer.domain.StreamerDomain;
import org.greenpine.cheeseballoon.streamer.domain.StreamerLiveDomain;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class StreamerPersistenceAdapter implements StreamerPort { // 어뎁터는 포트를 구현하는, 포트와 도메인을 연결시키는 역할을 수행한다.

    private final StreamerRepository streamerRepository;
    private final StreamerLogRepository streamerLogRepository;
    private final LiveRepository liveRepository;
    private final StatisticsRepository statisticsRepository;

    @Override
    public StreamerEntity findByStreamerId(Long streamerId) {
        return streamerRepository.findByStreamerId(streamerId);
    }

    @Override
    public List<FindSearchStreamerResDtoInterface> searchStreamersByName(String query, long memberId) {

        List<FindSearchStreamerResDtoInterface> result = streamerRepository.findStreamerInfoByName(query, memberId);

        return result;
    }

    @Override
    public FindSummaryRankResDtoInterface streamerDetailSummary(Long streamerId, String dtCode, LocalDateTime startDate, LocalDateTime endDate) {
        return statisticsRepository.findRankingByDtCodeAndStreamerIdAndDates(dtCode, streamerId, startDate, endDate);
    }


    // 이 부분으로 특정 기간 동안의 평균 랭킹을 낸다.
    // 멤버id로 즐겨찾기 여부를 검색해줘야한다.
    @Override
    public FindStreamerDetailResDto streamerDetail(Long streamerId, long memberId) {

        FindStreamerDetailResDtoInterface dto = streamerRepository.findStreamerDetailByStreamerId(streamerId,memberId);

        FindStreamerDetailResDto ret = FindStreamerDetailResDto.builder()
                .streamerId(dto.getStreamerId())
                .name(dto.getName())
                .originId(dto.getOriginId())
                .profileUrl(dto.getProfileUrl())
                .channelUrl(dto.getChannelUrl())
                .bookmark(dto.getBookmark())
                .platform(dto.getPlatform())
                .build();

        return ret;
    }

    @Override
    public StreamerLiveDomain streamerDetailLive(Long streamerId) {

        LiveEntity liveEntity = liveRepository.findFirstByStreamer_StreamerIdOrderByLiveIdDesc(streamerId);

        StreamerDomain streamerDomain = new StreamerDomain(
                liveEntity.getStreamer().getStreamerId(),
                liveEntity.getStreamer().getOriginId(),
                liveEntity.getStreamer().getName(),
                liveEntity.getStreamer().getProfileUrl(),
                liveEntity.getStreamer().getChannelUrl(),
                liveEntity.getStreamer().getPlatform());

        StreamerLiveDomain liveDomain = new StreamerLiveDomain(liveEntity.getLiveId(),
                liveEntity.getLiveOriginId(),
                liveEntity.getStreamUrl(),
                liveEntity.getThumbnailUrl(),
                liveEntity.getIsLive(),
                streamerDomain);


        return liveDomain;
    }

    @Override
    public List<StreamerLogEntity> streamerDetailFollower(Long streamerId, LocalDateTime startDate, LocalDateTime endDate) {

        StreamerEntity streamerEntity = StreamerEntity.builder().streamerId(streamerId).build();

        return streamerLogRepository.findStreamerLogEntitiesByStreamerAndRegDtBetween(streamerEntity, startDate, endDate);
    }

    @Override
    public List<FindStreamerDailyViewerResDtoInterface> streamerDetailViewer(Long streamerId, LocalDateTime startDate, LocalDateTime endDate) {

        return streamerRepository.findDailyViewer(streamerId, startDate, endDate);
    }

    @Override
    public List<FindStreamerRatingResDtoInterface> streamerDetailRating(Long streamerId, LocalDateTime startDate, LocalDateTime endDate) {

        return streamerRepository.findRatingInfo(streamerId, startDate, endDate);
    }

    @Override
    public List<FindStreamerCategoryResDtoInterface> streamerDetailCategory(Long streamerId, LocalDateTime startDate, LocalDateTime endDate) {
        return streamerRepository.findCategoryInfo(streamerId, startDate, endDate);
    }

    @Override
    public List<FindTimeDetailResDtoInterface> streamerDetailTime(Long streamerId, LocalDateTime startDate, LocalDateTime endDate) {
        return liveRepository.findDetailTimeByDatesAndStreamerId(streamerId, startDate, endDate);
    }

    @Override
    public StatisticsEntity streamerStatistics(StreamerEntity streamerEntity, String dtCode) {
        return statisticsRepository.findByStreamerAndDtCode(streamerEntity,dtCode);
    }


}
