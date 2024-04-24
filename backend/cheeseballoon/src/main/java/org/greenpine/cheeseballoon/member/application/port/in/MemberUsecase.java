package org.greenpine.cheeseballoon.member.application.port.in;

import org.greenpine.cheeseballoon.member.application.port.in.dto.ChangeNicknameReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.UserInfoDto;
import org.greenpine.cheeseballoon.member.application.port.out.dto.LoginResDto;
import org.springframework.dao.DuplicateKeyException;

public interface MemberUsecase {
    void changeNickname(Long memberId, ChangeNicknameReqDto dto);
}
