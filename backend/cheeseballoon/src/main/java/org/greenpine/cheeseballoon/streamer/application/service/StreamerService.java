package org.greenpine.cheeseballoon.streamer.application.service;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.StreamerLogEntity;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.*;
import org.greenpine.cheeseballoon.streamer.application.port.in.StreamerUsecase;
import org.greenpine.cheeseballoon.streamer.application.port.out.StreamerPort;
import org.greenpine.cheeseballoon.streamer.domain.StreamerLiveDomain;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
// 서비스는 유스케이스의 구현을 담당하고 Port를 사용함
public class StreamerService implements StreamerUsecase {

    private final StreamerPort streamerPort;

    @Override
    public List<FindSearchStreamerResDtoInterface> searchStreamer(String query, long memberId) {

        List<FindSearchStreamerResDtoInterface> result =  streamerPort.searchStreamersByName(query, memberId);

        return result;
    }

    @Override
    public FindStreamerDetailResDto streamerDetail(Long streamerId, long memberId) {

        FindStreamerDetailResDto ret = streamerPort.streamerDetail(streamerId, memberId);

        return ret;
    }

    @Override
    public FindStreamerDetailLiveResDto streamerDetailLive(Long streamerId) {

        StreamerLiveDomain liveDomain = streamerPort.streamerDetailLive(streamerId);
        liveDomain.liveCheck();

        FindStreamerDetailLiveResDto result = FindStreamerDetailLiveResDto.builder()
                .isLive(liveDomain.getLive())
                .streamerUrl(liveDomain.getStreamUrl())
                .thumbnailUrl(liveDomain.getThumbnailUrl())
                .build();


        return result;
    }

    @Override
    public List<FindStreamerFollowDto> streamerDetailFollower(Long streamerId, int date) {

        List<StreamerLogEntity> list = streamerPort.streamerFollowerDetail(streamerId, date);

        List<FindStreamerFollowDto> ret = new ArrayList<>();

        for(int i=0; i<list.size(); i++){
            ret.add(new FindStreamerFollowDto(list.get(i).getRegDt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")), list.get(i).getFollower()));
        }

        return ret;
    }

}
