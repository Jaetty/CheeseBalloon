package org.greenpine.cheeseballoon.live.adapter.out.persistence;

import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.FindAvgViewerRankResDtoInterface;
import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.FindFollowerRankResDtoInterface;
import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.FindRatingRankResDtoInterface;
import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.FindTopViewerRankResDtoInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

// 나중에 로그인 했을 때 member_id값을 토큰에서 가져와서 member_id 값에 맞게 조회하게 만들어야함.

public interface LiveRepository extends JpaRepository<LiveEntity,Long> {

//    @Query("SELECT LiveEntity FROM LiveEntity le where le.streamer.streamerId = :streamerId order by le.liveId ")
    LiveEntity findFirstByStreamer_StreamerIdOrderByLiveId(Long streamerId);

    LiveEntity findByLiveId(Long liveId);
}
