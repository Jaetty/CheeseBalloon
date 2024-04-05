package org.greenpine.cheeseballoon.member.application.port.out;

import org.greenpine.cheeseballoon.member.adapter.out.persistence.MemberEntity;
import org.greenpine.cheeseballoon.member.application.port.in.dto.UserInfoDto;
import org.greenpine.cheeseballoon.member.application.port.out.dto.LoginResDto;

public interface MemberPort {
    MemberEntity findMember(UserInfoDto dto);
    MemberEntity findByNickname(String nickname);
    MemberEntity register(UserInfoDto dto);


}
