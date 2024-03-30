package org.greenpine.cheeseballoon.streamer.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveEntity;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveRepository;
import org.greenpine.cheeseballoon.streamer.application.port.out.StreamerPort;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDto;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDtoInterface;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindStreamerDetailResDto;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

        LiveEntity liveEntity = liveRepository.findByStreamer_StreamerId(streamerId);

        System.out.println("라이브 엔티티 테스트" + liveEntity.getStreamer().getName() +" " + liveEntity.getStreamUrl());

        return null;
    }


}
