package org.greenpine.cheeseballoon.live.application.port.in.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;



@Data
@AllArgsConstructor
@NoArgsConstructor
public class FindLiveReqDto {
    List<String> categories;
    int limit;
    int offset;
}
