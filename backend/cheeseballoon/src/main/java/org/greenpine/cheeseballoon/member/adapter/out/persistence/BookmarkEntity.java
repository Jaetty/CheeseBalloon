package org.greenpine.cheeseballoon.member.adapter.out.persistence;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;
import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.StreamerEntity;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "bookmarks")
@DynamicInsert
@DynamicUpdate
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookmarkEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookmarkId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private MemberEntity member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "streamer_id")
    private StreamerEntity streamer;

}
