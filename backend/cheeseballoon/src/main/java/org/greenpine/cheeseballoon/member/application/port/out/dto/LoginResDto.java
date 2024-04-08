package org.greenpine.cheeseballoon.member.application.port.out.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginResDto {
    private String refreshToken;
    private String accessToken;
    private String nickname;
    private String profileImgUrl;
}
