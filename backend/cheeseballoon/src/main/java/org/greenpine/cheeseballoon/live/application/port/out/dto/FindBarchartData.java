package org.greenpine.cheeseballoon.live.application.port.out.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FindBarchartData {

    Long streamerId;
    Integer averageViewer;
    String date;
    String profileUrl;
    Character platform;

}