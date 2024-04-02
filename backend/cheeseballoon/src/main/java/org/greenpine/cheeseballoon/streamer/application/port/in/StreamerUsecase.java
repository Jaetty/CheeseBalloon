package org.greenpine.cheeseballoon.streamer.application.port.in;


import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDtoInterface;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindStreamerDetailLiveResDto;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindStreamerDetailResDto;

import java.util.List;

public interface StreamerUsecase {

    List<FindSearchStreamerResDtoInterface> searchStreamer(String query);

    FindStreamerDetailResDto streamerDetail(Long streamerId);

    FindStreamerDetailLiveResDto streamerDetailLive(Long streamerId);

}
