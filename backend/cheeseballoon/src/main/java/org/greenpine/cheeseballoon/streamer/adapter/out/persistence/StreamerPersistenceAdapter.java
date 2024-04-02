package org.greenpine.cheeseballoon.streamer.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveEntity;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveLogRepository;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveRepository;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindAvgViewerRankByStreamerIdAndDateDto;
import org.greenpine.cheeseballoon.streamer.application.port.out.StreamerPort;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDtoInterface;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindStreamerDetailResDto;
import org.greenpine.cheeseballoon.streamer.domain.StreamerDomain;
import org.greenpine.cheeseballoon.streamer.domain.StreamerLiveDomain;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class StreamerPersistenceAdapter implements StreamerPort { // 어뎁터는 포트를 구현하는, 포트와 도메인을 연결시키는 역할을 수행한다.

    private final StreamerRepository streamerRepository;
    private final StreamerLogRepository streamerLogRepository;
    private final LiveRepository liveRepository;
    private final LiveLogRepository liveLogRepository;

    @Override
    public List<FindSearchStreamerResDtoInterface> searchStreamersByName(String query) {

        List<FindSearchStreamerResDtoInterface> result = streamerRepository.searchStreamerByName(query);

        return result;
    }


    // 이 부분으로 특정 기간 동안의 평균 랭킹을 낸다.
    @Override
    public FindStreamerDetailResDto streamerDetail(Long streamerId) {

        StreamerEntity streamerEntity = streamerRepository.findByStreamerId(streamerId);

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime before = now.minus(7, ChronoUnit.DAYS);

        System.out.println(before.format(DateTimeFormatter.ofPattern("yyyy-MM-dd 00:00:00")));
        System.out.println(before.format(DateTimeFormatter.ofPattern("yyyy-MM-dd 23:59:59")));

//        FindAvgViewerRankByStreamerIdAndDateDto currDate = liveLogRepository.findAvgViewerRankByStreamerIdAndDate(streamerId, now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")), before.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));

        int diff = 0;

//        FindStreamerDetailResDto result = FindStreamerDetailResDto.builder()
//                .streamerId(streamerId)
//                .channelUrl(streamerEntity.getChannelUrl())
//                .rank(currDate.getRank())
//                .name(streamerEntity.getName())
//                .profileUrl(streamerEntity.getProfileUrl())
//                .channelUrl(streamerEntity.getChannelUrl())
//                .platform(streamerEntity.getPlatform())
//                .rank(currDate.getRank())
//                .diff(diff).build();

        return null;
    }

    @Override
    public StreamerLiveDomain streamerDetailLive(Long streamerId) {

        LiveEntity liveEntity = liveRepository.findFirstByStreamer_StreamerIdOrderByLiveId(streamerId);

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


}
