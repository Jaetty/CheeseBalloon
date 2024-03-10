package org.greenpine.cheeseballoon.live.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.live.application.port.in.dto.FindLiveReqDto;
import org.greenpine.cheeseballoon.live.application.port.out.LivePort;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindLiveResDto;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class LivePersistenceAdapter implements LivePort {

    //private final LiveRepository liveRepository;
    @Override
    public List<FindLiveResDto> findLives(FindLiveReqDto findLiveReqDto) {
        return null;
    }

    @Override
    public List<FindLiveResDto> findLivesAll(FindLiveReqDto findLiveReqDto) {
        return null;
    }
}
