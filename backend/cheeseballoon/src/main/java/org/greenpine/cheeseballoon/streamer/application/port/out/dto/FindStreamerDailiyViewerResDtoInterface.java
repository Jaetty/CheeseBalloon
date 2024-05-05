package org.greenpine.cheeseballoon.streamer.application.port.out.dto;

import java.time.LocalDate;
import java.util.List;

public interface FindStreamerDailiyViewerResDtoInterface {

    String getDate();
    Integer getMaxViewer();
    Integer getViewer();
    
}
