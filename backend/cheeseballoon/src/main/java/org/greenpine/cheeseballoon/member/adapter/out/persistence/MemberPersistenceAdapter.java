package org.greenpine.cheeseballoon.member.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.member.application.port.in.dto.ChangeNicknameReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.UserInfoDto;
import org.greenpine.cheeseballoon.member.application.port.out.MemberPort;
import org.greenpine.cheeseballoon.member.application.port.out.BookmarkPort;
import org.greenpine.cheeseballoon.member.application.port.out.ViewLogPort;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MemberPersistenceAdapter implements MemberPort {
    private final MemberRepository memberRepository;
    @Override
    public MemberEntity findMember(UserInfoDto dto) {
        String originId = dto.getOriginId();
        Character platform = dto.getPlatform();
        return memberRepository.findByOriginIdAndPlatform(originId, platform);

    }

    @Override
    public MemberEntity findByNickname(String nickname) {
        return memberRepository.findByNickname(nickname);
    }

    @Override
    public MemberEntity register(UserInfoDto dto) {
        RoleEntity role = RoleEntity.builder()
                .roleId(2l)
                .build();
        MemberEntity member = MemberEntity.builder()
                .email(dto.getEmail())
                .role(role)
                .nickname(dto.getName())
                .originId(dto.getOriginId())
                .profileImgUrl(dto.getProfileImgUrl())
                .platform(dto.getPlatform())
                .build();
        member = memberRepository.save(member);
        return member;
    }

    @Override
    public void changeNickname(Long memberId, ChangeNicknameReqDto dto) {
        Optional<MemberEntity> memberOptional = memberRepository.findById(memberId);
        if(memberOptional.isPresent()){
            MemberEntity member = memberOptional.get();
            member.setNickname(dto.getNewNickname());
            memberRepository.save(member);
        }
    }
}
