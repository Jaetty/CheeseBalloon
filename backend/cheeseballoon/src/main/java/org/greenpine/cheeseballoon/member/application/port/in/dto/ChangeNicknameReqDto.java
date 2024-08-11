package org.greenpine.cheeseballoon.member.application.port.in.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangeNicknameReqDto {
    String newNickname;
}
