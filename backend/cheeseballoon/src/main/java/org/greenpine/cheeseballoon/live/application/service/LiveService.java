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
    public List<FindLiveResDto> findLives(FindLiveReqDto findLiveReqDto) {
        if(findLiveReqDto.getCategories() ==null){
            livePort.findLivesAll(findLiveReqDto);
        }else{
            livePort.findLives(findLiveReqDto);
        }
        List<FindLiveResDto> temp = new ArrayList<>();
        temp.add(FindLiveResDto.builder()
                .streamId(1L)
                .liveId(1L)
                .title("제목입니다리미는뜨끈뜨끈1")
                .name("이름1")
                .thumbnail("https://livecloud-thumb.akamaized.net/chzzk/livecloud/KR/stream/26464698/live/4741825/record/25849301/thumbnail/image_480.jpg?date=1710086310000")
                .channelUrl("channelUrl")
                .streamUrl("streamurl")
                .platform('A')
                .profileUrl("https://nng-phinf.pstatic.net/MjAyMzEyMTVfMTgx/MDAxNzAyNjAxMjEyMTYw.Hw6vs76aI0L1zeu4fziwXDE35gidFriwTSgAjq7KWxUg.0V3KaKvctGKcVYa76UiDVTXMjXeUSuUezHX6nGU4y9kg.PNG/123.png?type=f120_120_na")
                .viewerCnt(100)
                .category("talk")
                .build());

        temp.add(FindLiveResDto.builder()
                .streamId(2L)
                .liveId(2L)
                .title("제목입니다리미는뜨끈뜨끈2")
                .name("이름1")
                .thumbnail("https://livecloud-thumb.akamaized.net/chzzk/livecloud/KR/stream/26464698/live/4741825/record/25849301/thumbnail/image_480.jpg?date=1710086310000")
                .channelUrl("channelUrl")
                .streamUrl("streamurl")
                .platform('A')
                .profileUrl("https://nng-phinf.pstatic.net/MjAyMzEyMTVfMTgx/MDAxNzAyNjAxMjEyMTYw.Hw6vs76aI0L1zeu4fziwXDE35gidFriwTSgAjq7KWxUg.0V3KaKvctGKcVYa76UiDVTXMjXeUSuUezHX6nGU4y9kg.PNG/123.png?type=f120_120_na")
                .viewerCnt(100)
                .category("talk")
                .build());

        temp.add(FindLiveResDto.builder()
                .streamId(3L)
                .liveId(3L)
                .title("제목입니다리미는뜨끈뜨끈3")
                .name("이름")
                .thumbnail("https://livecloud-thumb.akamaized.net/chzzk/livecloud/KR/stream/26464698/live/4741825/record/25849301/thumbnail/image_480.jpg?date=1710086310000")
                .channelUrl("channelUrl")
                .streamUrl("streamurl")
                .platform('C')
                .profileUrl("https://nng-phinf.pstatic.net/MjAyMzEyMTVfMTgx/MDAxNzAyNjAxMjEyMTYw.Hw6vs76aI0L1zeu4fziwXDE35gidFriwTSgAjq7KWxUg.0V3KaKvctGKcVYa76UiDVTXMjXeUSuUezHX6nGU4y9kg.PNG/123.png?type=f120_120_na")
                .viewerCnt(100)
                .category("talk")
                .build());

        return temp;
    }
}
