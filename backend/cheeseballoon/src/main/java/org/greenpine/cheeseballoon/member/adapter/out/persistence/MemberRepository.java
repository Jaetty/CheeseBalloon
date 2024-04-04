package org.greenpine.cheeseballoon.member.adapter.out.persistence;

import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<MemberEntity,Long> {
    MemberEntity findByNickname(String nickname);
    MemberEntity findByOriginIdAndPlatform(String originId, Character platform);

}
