package org.greenpine.cheeseballoon.streamer.application.port.in;


import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDtoInterface;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindStreamerDetailLiveResDto;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindStreamerDetailResDto;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindStreamerFollowDto;

import java.util.List;

public interface StreamerUsecase {

    List<FindSearchStreamerResDtoInterface> searchStreamer(String query, long memberId);

    FindStreamerDetailResDto streamerDetail(Long streamerId, long memberId);

    FindStreamerDetailLiveResDto streamerDetailLive(Long streamerId);

    List<FindStreamerFollowDto> streamerDetailFollower(Long streamerId, int date);

}
