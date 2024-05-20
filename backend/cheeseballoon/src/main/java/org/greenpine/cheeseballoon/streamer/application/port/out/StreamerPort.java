package org.greenpine.cheeseballoon.streamer.application.port.out;


import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.*;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.*;
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
    List<FindStreamerCategoryResDtoInterface> streamerDetailCategory(Long streamerId, LocalDateTime beforeDay, LocalDateTime today);

}
