package org.greenpine.cheeseballoon.streamer.application.port.out;


import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.StreamerEntity;
import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.StreamerLogEntity;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDtoInterface;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindStreamerDailyViewerResDtoInterface;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindStreamerDetailResDto;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindStreamerRatingResDtoInterface;
import org.greenpine.cheeseballoon.streamer.domain.StreamerLiveDomain;

import java.time.LocalDateTime;
import java.util.List;

public interface StreamerPort {

    StreamerEntity findByStreamerId(Long streamerId);
    List<FindSearchStreamerResDtoInterface> searchStreamersByName(String query, long memberId);

    FindStreamerDetailResDto streamerDetail(Long streamerId, long memberId);

    StreamerLiveDomain streamerDetailLive(Long streamerId);

    List<StreamerLogEntity> streamerDetailFollower(Long streamerId, int date);

    List<FindStreamerDailyViewerResDtoInterface>[] streamerDetailViewer(Long streamerId, int date);

    List<FindStreamerRatingResDtoInterface> streamerDetailRating(Long streamerId, LocalDateTime beforeDay, LocalDateTime today);

}
