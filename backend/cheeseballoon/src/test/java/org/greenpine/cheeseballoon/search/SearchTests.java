package org.greenpine.cheeseballoon.search;

import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.greenpine.cheeseballoon.live.application.port.in.dto.FindLivesReqDto;
import org.greenpine.cheeseballoon.search.adapter.in.web.SearchController;
import org.greenpine.cheeseballoon.search.application.port.out.dto.FindSearchStreamerResDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import java.util.List;

@SpringBootTest
public class SearchTests {

    @Autowired
    private SearchController searchController;

    @Test
    public void searchStreamGetTest(){
        ResponseEntity<CustomBody> res = searchController.searchStreamer("1");
        List<FindSearchStreamerResDto> findSearchStreamerResDto = (List<FindSearchStreamerResDto>)res.getBody().getData();
        System.out.println("@@@@@@ searchStreamer 테스트 결과 @@@@@");
        System.out.println(findSearchStreamerResDto);
    }

    @Test
    public void searchLiveGetTest(){
        ResponseEntity<CustomBody> res = searchController.searchLive("1");
        List<FindLivesReqDto> findLivesReqDto = (List<FindLivesReqDto>) res.getBody().getData();
        System.out.println("@@@@@@ searchLive 테스트 결과 @@@@@");
        System.out.println(findLivesReqDto);
    }

}
