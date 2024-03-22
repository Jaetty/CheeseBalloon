package org.greenpine.cheeseballoon.streamer.application.service;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDto;
import org.greenpine.cheeseballoon.streamer.application.port.in.StreamerUsecase;
import org.greenpine.cheeseballoon.streamer.application.port.out.StreamerPort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
// 서비스는 유스케이스의 구현을 담당하고 Port를 사용함
public class StreamerService implements StreamerUsecase {

    private final StreamerPort streamerPort;

    @Override
    public List<FindSearchStreamerResDto> searchStreamer(String query) {

//        List<FindSearchStreamerResDto> result = streamerPort.searchStreamer(""); // 추후 repository가 완료되면 여기서 DB에서 가져온 값이 도착함
        List<FindSearchStreamerResDto> result = new ArrayList<>();

        // 아래는 테스트용으로만 사용하는 코드
        if(query.chars().allMatch(Character::isDigit)){

            for(int i=0; i<Integer.parseInt(query); i++){
                if(i==15) break;
                result.add(FindSearchStreamerResDto.builder()
                        .streamId((long)i)
                        .name("스트리머 넘버 :"+ i)
                        .isLive( i%4 == 0 ? false : true )
                        .profileUrl("https://nng-phinf.pstatic.net/MjAyMzEyMTlfMzYg/MDAxNzAyOTcwODY1OTUy.1hHkqzH-zyEhyW2EJNfj1q6r7XTDeQNNqL_owQQ6AFwg.mCjDaHbdF0jjfhB2PvFuFJLxL9jQ-PV0oSLLDRXoGLUg.GIF/popHEAD.gif?type=f120_120_na")
                        .channelUrl("https://chzzk.naver.com/ca1850b2eceb7f86146695fd9bb9cefc")
                        .follower(58000)
                        .platform(i%3 == 0 ? 'C' : 'A')
                        .build());
            }
        }

        return result;
    }
}
