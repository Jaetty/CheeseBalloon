package org.greenpine.cheeseballoon.streamer.application.port.in;


import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.FindSearchStreamerResDtoInterface;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.*;

import java.time.LocalDateTime;
import java.util.List;

public interface StreamerUsecase {

    List<FindSearchStreamerResDtoInterface> searchStreamer(String query, long memberId);
    FindStreamerSummaryResDto streamerDetailSummary(Long streamerId, String[] dtCodes, LocalDateTime[] specificDates);
    FindStreamerDetailResDto streamerDetail(Long streamerId, long memberId);
    FindStreamerDetailLiveResDto streamerDetailLive(Long streamerId);
    List<FindStreamerFollowDto> streamerDetailFollower(Long streamerId, LocalDateTime[] dates);

    FindStreamerViewerDto streamerDetailViewer(Long streamerId, LocalDateTime[] dates, String[] dtCode);
    FindStreamerRatingDto streamerDetailRating(Long streamerId, LocalDateTime[] dates, String[] dtCode);
    FindStreamerCategoryDto streamerDetailCategory(Long streamerId, LocalDateTime[] dates);
    FindStreamerTimeDto streamerDetailTime(Long streamerId, String[] dtCodes, LocalDateTime[] dates, LocalDateTime[] specificDates);

}
