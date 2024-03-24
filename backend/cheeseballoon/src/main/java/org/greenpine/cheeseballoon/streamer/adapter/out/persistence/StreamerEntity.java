package org.greenpine.cheeseballoon.streamer.adapter.out.persistence;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@Entity
@Table(name = "streamers")
@DynamicInsert
@DynamicUpdate
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StreamerEntity {

    @Id
    @GeneratedValue
    private Long streamerId;
    private String originId;
    private String name;
    private String profileUrl;
    private String channelUrl;
    private Character platform;

}
