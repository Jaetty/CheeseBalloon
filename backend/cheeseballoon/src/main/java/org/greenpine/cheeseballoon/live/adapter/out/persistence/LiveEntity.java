package org.greenpine.cheeseballoon.live.adapter.out.persistence;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

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
    @GeneratedValue
    private Long liveId;
    private String streamUrl;
    private String thumbnailUrl;
    private LocalDateTime startDt;
    private LocalDateTime endDt;
    private Integer totalLiveTime;

}
