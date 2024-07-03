package org.greenpine.cheeseballoon.notice.application.port.in.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FindNoticeReqDto {
    Long noticeId;
}
