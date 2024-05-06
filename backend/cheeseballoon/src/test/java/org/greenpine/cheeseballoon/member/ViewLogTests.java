package org.greenpine.cheeseballoon.member;

import org.greenpine.cheeseballoon.member.application.port.in.dto.FindViewLogReqDto;
import org.greenpine.cheeseballoon.member.application.service.ViewLogService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@SpringBootTest
public class ViewLogTests {
    @Autowired
    private ViewLogService viewLogService;

    @Test
    void findViewLog(){
        FindViewLogReqDto reqDto = FindViewLogReqDto.builder()
                .memberId(1L)
                .start(LocalDate.now().minusWeeks(1))
                .end(LocalDate.now())
                .build();
        viewLogService.findViewLog(reqDto);
    }
    @Test
    void addTest(){

    }


}
