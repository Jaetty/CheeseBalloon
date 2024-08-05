package org.greenpine.cheeseballoon.member.application.port.out.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GoogleUserInfoResDto {
    String sub;
    String name;
    String picture;
    String email;
}
