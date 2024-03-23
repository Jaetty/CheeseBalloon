package org.greenpine.cheeseballoon.streamer.application.port.out;


import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDto;

import java.util.List;

public interface StreamerPort {
    List<FindSearchStreamerResDto> searchStreamer(String query);
}
