package org.greenpine.cheeseballoon.streamer.application.port.in;


import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDto;

import java.util.List;

public interface StreamerUsecase {

    List<FindSearchStreamerResDto> searchStreamer(String query);

}
