package org.greenpine.cheeseballoon.notice.application.port.in.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterNoticeImgReqDto {
    MultipartFile file;
}
