package org.greenpine.cheeseballoon.redis;

import com.fasterxml.jackson.core.type.TypeReference;
import org.greenpine.cheeseballoon.global.redis.RedisUtil;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.FindLiveRankingResDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class RedisTest {

    @Autowired
    private RedisUtil redisUtil;

    @Test
    void redisTest(){
        List<FindLiveRankingResDto> res = new ArrayList<>();

        res.add(FindLiveRankingResDto.builder()
                .liveId(1L)
                .platform('A')
                .build());
        redisUtil.setData("key", res, 600000L);

        List<FindLiveRankingResDto> ret=redisUtil.getData("key", new TypeReference<List<FindLiveRankingResDto>>() {});
        if(ret!=null)
            System.out.println(ret.get(0).getPlatform());
    }
}
