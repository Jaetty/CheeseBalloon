package org.greenpine.cheeseballoon.member.application.port.in.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInfoDto {
    String name;
    String profileImgUrl;
    String email;
    String originId;
    Character platform;
}


