package org.greenpine.cheeseballoon.member.application.service;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.global.token.JwtUtil;
import org.greenpine.cheeseballoon.member.adapter.out.persistence.MemberEntity;
import org.greenpine.cheeseballoon.member.application.port.in.AuthUsecase;
import org.greenpine.cheeseballoon.member.application.port.in.MemberUsecase;
import org.greenpine.cheeseballoon.member.application.port.in.BookmarkUsecase;
import org.greenpine.cheeseballoon.member.application.port.in.ViewLogUsecase;
import org.greenpine.cheeseballoon.member.application.port.in.dto.ChangeNicknameReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.UserInfoDto;
import org.greenpine.cheeseballoon.member.application.port.out.MemberPort;
import org.greenpine.cheeseballoon.member.application.port.out.dto.LoginResDto;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class MemberService implements MemberUsecase, AuthUsecase {
    private final MemberPort memberPort;
    private final JwtUtil jwtUtil;
    @Override
    public LoginResDto login(UserInfoDto dto) {
        MemberEntity member = memberPort.findMember(dto);
        if(member==null){ //비회원
            String nickname = dto.getName();
            while(true){
                if(memberPort.findByNickname(nickname)==null)
                    break;
                nickname= dto.getName()+generateRandomString(6);
            }
            dto.setName(nickname);
            member = memberPort.register(dto); //회원가입

        }
        String accessToken = jwtUtil.createAccessToken(member.getMemberId());
        String refreshToken = jwtUtil.createRefreshToken(member.getMemberId());
        return LoginResDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .nickname(member.getNickname())
                .profileImgUrl(member.getProfileImgUrl())
                .build();
    }

    @Override
    @Transactional
    public void changeNickname(Long memberId, ChangeNicknameReqDto dto) throws DataIntegrityViolationException {
        MemberEntity member = memberPort.findByNickname(dto.getNewNickname());
        if(member!=null) {
            throw new DataIntegrityViolationException("");
        }
        memberPort.changeNickname(memberId, dto);
    }

    public String generateRandomString(int length) {
        String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(alphabet.length());
            sb.append(alphabet.charAt(index));
        }
        return sb.toString();
    }


}
