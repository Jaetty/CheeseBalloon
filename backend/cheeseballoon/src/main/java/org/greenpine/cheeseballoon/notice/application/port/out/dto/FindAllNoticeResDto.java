package org.greenpine.cheeseballoon.notice.application.port.out.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FindAllNoticeResDto {
    Long noticeId;
    String title;
    String content;
    String nickname;
    String thumbnail;
    LocalDateTime regDt;
}
