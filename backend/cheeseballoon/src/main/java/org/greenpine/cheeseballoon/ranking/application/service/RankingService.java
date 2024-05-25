package org.greenpine.cheeseballoon.ranking.application.service;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.ranking.adapter.out.persistence.*;
import org.greenpine.cheeseballoon.ranking.application.port.in.RankingUsecase;
import org.greenpine.cheeseballoon.ranking.application.port.out.RankingPort;
import org.greenpine.cheeseballoon.ranking.application.port.out.dto.*;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RankingService implements RankingUsecase {

    private final Integer MAX_RANK = 300;
    private final RankingPort rankingPort;

    /* !!!!! 도메인 리펙토링이 필요함 !!!!! */

    // 평균 시청자 수 랭킹 DTO 리턴
    @Override
    public List<FindAvgViewerRankingResDto> findAvgViewerRanking(String[] dtCodes, String platform, long memberId) {

        List<FindAvgViewerRankResDtoInterface> curr = rankingPort.findAvgViewerRanking(dtCodes[0], platform, memberId);
        List<FindAvgViewerRankResDtoInterface> before = rankingPort.findAvgViewerRanking(dtCodes[1], platform, memberId);

        // diff 값의 경우 O(N) 만큼 상수를 제외하지 않는다면 정확히 O(3 * MAX_RANK)만큼의 수행시간을 가짐
        // 우선 Repository에서 특정 기간의 값(res[0])과 그 전 기간의 값(res[1])을 가져옴

        List<FindAvgViewerRankingResDto> ret = new ArrayList<>();

        Map<Long, Integer> rank_diff = new HashMap<>();
        Map<Long, Integer> diff = new HashMap<>();

        // 특정 기간의 값을 기준으로 DTO를 세팅해줌
        for(FindAvgViewerRankResDtoInterface val : curr){

            // hashmap에 각 스트리머의 고유 아이디 값과 랭킹 값을 기준으로 몇 위 상승했는지 넣어줌
            // MAX_RANK의 값이 300이고 순위가 1등이면 랭킹 값은 300 + 1 - 1 = 300위 상승이라는 뜻
            rank_diff.put(val.getStreamerId(), (MAX_RANK+1) - val.getRank());
            diff.put(val.getStreamerId(), val.getAverageViewer());

            ret.add(FindAvgViewerRankingResDto.builder()
                    .streamerId(val.getStreamerId())
                    .name(val.getName())
                    .rank(val.getRank())
                    .platform(val.getPlatform())
                    .profileUrl(val.getProfileUrl())
                    .averageViewer(val.getAverageViewer())
                    .bookmark(val.getBookmark())
                    .build());
        }

        // 이전 기간 데이터가 없을 수 있음, 데이터가 있을 때만 수행
        if(!before.isEmpty()){

            for(FindAvgViewerRankResDtoInterface val : before){

                // 이전 기간 데이터가 있다면
                if(rank_diff.containsKey(val.getStreamerId())){
                    rankDiffCalculate(val.getStreamerId(), val.getRank(), val.getAverageViewer(), MAX_RANK, rank_diff, diff);
                }
            }

        }

        for(FindAvgViewerRankingResDto val : ret){
            val.setRankDiff(rank_diff.get(val.getStreamerId()));
            val.setDiff(diff.get(val.getStreamerId()));
        }

        return ret;
    }


    // 최대 시청자 수 랭킹 DTO 리턴
    @Override
    public List<FindTopViewerRankingResDto> findTopViewerRanking(String[] dtCodes, String platform, long memberId) {

        List<FindTopViewerRankResDtoInterface> curr = rankingPort.findTopViewerRanking(dtCodes[0], platform, memberId);
        List<FindTopViewerRankResDtoInterface> before = rankingPort.findTopViewerRanking(dtCodes[1], platform, memberId);

        // diff 값의 경우 O(N) 만큼 상수를 제외하지 않는다면 정확히 O(3 * MAX_RANK)만큼의 수행시간을 가짐
        // 우선 Repository에서 특정 기간의 값(res[0])과 그 전 기간의 값(res[1])을 가져옴

        List<FindTopViewerRankingResDto> ret = new ArrayList<>();

        Map<Long, Integer> rank_diff = new HashMap<>();
        Map<Long, Integer> diff = new HashMap<>();

        // 특정 기간의 값을 기준으로 DTO를 세팅해줌
        for(FindTopViewerRankResDtoInterface val : curr){

            // hashmap에 각 스트리머의 고유 아이디 값과 랭킹 값을 기준으로 몇 위 상승했는지 넣어줌
            // MAX_RANK의 값이 300이고 순위가 1등이면 랭킹 값은 300 + 1 - 1 = 300위 상승이라는 뜻
            rank_diff.put(val.getStreamerId(), (MAX_RANK+1) - val.getRank());
            diff.put(val.getStreamerId(), val.getTopViewer());

            ret.add(FindTopViewerRankingResDto.builder()
                    .streamerId(val.getStreamerId())
                    .name(val.getName())
                    .rank(val.getRank())
                    .platform(val.getPlatform())
                    .profileUrl(val.getProfileUrl())
                    .topViewer(val.getTopViewer())
                    .bookmark(val.getBookmark())
                    .build());
        }

        // 이전 기간 데이터가 없을 수 있음, 데이터가 있을 때만 수행
        if(!before.isEmpty()){

            for(FindTopViewerRankResDtoInterface val : before){
                // 이전 기간의 데이터가 있다면 수행
                if(rank_diff.containsKey(val.getStreamerId())){
                    rankDiffCalculate(val.getStreamerId(), val.getRank(), val.getTopViewer(), MAX_RANK, rank_diff, diff);
                }
            }

        }

        for(FindTopViewerRankingResDto val : ret){
            val.setRankDiff(rank_diff.get(val.getStreamerId()));
            val.setDiff(diff.get(val.getStreamerId()));
        }


        return ret;
    }

    // 팔로워 랭킹
    @Override
    public List<FindFollowerRankingResDto> findFollowerRanking(LocalDateTime[] dates, String platform, long memberId) {

        List<FindFollowerRankResDtoInterface> curr = rankingPort.findFollowerRanking(dates[0], dates[1], platform, memberId);
        List<FindFollowerRankResDtoInterface> before = rankingPort.findFollowerRanking(dates[2], dates[3], platform, memberId);

        // diff 값의 경우 O(N) 만큼 상수를 제외하지 않는다면 정확히 O(3 * MAX_RANK)만큼의 수행시간을 가짐
        // 우선 Repository에서 특정 기간의 값(res[0])과 그 전 기간의 값(res[1])을 가져옴

        List<FindFollowerRankingResDto> ret = new ArrayList<>();

        Map<Long, Integer> rank_diff = new HashMap<>();
        Map<Long, Integer> diff = new HashMap<>();

        // 특정 기간의 값을 기준으로 DTO를 세팅해줌
        for(FindFollowerRankResDtoInterface val : curr){

            // hashmap에 각 스트리머의 고유 아이디 값과 랭킹 값을 기준으로 몇 위 상승했는지 넣어줌
            // MAX_RANK의 값이 300이고 순위가 1등이면 랭킹 값은 300 + 1 - 1 = 300위 상승이라는 뜻
            rank_diff.put(val.getStreamerId(), (MAX_RANK+1) - val.getRank());
            diff.put(val.getStreamerId(), val.getFollower());

            ret.add(FindFollowerRankingResDto.builder()
                    .streamerId(val.getStreamerId())
                    .name(val.getName())
                    .rank(val.getRank())
                    .platform(val.getPlatform())
                    .profileUrl(val.getProfileUrl())
                    .follower(val.getFollower())
                    .bookmark(val.getBookmark())
                    .build());
        }

        // 이전 기간 데이터가 없을 수 있음, 데이터가 있을 때만 수행
        if(!before.isEmpty()){

            for(FindFollowerRankResDtoInterface val : before){
                // 이전 기간의 데이터가 있다면
                if(rank_diff.containsKey(val.getStreamerId())){
                    rankDiffCalculate(val.getStreamerId(), val.getRank(), val.getFollower(), MAX_RANK, rank_diff, diff);
                }
            }

        }

        for(FindFollowerRankingResDto val : ret){
            val.setRankDiff(rank_diff.get(val.getStreamerId()));
            val.setDiff(diff.get(val.getStreamerId()));
        }


        return ret;
    }

    // 시청률 랭킹 서비스
    @Override
    public List<FindRatingRankingResDto> findRatingRanking(String[] dtCodes, String platform, long memberId) {

        List<FindRatingRankResDtoInterface> curr = rankingPort.findRatingRanking(dtCodes[0], platform, memberId);
        List<FindRatingRankResDtoInterface> before = rankingPort.findRatingRanking(dtCodes[1], platform, memberId);

        List<FindRatingRankingResDto> ret = new ArrayList<>();

        Map<Long, Integer> rank_diff = new HashMap<>();
        Map<Long, Double> diff = new HashMap<>();

        // 특정 기간의 값을 기준으로 DTO를 세팅해줌
        for(FindRatingRankResDtoInterface val : curr){

            // hashmap에 각 스트리머의 고유 아이디 값과 랭킹 값을 기준으로 몇 위 상승했는지 넣어줌
            // MAX_RANK의 값이 300이고 순위가 1등이면 랭킹 값은 300 + 1 - 1 = 300위 상승이라는 뜻
            rank_diff.put(val.getStreamerId(), (MAX_RANK+1) - val.getRank());
            diff.put(val.getStreamerId(), val.getRating());

            ret.add(FindRatingRankingResDto.builder()
                    .streamerId(val.getStreamerId())
                    .name(val.getName())
                    .rank(val.getRank())
                    .platform(val.getPlatform())
                    .profileUrl(val.getProfileUrl())
                    .rating(val.getRating())
                    .bookmark(val.getBookmark())
                    .build());
        }

        // 이전 기간 데이터가 없을 수 있음, 데이터가 있을 때만 수행
        if(!before.isEmpty()){

            for(FindRatingRankResDtoInterface val : before){
                // 이전 기간의 데이터가 있다면 수행
                if(rank_diff.containsKey(val.getStreamerId())){
                    long s_id = val.getStreamerId();
                    int curr_rank = (MAX_RANK+1) - rank_diff.get(s_id);
                    double value_diff = diff.get(s_id);

                    if(val.getRank() >= curr_rank){
                        rank_diff.put(s_id, val.getRank() - curr_rank);
                    }else{
                        rank_diff.put(s_id, -(curr_rank - val.getRank()));
                    }

                    // 시청자 diff 값 계산
                    diff.put(s_id, value_diff >= val.getRating() ? Math.round(value_diff - val.getRating() * 100) / 100.0 : -Math.round((val.getRating() - value_diff)*100)/100.0);
                }
            }

        }

        for(FindRatingRankingResDto val : ret){
            val.setRankDiff(rank_diff.get(val.getStreamerId()));
            val.setDiff(diff.get(val.getStreamerId()));
        }


        return ret;
    }

    @Override
    public List<FindTotalAirTimeRankingResDto> findTotalAirTimeRanking(String[] dtCodes, String platform, long memberId) {

        List<FindTotalAirTimeRankResDtoInterface> curr = rankingPort.findTotalAirTimeRanking(dtCodes[0], platform, memberId);
        List<FindTotalAirTimeRankResDtoInterface> before = rankingPort.findTotalAirTimeRanking(dtCodes[1], platform, memberId);

        List<FindTotalAirTimeRankingResDto> ret = new ArrayList<>();

        Map<Long, Integer> rank_diff = new HashMap<>();
        Map<Long, Integer> diff = new HashMap<>();

        // 특정 기간의 값을 기준으로 DTO를 세팅해줌
        for(FindTotalAirTimeRankResDtoInterface val : curr){

            // hashmap에 각 스트리머의 고유 아이디 값과 랭킹 값을 기준으로 몇 위 상승했는지 넣어줌
            // MAX_RANK의 값이 300이고 순위가 1등이면 랭킹 값은 300 + 1 - 1 = 300위 상승이라는 뜻
            rank_diff.put(val.getStreamerId(), (MAX_RANK+1) - val.getRank());
            diff.put(val.getStreamerId(), val.getTotalAirTime());

            ret.add(FindTotalAirTimeRankingResDto.builder()
                    .streamerId(val.getStreamerId())
                    .name(val.getName())
                    .rank(val.getRank())
                    .platform(val.getPlatform())
                    .profileUrl(val.getProfileUrl())
                    .totalAirTime(getTime(val.getTotalAirTime()))
                    .bookmark(val.getBookmark())
                    .build());
        }

        // 이전 기간 데이터가 없을 수 있음, 데이터가 있을 때만 수행
        if(!before.isEmpty()){

            for(FindTotalAirTimeRankResDtoInterface val : before){
                // 이전 기간의 데이터가 있다면 수행
                if(rank_diff.containsKey(val.getStreamerId())){
                    long s_id = val.getStreamerId();
                    int curr_rank = (MAX_RANK+1) - rank_diff.get(s_id);
                    Integer curr_time = diff.get(s_id);

                    if(val.getRank() >= curr_rank){
                        rank_diff.put(s_id, val.getRank() - curr_rank);
                    }else{
                        rank_diff.put(s_id, -(curr_rank - val.getRank()));
                    }

                    Integer diff_time = curr_time - val.getTotalAirTime();
                    diff.put(val.getStreamerId(), diff_time);

                }
            }

        }

        for(FindTotalAirTimeRankingResDto val : ret){
            val.setRankDiff(rank_diff.get(val.getStreamerId()));
            int diff_time = diff.get(val.getStreamerId());

            val.setDiff(getTime(diff_time));
        }

        return ret;
    }

    private String getTime(Integer time){

        if (time == null){
            return "00:00:05";
        }

        StringBuilder sb = new StringBuilder();

        if (time < 0) {
            time = Math.abs(time);
            sb.append("-");
        }

        int hour = time/3600;
        int min = time % 3600 / 60;
        int sec = time % 3600 % 60;

        String result = hour+":";

        if(hour < 10){
            result = "0"+hour+":";
        }

        sb.append(result);
        sb.append(String.format("%02d:%02d", min, sec));

        return sb.toString();
    }

    private void rankDiffCalculate(long s_id, int before_rank, int before_value, int MAX_RANK, Map<Long, Integer> rank_diff ,Map<Long, Integer> diff){

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
