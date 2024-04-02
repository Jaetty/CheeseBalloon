package org.greenpine.cheeseballoon.streamer.application.port.out;


import org.greenpine.cheeseballoon.live.application.port.out.dto.FindAvgViewerRankByStreamerIdAndDateDto;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDtoInterface;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindStreamerDetailResDto;
import org.greenpine.cheeseballoon.streamer.domain.StreamerLiveDomain;

import java.util.List;

public interface StreamerPort {
    List<FindSearchStreamerResDtoInterface> searchStreamersByName(String query);

    FindStreamerDetailResDto streamerDetail(Long streamerId);

    StreamerLiveDomain streamerDetailLive(Long streamerId);

}
