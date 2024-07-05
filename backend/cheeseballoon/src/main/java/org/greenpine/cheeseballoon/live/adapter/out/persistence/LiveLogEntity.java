package org.greenpine.cheeseballoon.live.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.*;
import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.CycleLogEntity;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "live_logs")
@DynamicInsert
@DynamicUpdate
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LiveLogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long liveLogId;
    private String title;
    private Integer viewerCnt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "live_id")
    private LiveEntity live;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private CategoryEntity category;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cycle_log_id")
    private CycleLogEntity cycleLog;

}
