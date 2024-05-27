package org.greenpine.cheeseballoon.streamer.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@Entity
@Table(name = "streamer_logs")
@DynamicInsert
@DynamicUpdate
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StreamerLogEntity {

    @Id
    @GeneratedValue
    private Long streamerLogId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "streamer_id")
    private StreamerEntity streamer;

    private Integer follower;

    private LocalDateTime regDt;


}
