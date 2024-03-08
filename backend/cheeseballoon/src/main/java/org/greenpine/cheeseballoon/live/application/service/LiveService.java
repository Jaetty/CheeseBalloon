package org.greenpine.cheeseballoon.live.application.service;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.live.application.port.in.LiveUsecase;
import org.greenpine.cheeseballoon.live.application.port.in.dto.FindLiveReqDto;
import org.greenpine.cheeseballoon.live.application.port.out.LivePort;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindLiveResDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LiveService implements LiveUsecase {
    private final LivePort livePort;
    @Override
    public List<FindLiveResDto> readLive(FindLiveReqDto findLiveReqDto) {
        if(findLiveReqDto.getCategories() ==null){
            livePort.readLiveAll(findLiveReqDto);
        }else{
            livePort.readLive(findLiveReqDto);
        }
        List<FindLiveResDto> temp = new ArrayList<>();
        temp.add(FindLiveResDto.builder()
                .streamId(1L)
                .liveId(1L)
                .title("제목입니다리미는뜨끈뜨끈1")
                .name("이름1")
                .thumbnail("thumbnail")
                .channelUrl("channelUrl")
                .streamerUrl("streamerurl")
                .platform('a')
                .profileUrl("profileUrl")
                .viewerCnt(100)
                .category("category")
                .build());

        temp.add(FindLiveResDto.builder()
                .streamId(2L)
                .liveId(2L)
                .title("제목입니다리미는뜨끈뜨끈2")
                .name("이름1")
                .thumbnail("thumbnail")
                .channelUrl("channelUrl")
                .streamerUrl("streamerurl")
                .platform('a')
                .profileUrl("profileUrl")
                .viewerCnt(100)
                .category("category")
                .build());

        temp.add(FindLiveResDto.builder()
                .streamId(3L)
                .liveId(3L)
                .title("제목입니다리미는뜨끈뜨끈3")
                .name("이름")
                .thumbnail("thumbnail")
                .channelUrl("channelUrl")
                .streamerUrl("streamerurl")
                .platform('c')
                .profileUrl("profileUrl")
                .viewerCnt(100)
                .category("category")
                .build());

        return temp;
    }
}
