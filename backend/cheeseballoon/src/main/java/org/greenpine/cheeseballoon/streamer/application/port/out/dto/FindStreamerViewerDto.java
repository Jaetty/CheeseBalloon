package org.greenpine.cheeseballoon.streamer.application.port.out.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class FindStreamerViewerDto {
    int maxViewer;
    int maxDiff;
    int avgViewer;
    int avgDiff;
    List<DailyAvgViewer> dailyAvgViewers;
}
