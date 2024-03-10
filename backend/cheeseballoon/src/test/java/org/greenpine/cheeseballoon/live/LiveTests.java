package org.greenpine.cheeseballoon.live;

import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.greenpine.cheeseballoon.live.adapter.in.web.LiveController;
import org.greenpine.cheeseballoon.live.application.port.in.dto.FindLivesReqDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindCategoriesResDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindHotCategoriesResDto;
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
        ResponseEntity<CustomBody> res = liveController.findLives(
            new FindLivesReqDto(categories,3,0)
            );
        List<FindLivesResDto> findLiveResDtos = (List<FindLivesResDto>)res.getBody().getData();
        System.out.println(findLiveResDtos);
    }

    @Test
    public void categoryGetTest(){
        String query="배";
        ResponseEntity<CustomBody> res = liveController.findCategories(query);
        FindCategoriesResDto findCategoriesResDto = (FindCategoriesResDto)res.getBody().getData();
        System.out.println(findCategoriesResDto);
    }

    @Test
    public void hotCategoryGetTest(){
        int limit = 8;
        ResponseEntity<CustomBody> res = liveController.findHotCategories(limit);
        FindHotCategoriesResDto findCategoriesResDto = (FindHotCategoriesResDto)res.getBody().getData();
        System.out.println(findCategoriesResDto);
    }

}
