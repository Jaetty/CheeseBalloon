package org.greenpine.cheeseballoon.ranking.domain;

import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class RankDiffDomain {

    public void rankDiffCalculate(long s_id, int before_rank, int before_value, int MAX_RANK, Map<Long, Integer> rank_diff ,Map<Long, Integer> diff){

        // rank 변동 값 계산
        // curr_rank는 순수하게 몇 등이었는지를 가져온다. 예를 들어 이번에 1등이면 301 - 300 = 1등
        int curr_rank = (MAX_RANK+1) - rank_diff.get(s_id);
        int view_diff = diff.get(s_id);

        if(before_rank >= curr_rank){
            rank_diff.put(s_id, before_rank - curr_rank);
        }else{
            rank_diff.put(s_id, -(curr_rank - before_rank));
        }

        // 시청자 diff 값 계산
        diff.put(s_id, view_diff >= before_value ? view_diff - before_value : -(before_value - view_diff));

    }

}
