package org.greenpine.cheeseballoon.member.application.port.out;

import org.greenpine.cheeseballoon.member.adapter.out.persistence.MemberEntity;
import org.greenpine.cheeseballoon.member.application.port.in.dto.ChangeNicknameReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.UserInfoDto;

public interface MemberPort {
    MemberEntity findMember(UserInfoDto dto);
    MemberEntity findByNickname(String nickname);
    MemberEntity register(UserInfoDto dto);

    void changeNickname(Long memberId, ChangeNicknameReqDto dto);


}
