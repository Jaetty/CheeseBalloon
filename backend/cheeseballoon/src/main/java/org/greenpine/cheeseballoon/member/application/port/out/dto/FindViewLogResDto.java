package org.greenpine.cheeseballoon.member.application.port.out.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FindViewLogResDto {
    private Long viewLogId;
    private Long streamerId;
    private String name;
    private String profileUrl;
    private String category;
    private String title;
    private LocalDateTime regDt;
}
