package org.greenpine.cheeseballoon.member.service;

import org.greenpine.cheeseballoon.global.token.JwtUtil;
import org.greenpine.cheeseballoon.member.adapter.out.persistence.MemberEntity;
import org.greenpine.cheeseballoon.member.adapter.out.persistence.RoleEntity;
import org.greenpine.cheeseballoon.member.application.port.in.dto.UserInfoDto;
import org.greenpine.cheeseballoon.member.application.port.out.MemberPort;
import org.greenpine.cheeseballoon.member.application.port.out.dto.LoginResDto;
import org.greenpine.cheeseballoon.member.application.service.MemberService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

@SpringBootTest
public class MemberServiceTests {

    @Autowired
    MemberService memberService;
    @Mock
    MemberPort memberPort;

    @BeforeEach
    public void setUp() {
        JwtUtil jwtUtil = mock(JwtUtil.class);
        // JwtUtil 주입
        memberService = new MemberService(memberPort, jwtUtil);
    }

    @Test
    @DisplayName("로그인 테스트")
    void loginTest(){
        //given
        String name = "김아무개";
        String profileUrl = "url";
        UserInfoDto userInfoDto = UserInfoDto.builder()
                .name(name)
                .email("abc@abc.com")
                .originId("123123")
                .profileImgUrl(profileUrl)
                .platform('C')
                .build();
        MemberEntity member = MemberEntity.builder()
                .profileImgUrl(profileUrl)
                .platform('C')
                .originId("123123")
                .nickname(name)
                .role(RoleEntity.builder().roleId(1L).role("MANAGER").build())
                .build();
        given(memberPort.findMember(any())).willReturn(null);
        given(memberPort.findByNickname(name)).willReturn(null);
        given(memberPort.register(userInfoDto)).willReturn(member);

        //when
        LoginResDto loginResDto = memberService.login(userInfoDto);

        //then
        assertThat(loginResDto.getNickname()).isEqualTo(name);
        assertThat(loginResDto.getProfileImgUrl()).isEqualTo(profileUrl);
    }

}
