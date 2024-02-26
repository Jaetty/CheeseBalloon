package org.greenpine.cheeseballoon.example.application.port.out.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TestResDto {
    private Long id;
    private int value;
    private int num;

}
