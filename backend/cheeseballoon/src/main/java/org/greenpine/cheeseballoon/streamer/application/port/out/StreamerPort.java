package org.greenpine.cheeseballoon.streamer.application.port.out;


import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDtoInterface;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindStreamerDetailResDto;

import java.util.List;

public interface StreamerPort {
    List<FindSearchStreamerResDtoInterface> searchStreamersByName(String query);

    FindStreamerDetailResDto streamerDetail(Long streamerId);

}
