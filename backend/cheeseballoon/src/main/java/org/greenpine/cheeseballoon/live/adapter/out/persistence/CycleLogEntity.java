package org.greenpine.cheeseballoon.live.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@Entity
@Table(name = "cycle_logs")
@DynamicInsert
@DynamicUpdate
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CycleLogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cycleLogId;
    private Integer afreecaViewerCnt;
    private Integer chzzkViewerCnt;
    private LocalDateTime cycleDt;
}
