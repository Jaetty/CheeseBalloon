package org.greenpine.cheeseballoon.member.application.port.in.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DeleteBookmarkByStreamerIdReqDto {
    private Long memberId;
    private Long streamerId;
}
