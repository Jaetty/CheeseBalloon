package org.greenpine.cheeseballoon.streamer.application.port.out;


import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.StreamerLogEntity;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDtoInterface;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindStreamerDailiyViewerResDtoInterface;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindStreamerDetailResDto;
import org.greenpine.cheeseballoon.streamer.domain.StreamerLiveDomain;

import java.util.List;

public interface StreamerPort {
    List<FindSearchStreamerResDtoInterface> searchStreamersByName(String query, long memberId);

    FindStreamerDetailResDto streamerDetail(Long streamerId, long memberId);

    StreamerLiveDomain streamerDetailLive(Long streamerId);

    List<StreamerLogEntity> streamerFollowerDetail(Long streamerId, int date);

    List<FindStreamerDailiyViewerResDtoInterface>[] streamerDetailViewer(Long streamerId, int date);

}
