package org.greenpine.cheeseballoon.member.application.port.in;

import org.greenpine.cheeseballoon.member.application.port.in.dto.UserInfoDto;
import org.greenpine.cheeseballoon.member.application.port.out.dto.LoginResDto;

public interface AuthUsecase {
    LoginResDto login(UserInfoDto dto);
}
