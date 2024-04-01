package org.greenpine.cheeseballoon.ranking.adapter.in.web;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.greenpine.cheeseballoon.global.response.StatusEnum;
import org.greenpine.cheeseballoon.ranking.application.port.in.RankingUsecase;
import org.greenpine.cheeseballoon.ranking.application.port.in.dto.FindFollowRankingReqDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindFollowRankingResDto;
import org.greenpine.cheeseballoon.ranking.application.port.out.message.RankingResMsg;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Slf4j
@RestController
@RequestMapping("/ranking")
@RequiredArgsConstructor
public class RankingController {
    private final RankingUsecase rankingUsecase;
    @GetMapping("/follow")
    public ResponseEntity<CustomBody> test(@RequestParam int limit, int offset, int startDate, char platform){

        List<FindFollowRankingResDto> result = new ArrayList<>();
        Random random = new Random();

        // 테스트용 데이터 제공
        for(int i=0; i< limit; i++){

            if(limit > 300) break;

            FindFollowRankingResDto temp = FindFollowRankingResDto.builder()
                    .streamerId((long) i)
                    .name( i%3==0 ? "최대한 긴 글자의 방송인" : "방송인")
                    .rank(i+1)
                    .platform('A')
                    .profileUrl("https://nng-phinf.pstatic.net/MjAyMzEyMTlfMzYg/MDAxNzAyOTcwODY1OTUy.1hHkqzH-zyEhyW2EJNfj1q6r7XTDeQNNqL_owQQ6AFwg.mCjDaHbdF0jjfhB2PvFuFJLxL9jQ-PV0oSLLDRXoGLUg.GIF/popHEAD.gif?type=f120_120_na")
                    .followCnt(45000-i)
                    .diff(0)
                    .bookmark(i%2==0)
                    .build();

            if(i>0){
                // 등락 랜덤 처음은 무조건 0
                if(i%3==0) temp.setDiff(random.nextInt(100) * -1);
                else temp.setDiff(random.nextInt(100));
            }

            if(platform=='T'){
                if(i%2==0) temp.setPlatform('C');
            }
            else{
                temp.setPlatform(platform);
            }

            result.add(temp);

        }

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, RankingResMsg.SUCCESS, result));
    }

}


