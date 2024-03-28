package org.greenpine.cheeseballoon.streamer.application.port.out;


import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDtoInterface;

import java.util.List;

public interface StreamerPort {
    List<FindSearchStreamerResDtoInterface> searchStreamersByName(String query);
}
