package org.greenpine.cheeseballoon.streamer.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveEntity;
import org.greenpine.cheeseballoon.streamer.application.port.out.StreamerPort;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDtoInterface;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class StreamerPersistenceAdapter implements StreamerPort { // 어뎁터는 포트를 구현하는, 포트와 도메인을 연결시키는 역할을 수행한다.

    private final StreamerRepository streamerRepository;
    private final StreamerLogRepository streamerLogRepository;

    @Override
    public List<FindSearchStreamerResDtoInterface> searchStreamersByName(String query) {

        // 아래는 테스트
        List<FindSearchStreamerResDtoInterface> result = streamerRepository.searchStreamerByName(query);

//        List<StreamerLogEntity> searchStreamers = streamerLogRepository.findStreamerLogEntitiesByNameSearch(query);
//
//        for(int i=0; i< searchStreamers.size(); i++){
//            System.out.println(searchStreamers.get(i).getStreamer().getName());
//        }



        return result;
    }



}
