package org.greenpine.cheeseballoon.streamer.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.streamer.application.port.out.StreamerPort;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDto;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
// 어뎁터는 Port의 메소드들을 구현해주는 역할
// 여기서 Repository를 사용하여 DB의 데이터를 가져온 후 가공하여 리턴해주는 역할
public class StreamerPersistenceAdapter implements StreamerPort {

    private final StreamerRepository streamerRepository;

    @Override
    public List<FindSearchStreamerResDto> searchStreamer(String query) {

        // 아래는 테스트
        List<StreamerEntity> streamerEntities = streamerRepository.findAllByNameContaining(query);
        StreamerEntity ss = streamerRepository.findByStreamerId(1L);

        return null;
    }



}
