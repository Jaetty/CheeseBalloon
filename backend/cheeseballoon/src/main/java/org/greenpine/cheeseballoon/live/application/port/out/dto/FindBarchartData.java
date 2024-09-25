package org.greenpine.cheeseballoon.live.application.port.out.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FindBarchartData {

    String Date;
    List<FindBarchartDataResDtoInterface> dataList;

}