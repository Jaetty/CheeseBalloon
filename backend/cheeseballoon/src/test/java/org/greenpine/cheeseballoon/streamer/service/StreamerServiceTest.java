package org.greenpine.cheeseballoon.streamer.service;

import org.greenpine.cheeseballoon.global.utils.DateCalculator;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindStreamerSummaryResDto;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindStreamerTimeDto;
import org.greenpine.cheeseballoon.streamer.application.service.StreamerService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@SpringBootTest
public class StreamerServiceTest {

    @Autowired
    private StreamerService streamerService;

    @Test
    void streamerTimeTest(){
        long streamer_id = 3;
        String[] dtCodes = DateCalculator.getDateCodes(0);
        LocalDateTime[] specificDates = DateCalculator.getSpecificPeriod(0);
        LocalDateTime[] dates = DateCalculator.getPeriod(0);

        FindStreamerTimeDto ret = streamerService.streamerDetailTime(streamer_id, dtCodes, dates, specificDates);

        System.out.println(ret.getTotalTime());
        System.out.println(ret.getTimeDiff());
        System.out.println(ret.getDailyTimes());

    }

    @Test
    void streamerSummaryTest(){
        long streamer_id = 3;
        String[] dtCodes = DateCalculator.getDateCodes(0);
        LocalDateTime[] specificDates = DateCalculator.getSpecificPeriod(0);
        FindStreamerSummaryResDto ret = streamerService.streamerDetailSummary(streamer_id,dtCodes, specificDates);

        System.out.println(ret.getAvgViewer() + " " + ret.getFollow() +" " + ret.getTimeDiff());

    }

}
