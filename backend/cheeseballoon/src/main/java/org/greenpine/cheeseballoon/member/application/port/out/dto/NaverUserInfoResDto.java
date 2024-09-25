package org.greenpine.cheeseballoon.member.application.port.out.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NaverUserInfoResDto {
    String email;
    String nickname;
    String profile_image;
    String age;
    String gender;
    String id;
    String name;
    String birthday;
}
