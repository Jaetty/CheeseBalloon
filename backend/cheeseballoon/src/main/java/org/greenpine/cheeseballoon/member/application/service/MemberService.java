package org.greenpine.cheeseballoon.member.application.service;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.member.adapter.out.persistence.MemberEntity;
import org.greenpine.cheeseballoon.member.application.port.in.MemberUsecase;
import org.greenpine.cheeseballoon.member.application.port.in.BookmarkUsecase;
import org.greenpine.cheeseballoon.member.application.port.in.ViewLogUsecase;
import org.greenpine.cheeseballoon.member.application.port.in.dto.UserInfoDto;
import org.greenpine.cheeseballoon.member.application.port.out.MemberPort;
import org.greenpine.cheeseballoon.member.application.port.out.dto.LoginResDto;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class MemberService implements MemberUsecase, BookmarkUsecase, ViewLogUsecase {
    private final MemberPort memberPort;
    @Override
    public LoginResDto login(UserInfoDto dto) {
        MemberEntity member = memberPort.findMember(dto);
        if(member==null){ //비회원
            System.out.println("회원아님");
            String nickname = dto.getName();
            while(true){
                if(memberPort.findByNickname(nickname)==null)
                    break;
                nickname= dto.getName()+generateRandomString(6);
            }
            dto.setName(nickname);
            member = memberPort.register(dto);
        }
        return null;
    }
    public String generateRandomString(int length) {
        // 영어 대문자와 소문자를 포함한 알파벳 문자열 생성
        String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        StringBuilder sb = new StringBuilder();

        // 랜덤 객체 생성
        Random random = new Random();

        // 주어진 길이만큼 랜덤 문자열 생성
        for (int i = 0; i < length; i++) {
            // 랜덤한 인덱스 선택
            int index = random.nextInt(alphabet.length());
            // 선택된 인덱스의 문자를 문자열에 추가
            sb.append(alphabet.charAt(index));
        }

        // 완성된 랜덤 문자열 반환
        return sb.toString();
    }


}
