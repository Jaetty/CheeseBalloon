package org.greenpine.cheeseballoon.streamer.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.streamer.application.port.out.StreamerPort;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDto;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class StreamerPersistenceAdapter implements StreamerPort { // 어뎁터는 포트를 구현하는, 포트와 도메인을 연결시키는 역할을 수행한다.

    private final StreamerRepository streamerRepository;

    @Override
    public List<FindSearchStreamerResDto> searchStreamer(String query) {

        // 아래는 테스트
        List<StreamerEntity> streamerEntities = streamerRepository.findAllByNameContaining(query);
        StreamerEntity ss = streamerRepository.findByStreamerId(1L);

        return null;
    }



}
