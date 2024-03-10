package org.greenpine.cheeseballoon.live;

import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.greenpine.cheeseballoon.live.adapter.in.web.LiveController;
import org.greenpine.cheeseballoon.live.application.port.in.dto.FindLivesReqDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindLivesResDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest

public class LiveTests {
    @Autowired
    private LiveController liveController;

    @Test
    public void liveGetTest(){
        //System.out.println(liveController.getPartition("PUBG : 배틀그라운드"));
        List<String> categories = new ArrayList<>();
        categories.add("종겜");
        categories.add("배틀그라운드");
        FindLivesReqDto req = new FindLivesReqDto(categories,3,0);
        ResponseEntity<CustomBody> res = liveController.findLives(
            new FindLivesReqDto(categories,3,0)
            );
        List<FindLivesResDto> findLiveResDtos = (List<FindLivesResDto>)res.getBody().getData();
        System.out.println(findLiveResDtos);
    }

}
