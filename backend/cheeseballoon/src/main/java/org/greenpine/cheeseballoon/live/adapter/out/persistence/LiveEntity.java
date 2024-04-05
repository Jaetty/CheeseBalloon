package org.greenpine.cheeseballoon.live.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.*;
import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.StreamerEntity;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "lives")
@DynamicInsert
@DynamicUpdate
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LiveEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long liveId;
    private Long liveOriginId;
    private String streamUrl;
    private String thumbnailUrl;
    private Boolean isLive;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "streamer_id")
    private StreamerEntity streamer;

}
