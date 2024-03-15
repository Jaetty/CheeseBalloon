package org.greenpine.cheeseballoon.search.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.search.application.port.in.SearchUsecase;
import org.greenpine.cheeseballoon.search.application.port.out.SearchPort;
import org.greenpine.cheeseballoon.search.application.port.out.dto.FindSearchLiveResDto;
import org.greenpine.cheeseballoon.search.application.port.out.dto.FindSearchStreamerResDto;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
// 어뎁터는 Port의 메소드들을 구현해주는 역할
// 여기서 Repository를 사용하여 DB의 데이터를 가져온 후 가공하여 리턴해주는 역할
public class SearchPersistenceAdapter implements SearchPort {

    //    private final SearchRepository searchRepository;
    @Override
    public List<FindSearchLiveResDto> findStreamers(String query) {
        return null;
    }

    @Override
    public List<FindSearchLiveResDto> findLives(String query) {
        return null;
    }


}
