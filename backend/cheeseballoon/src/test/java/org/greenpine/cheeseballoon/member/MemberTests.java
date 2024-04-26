package org.greenpine.cheeseballoon.member;

import io.jsonwebtoken.Claims;
import org.aspectj.lang.annotation.Before;
import org.greenpine.cheeseballoon.global.token.JwtUtil;
import org.greenpine.cheeseballoon.member.application.port.in.dto.FindBookmarkReqDto;
import org.greenpine.cheeseballoon.member.application.port.out.BookmarkPort;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class MemberTests {
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BookmarkPort bookmarkPort;

    @Test
    void checkToken() {

        Long id=10L;
        String accessToken = jwtUtil.createAccessToken(10L);
        String refreshToken = jwtUtil.createRefreshToken(10L);
        System.out.println("accessToken : "+accessToken);
        Long accessMemberId = jwtUtil.getUserId(jwtUtil.extractAllClaims(accessToken));
        Long refreshMemberId = jwtUtil.getUserId(jwtUtil.extractAllClaims(refreshToken));
        System.out.println("memberId : "+accessMemberId +" "+ refreshMemberId);
        assertEquals(accessMemberId, refreshMemberId);
    }


}
