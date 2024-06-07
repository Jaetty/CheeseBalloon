package org.greenpine.cheeseballoon.notice.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.*;
import org.greenpine.cheeseballoon.member.adapter.out.persistence.MemberEntity;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@Entity
@Table(name = "notices")
@DynamicInsert
@DynamicUpdate
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoticeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noticeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private MemberEntity member;

    private String title;
    private String content;
    private String thumbnail;
    private LocalDateTime regDt;
}
