package org.greenpine.cheeseballoon.live.application.service;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.live.application.port.in.CategoryUsecase;
import org.greenpine.cheeseballoon.live.application.port.in.LiveUsecase;
import org.greenpine.cheeseballoon.live.application.port.in.dto.FindLivesReqDto;
import org.greenpine.cheeseballoon.live.application.port.out.CategoryPort;
import org.greenpine.cheeseballoon.live.application.port.out.LivePort;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindCategoriesResDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindHotCategoriesResDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindLivesResDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LiveService implements LiveUsecase, CategoryUsecase {

    private final LivePort livePort;
    private final CategoryPort categoryPort;

    @Override
    public List<FindLivesResDto> findLives(FindLivesReqDto findLiveReqDto) {
        if(findLiveReqDto.getCategories() ==null){
            livePort.findLivesAll(findLiveReqDto);
        }else{
            livePort.findLives(findLiveReqDto);
        }
        List<FindLivesResDto> temp = new ArrayList<>();
        Long id=1L;
        for(int i=0; i<findLiveReqDto.getLimit(); i++) {
            temp.add(FindLivesResDto.builder()
                    .streamId(id)
                    .liveId(id++)
                    .title("제목입니다리미는뜨끈뜨끈"+id)
                    .name("이름"+id)
                    .thumbnailUrl("https://livecloud-thumb.akamaized.net/chzzk/livecloud/KR/stream/26464698/live/4741825/record/25849301/thumbnail/image_480.jpg?date=1710086310000")
                    .channelUrl("channelUrl")
                    .streamUrl("streamurl")
                    .platform('A')
                    .profileUrl("https://nng-phinf.pstatic.net/MjAyMzEyMTVfMTgx/MDAxNzAyNjAxMjEyMTYw.Hw6vs76aI0L1zeu4fziwXDE35gidFriwTSgAjq7KWxUg.0V3KaKvctGKcVYa76UiDVTXMjXeUSuUezHX6nGU4y9kg.PNG/123.png?type=f120_120_na")
                    .viewerCnt(100)
                    .category("talk")
                    .build());
            id++;
        }

        return temp;
    }

    @Override
    public List<FindLivesResDto> searchLives(String query) {

        //        List<FindLivesResDto> result = searchPort.findLives(query);
        List<FindLivesResDto> result = new ArrayList<>();

        if(query.chars().allMatch(Character::isDigit)){

            for(int i=0; i<Integer.parseInt(query); i++){
                if(i==20) break;
                result.add(FindLivesResDto.builder()
                        .streamId((long)i)
                        .liveId((long)i)
                        .name("스트리머 넘버 :"+ i)
                        .title("방송 이름 부분 " + i)
                        .thumbnailUrl("https://livecloud-thumb.akamaized.net/chzzk/livecloud/KR/stream/26453996/live/4794303/record/25925839/thumbnail/image_480.jpg?date=1710346950000")
                        .platform('C')
                        .profileUrl("https://nng-phinf.pstatic.net/MjAyMzEyMTlfMzYg/MDAxNzAyOTcwODY1OTUy.1hHkqzH-zyEhyW2EJNfj1q6r7XTDeQNNqL_owQQ6AFwg.mCjDaHbdF0jjfhB2PvFuFJLxL9jQ-PV0oSLLDRXoGLUg.GIF/popHEAD.gif?type=f120_120_na")
                        .category("스타크래프트")
                        .viewerCnt(15117)
                        .streamUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=43s")
                        .channelUrl("https://chzzk.naver.com/bb382c2c0cc9fa7c86ab3b037fb5799c")
                        .build());
            }
        }

        return result;
    }

    @Override
    public FindCategoriesResDto findCategories(String query) {
        return categoryPort.findCategories(query);
    }

    @Override
    public FindHotCategoriesResDto findHotCategories(int limit) {
        categoryPort.findHotCategories(limit);
        List<String>categories = new ArrayList<>();
        categories.add("배그");
        categories.add("리그 오브 레전드");
        categories.add("보라");
        categories.add("버츄얼");
        categories.add("철권");
        categories.add("스타크래프트");
        categories.add("하스스톤");
        categories.add("스포츠");

        return FindHotCategoriesResDto.builder()
                .categories(categories)
                .build();
    }
}
