package org.greenpine.cheeseballoon.streamer.application.port.out;


import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.StatisticsEntity;
import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.*;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.*;
import org.greenpine.cheeseballoon.streamer.domain.StreamerLiveDomain;

import java.time.LocalDateTime;
import java.util.List;

public interface StreamerPort {

    StreamerEntity findByStreamerId(Long streamerId);
    List<FindSearchStreamerResDtoInterface> searchStreamersByName(String query, long memberId);

    FindSummaryRankResDtoInterface streamerDetailSummary(Long streamerId, String dtCode, LocalDateTime startDate, LocalDateTime endDate);

    FindStreamerDetailResDto streamerDetail(Long streamerId, long memberId);

    StreamerLiveDomain streamerDetailLive(Long streamerId);

    List<StreamerLogEntity> streamerDetailFollower(Long streamerId, LocalDateTime startDate, LocalDateTime endDate);

    List<FindStreamerDailyViewerResDtoInterface> streamerDetailViewer(Long streamerId, LocalDateTime startDate, LocalDateTime endDate);

    List<FindStreamerRatingResDtoInterface> streamerDetailRating(Long streamerId, LocalDateTime startDate, LocalDateTime endDate);
    List<FindStreamerCategoryResDtoInterface> streamerDetailCategory(Long streamerId, LocalDateTime startDate, LocalDateTime endDate);

    List<FindTimeDetailResDtoInterface> streamerDetailTime(Long streamerId, LocalDateTime startDate, LocalDateTime endDate);

    StatisticsEntity streamerStatistics(StreamerEntity streamerEntity, String dtCode);

}
