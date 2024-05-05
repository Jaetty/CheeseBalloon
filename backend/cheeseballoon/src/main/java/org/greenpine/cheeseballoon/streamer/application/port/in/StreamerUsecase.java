package org.greenpine.cheeseballoon.streamer.application.port.in;


import org.greenpine.cheeseballoon.streamer.application.port.out.dto.*;

import java.util.List;

public interface StreamerUsecase {

    List<FindSearchStreamerResDtoInterface> searchStreamer(String query, long memberId);

    FindStreamerDetailResDto streamerDetail(Long streamerId, long memberId);

    FindStreamerDetailLiveResDto streamerDetailLive(Long streamerId);

    List<FindStreamerFollowDto> streamerDetailFollower(Long streamerId, int date);

    FindStreamerViewerDto streamerDetailViewer(Long streamerId, int date);

}
