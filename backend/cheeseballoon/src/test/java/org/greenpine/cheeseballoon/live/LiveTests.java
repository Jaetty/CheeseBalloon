package org.greenpine.cheeseballoon.live;

import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.greenpine.cheeseballoon.live.adapter.in.web.LiveController;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.CategoryEntity;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.CategoryRepository;
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
    @Autowired
    private CategoryRepository categoryRepository;

//    @Test
//    public void liveGetTest(){
//        //System.out.println(liveController.getPartition("PUBG : 배틀그라운드"));
//        List<String> categories = new ArrayList<>();
//        categories.add("종겜");
//        categories.add("배틀그라운드");
//        ResponseEntity<CustomBody> res = liveController.findLives(
//            new FindLivesReqDto(categories,3,0)
//            );
//        List<FindLivesResDto> findLiveResDtos = (List<FindLivesResDto>)res.getBody().getData();
//        System.out.println(findLiveResDtos);
//    }

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

    @Test
    public void CategoryTaskTest(){
        String[] chosungs = {"ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ" , "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"};
        List<CategoryEntity> entities = categoryRepository.findAllByChosungIsNull();
        for(CategoryEntity entity : entities){
            System.out.println(entity.getCategory());
            String word = entity.getCategory();
            String categoryChosung ="";
            for(int i=0; i<word.length(); i++) {
                char cha = word.charAt(i);
                if (cha < 0xAC00) {
                    categoryChosung += cha;
                    continue;
                }
                int uniBase = cha - 44032;

                char chosung = (char) (uniBase / 28 / 21);
                //char jungsung = (char) (uniBase / 28 % 21);
                //char jongsung = (char) (uniBase % 28);

                categoryChosung += chosungs[chosung];
            }
            System.out.println(categoryChosung);
        }
    }

}
