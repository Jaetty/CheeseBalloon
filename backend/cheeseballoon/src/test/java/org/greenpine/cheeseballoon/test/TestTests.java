package org.greenpine.cheeseballoon.test;

import org.greenpine.cheeseballoon.example.adapter.in.web.TestController;
import org.greenpine.cheeseballoon.example.application.port.in.dto.TestReqDto;
import org.greenpine.cheeseballoon.example.application.port.out.dto.TestResDto;
import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest

public class TestTests {
    @Autowired
    private TestController testController;

    @Test
    public void createTest(){
        ResponseEntity<CustomBody> res = testController.create(new TestReqDto(1L,100));
        System.out.println(res);
        TestResDto testResDto = (TestResDto)res.getBody().getData();
        assertEquals(testResDto.getValue(), 100);
    }

    @Test
    public void readTest(){
        ResponseEntity<CustomBody> res = testController.read(1L);
        System.out.println(res);
        TestResDto testResDto = (TestResDto)res.getBody().getData();
        assertEquals(testResDto.getValue(), 100);
    }

}
