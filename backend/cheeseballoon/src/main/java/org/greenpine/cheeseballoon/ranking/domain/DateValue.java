package org.greenpine.cheeseballoon.ranking.domain;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

@Component
public class DateValue {

    public String[] getPeriod(int date){

        String[] result = new String[4];
        int[] days = {1,7,14,30};

        LocalDateTime now = LocalDateTime.now().minus(1, ChronoUnit.DAYS);
        LocalDateTime before = now.minus(days[date], ChronoUnit.DAYS);

        result[0] = now.minus(days[date], ChronoUnit.DAYS).format(DateTimeFormatter.ofPattern("yyyy-MM-dd 00:00:00"));
        result[1] = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd 23:59:59"));
        result[2] = before.minus(days[date], ChronoUnit.DAYS).format(DateTimeFormatter.ofPattern("yyyy-MM-dd 00:00:00"));
        result[3] = before.format(DateTimeFormatter.ofPattern("yyyy-MM-dd 23:59:59"));

        return result;
    }



}
