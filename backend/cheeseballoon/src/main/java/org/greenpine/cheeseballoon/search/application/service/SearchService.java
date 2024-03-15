package org.greenpine.cheeseballoon.search.application.service;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.search.application.port.in.SearchUsecase;
import org.greenpine.cheeseballoon.search.application.port.out.SearchPort;
import org.greenpine.cheeseballoon.search.application.port.out.dto.FindSearchLiveResDto;
import org.greenpine.cheeseballoon.search.application.port.out.dto.FindSearchStreamerResDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
// 서비스는 유스케이스의 구현을 담당하고 Port를 사용함
public class SearchService implements SearchUsecase {

    private final SearchPort searchPort;

    @Override
    public List<FindSearchStreamerResDto> searchStreamer(String query) {

//        List<FindSearchLiveResDto> result = searchPort.findStreamers(query); // 추후 repository가 완료되면 여기서 DB에서 가져온 값이 도착함
        List<FindSearchStreamerResDto> result = new ArrayList<>();

        // 아래는 테스트용으로만 사용하는 코드
        if(query.chars().allMatch(Character::isDigit)){

            for(int i=0; i<Integer.parseInt(query); i++){
                if(i==15) break;
                result.add(FindSearchStreamerResDto.builder()
                        .streamId((long)i)
                        .name("스트리머 넘버 :"+ i)
                        .isLive( i%2 == 0 ? true : false )
                        .profileUrl("https://nng-phinf.pstatic.net/MjAyMzEyMTlfMzYg/MDAxNzAyOTcwODY1OTUy.1hHkqzH-zyEhyW2EJNfj1q6r7XTDeQNNqL_owQQ6AFwg.mCjDaHbdF0jjfhB2PvFuFJLxL9jQ-PV0oSLLDRXoGLUg.GIF/popHEAD.gif?type=f120_120_na")
                        .streamUrl("https://chzzk.naver.com/ca1850b2eceb7f86146695fd9bb9cefc")
                        .followerCnt(58000)
                        .platform('C')
                        .build());
            }
        }

        return result;
    }

    @Override
    public List<FindSearchLiveResDto> searchLive(String query) {

//        List<FindSearchLiveResDto> result = searchPort.findLives(query);
        List<FindSearchLiveResDto> result = new ArrayList<>();

        if(query.chars().allMatch(Character::isDigit)){

            for(int i=0; i<Integer.parseInt(query); i++){
                if(i==20) break;
                result.add(FindSearchLiveResDto.builder()
                        .streamId((long)i)
                        .liveId((long)i)
                        .name("스트리머 넘버 :"+ i)
                        .thumbnail("https://livecloud-thumb.akamaized.net/chzzk/livecloud/KR/stream/26453996/live/4794303/record/25925839/thumbnail/image_480.jpg?date=1710346950000")
                        .platform('C')
                        .profileUrl("https://nng-phinf.pstatic.net/MjAyMzEyMTlfMzYg/MDAxNzAyOTcwODY1OTUy.1hHkqzH-zyEhyW2EJNfj1q6r7XTDeQNNqL_owQQ6AFwg.mCjDaHbdF0jjfhB2PvFuFJLxL9jQ-PV0oSLLDRXoGLUg.GIF/popHEAD.gif?type=f120_120_na")
                        .category("스타크래프트")
                        .viewerCnt(15117)
                        .build());
            }
        }


        return result;
    }

}
