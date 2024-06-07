package org.greenpine.cheeseballoon.notice.application.port.in.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeleteNoticeImgReqDto {
    String imgUrl;
}
