package org.greenpine.cheeseballoon.global.utils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class DateCalculator {

    public static String[] getDateCodes(int date){

        String[] result = new String[2];
        int[] days = {1,7,14,30};

        // 데이터는 어제 날짜까지 있으니 어제를 시작점으로 한다.
        LocalDate now = LocalDate.now().minusDays(1);
        // 비교를 위한 날짜 부분 만약 4.20이고 7일 기준으로 비교한다면 4.12가 나와야함
        LocalDate before = now.minusDays(days[date]);

        result[0] = now.toString()+"-"+date;
        result[1] = before.toString()+"-"+date;

        return result;
    }

    public static LocalDateTime[] getPeriod(int date){

        LocalDateTime[] result = new LocalDateTime[4];
        int[] days = {0,6,13,29};

        // 데이터는 어제 날짜까지 있으니 어제를 시작점으로 한다.
        LocalDate now = LocalDate.now().minusDays (1);
        // 비교를 위한 날짜 부분 만약 4.20이고 7일 기준으로 비교한다면 4.12가 나와야함
        LocalDate before = now.minusDays(days[date] + 1);

        // 만약 now가 4.20 이라면 7일 기간이면 result[0]과 result[1]은 : 2024.04.13 00:00:00, 2024.04.19 23:59:59
        result[0] = LocalDateTime.of(now.minusDays(days[date]), LocalTime.of(0,0,0));
        result[1] = LocalDateTime.of(now, LocalTime.of(23,59,59));

        // 만약 now가 4.20 이라면 7일 기간이면 result[2]과 result[3]은 : 2024.04.05 00:00:00, 2024.04.12 23:59:59
        result[2] = LocalDateTime.of(before.minusDays(days[date]), LocalTime.of(0,0,0));
        result[3] = LocalDateTime.of(before, LocalTime.of(23,59,59));

        return result;
    }

    // 딱 한 날짜만을 가져오는 메소드
    public static LocalDateTime[] getSpecificPeriod(int date){

        LocalDateTime[] result = new LocalDateTime[4];
        int[] days = {1,7,14,30};

        // 데이터는 어제 날짜까지 있으니 어제를 시작점으로 한다.
        LocalDate now = LocalDate.now().minusDays (1);
        // 여기서 위의 getPeriod와 다르게 now.minus() 마이너스는 딱 정해진 기간만큼만 수행해준다.
        LocalDate before = now.minusDays(days[date]);

        // 만약 now가 4.20 이라면 7일 기간이면 result[0]과 result[1]은 : 2024.04.19 00:00:00, 2024.04.19 23:59:59
        result[0] = LocalDateTime.of(now, LocalTime.of(0,0,0));
        result[1] = LocalDateTime.of(now, LocalTime.of(23,59,59));

        // 만약 now가 4.20 이라면 7일 기간이면 result[2]과 result[3]은 : 2024.04.12 00:00:00, 2024.04.12 23:59:59
        result[2] = LocalDateTime.of(before, LocalTime.of(0,0,0));
        result[3] = LocalDateTime.of(before, LocalTime.of(23,59,59));

        return result;
    }



}
