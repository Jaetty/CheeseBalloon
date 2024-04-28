package org.greenpine.cheeseballoon.streamer.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveEntity;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveLogRepository;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.LiveRepository;
import org.greenpine.cheeseballoon.ranking.domain.DateValue;
import org.greenpine.cheeseballoon.streamer.application.port.out.StreamerPort;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDtoInterface;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindStreamerDetailResDto;
import org.greenpine.cheeseballoon.streamer.domain.StreamerDomain;
import org.greenpine.cheeseballoon.streamer.domain.StreamerLiveDomain;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class StreamerPersistenceAdapter implements StreamerPort { // 어뎁터는 포트를 구현하는, 포트와 도메인을 연결시키는 역할을 수행한다.

    private final StreamerRepository streamerRepository;
    private final StreamerLogRepository streamerLogRepository;
    private final LiveRepository liveRepository;
    private final LiveLogRepository liveLogRepository;
    final private DateValue dateValue;

    @Override
    public List<FindSearchStreamerResDtoInterface> searchStreamersByName(String query, long memberId) {

        List<FindSearchStreamerResDtoInterface> result = streamerRepository.searchStreamerByName(query, memberId);

        return result;
    }


    // 이 부분으로 특정 기간 동안의 평균 랭킹을 낸다.
    // 멤버id로 즐겨찾기 여부를 검색해줘야한다.
    @Override
    public FindStreamerDetailResDto streamerDetail(Long streamerId, long memberId) {

        StreamerEntity streamerEntity = streamerRepository.findByStreamerId(streamerId);

        System.out.println(streamerEntity.getOriginId());

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime before = now.minus(8, ChronoUnit.DAYS);

        String beforeDay = now.minus(7, ChronoUnit.DAYS).format(DateTimeFormatter.ofPattern("yyyy-MM-dd 00:00:00"));
        String today = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd 23:59:59"));

        Integer currRank = streamerRepository.getStreamerRank(streamerId, beforeDay, today);

        beforeDay = before.minus(7, ChronoUnit.DAYS).format(DateTimeFormatter.ofPattern("yyyy-MM-dd 00:00:00"));
        today = before.format(DateTimeFormatter.ofPattern("yyyy-MM-dd 23:59:59"));

        Integer beforeRank = streamerRepository.getStreamerRank(streamerId, beforeDay, today);

        currRank = currRank == null ? 0 : currRank;
        beforeRank = beforeRank == null ? 0 : beforeRank;

        int diff = 0;

        if(currRank > 0 && beforeRank > 0){
            diff = (currRank - beforeRank) * -1;
        }
        else if(currRank > 0){
            diff = 300 - currRank;

        }else if(beforeRank > 0){
            diff = (301-beforeRank) * -1;
        }

        // 여기 북마크 수정해야함
        FindStreamerDetailResDto result = FindStreamerDetailResDto.builder()
                .streamerId(streamerId)
                .channelUrl(streamerEntity.getChannelUrl())
                .rank(currRank)
                .originId(streamerEntity.getOriginId())
                .bookmark(false)
                .name(streamerEntity.getName())
                .profileUrl(streamerEntity.getProfileUrl())
                .channelUrl(streamerEntity.getChannelUrl())
                .platform(streamerEntity.getPlatform())
                .diff(diff).build();

        return result;
    }

    @Override
    public StreamerLiveDomain streamerDetailLive(Long streamerId) {

        LiveEntity liveEntity = liveRepository.findFirstByStreamer_StreamerIdOrderByLiveId(streamerId);

        StreamerDomain streamerDomain = new StreamerDomain(
                liveEntity.getStreamer().getStreamerId(),
                liveEntity.getStreamer().getOriginId(),
                liveEntity.getStreamer().getName(),
                liveEntity.getStreamer().getProfileUrl(),
                liveEntity.getStreamer().getChannelUrl(),
                liveEntity.getStreamer().getPlatform());

        StreamerLiveDomain liveDomain = new StreamerLiveDomain(liveEntity.getLiveId(),
                liveEntity.getLiveOriginId(),
                liveEntity.getStreamUrl(),
                liveEntity.getThumbnailUrl(),
                liveEntity.getIsLive(),
                streamerDomain);


        return liveDomain;
    }

    @Override
    public StreamerLogEntity streamerFollowerDetail(Long streamerId, int date) {

        StreamerEntity streamerEntity = streamerRepository.findByStreamerId(streamerId);

        LocalDateTime[] dates = dateValue.getPeriod(date);


//        streamerLogRepository.findStreamerLogEntitiesByRegDtBetweenAndStreamerOOrderByRegDtAsc(,streamerEntity);


        return null;
    }


}
