package org.greenpine.cheeseballoon.member.application.port.in.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FindViewLogReqDto {
    private Long memberId;
    private LocalDate start;
    private LocalDate end;
}
