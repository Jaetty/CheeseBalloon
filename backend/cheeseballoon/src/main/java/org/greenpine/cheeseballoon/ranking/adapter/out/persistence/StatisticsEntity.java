package org.greenpine.cheeseballoon.ranking.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.*;
import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.StreamerEntity;

import java.sql.Time;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "statistics")
public class StatisticsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long statisticId;
    private Integer averageViewer;
    private Integer topViewer;
    private Double rating;
    private Double soopRating;
    private Double chzzRating;
    private Time totalAirTime;
    private String dtCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "streamer_id")
    private StreamerEntity streamer;
}
