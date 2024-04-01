package org.greenpine.cheeseballoon.streamer.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveEntity;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveRepository;
import org.greenpine.cheeseballoon.streamer.application.port.out.StreamerPort;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDtoInterface;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindStreamerDetailResDto;
import org.greenpine.cheeseballoon.streamer.domain.StreamerDomain;
import org.greenpine.cheeseballoon.streamer.domain.StreamerLiveDomain;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class StreamerPersistenceAdapter implements StreamerPort { // 어뎁터는 포트를 구현하는, 포트와 도메인을 연결시키는 역할을 수행한다.

    private final StreamerRepository streamerRepository;
    private final StreamerLogRepository streamerLogRepository;
    private final LiveRepository liveRepository;

    @Override
    public List<FindSearchStreamerResDtoInterface> searchStreamersByName(String query) {

        List<FindSearchStreamerResDtoInterface> result = streamerRepository.searchStreamerByName(query);

        return result;
    }

    @Override
    public FindStreamerDetailResDto streamerDetail(Long streamerId) {

        StreamerEntity streamerEntity = streamerRepository.findByStreamerId(1369L);

        System.out.println(streamerEntity.getName());

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
