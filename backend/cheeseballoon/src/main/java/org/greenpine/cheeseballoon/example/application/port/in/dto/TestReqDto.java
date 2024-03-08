package org.greenpine.cheeseballoon.example.application.port.in.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TestReqDto {
    private Long id;
    private int value;

}
