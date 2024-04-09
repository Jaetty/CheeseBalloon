package org.greenpine.cheeseballoon.streamer.adapter.out.persistence;

import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDtoInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StreamerRepository extends JpaRepository<StreamerEntity,Long> {

    // 스트리머 이름으로 스트리머 정보 가져오기 -> isLive도 가져와야해서 join이 있음
    @Query(value = "SELECT s.streamer_id AS streamerId, s.NAME, li.is_live AS isLive, s.profile_url AS profileUrl, s.channel_url AS channelUrl,sl.follower, s.platform\n" +
            "FROM streamers s JOIN (SELECT streamer_id, follower, reg_dt \n" +
            "\tFROM streamer_logs \n" +
            "\tWHERE (streamer_id, reg_dt) IN (SELECT streamer_id, max(reg_dt) AS reg_dt FROM streamer_logs GROUP BY streamer_id) ORDER BY reg_dt DESC) sl\n" +
            "on s.streamer_id = sl.streamer_id, lives AS li\n" +
            "WHERE NAME LIKE CONCAT('%', :query ,'%') AND li.streamer_id = s.streamer_id;", nativeQuery = true)
    List<FindSearchStreamerResDtoInterface> searchStreamerByName(String query);

    // 스트리머 아이디로 스트리머 정보 가져오기
    StreamerEntity findByStreamerId(Long id);

    // 스트리머 정보로 랭킹 값 가져오기
    @Query(value = "SELECT ranksql.rank\n" +
            "FROM (SELECT RANK() OVER(ORDER BY viewer_cnt DESC) AS rank, live.live_id, live.streamer_id, live.live_origin_id, live.stream_url, live.thumbnail_url, live_log.live_log_id ,live_log.cycle_log_id, live_log.category_id, live_log.title, round(avg(live_log.viewer_cnt),0) AS viewer_cnt, s.name\n" +
            "FROM lives AS live\n" +
            "inner join (SELECT * FROM live_logs WHERE cycle_log_id in (SELECT cycle_log_id FROM cycle_logs WHERE cycle_dt BETWEEN :beforeDay AND :today))\n" +
            "live_log ON live.live_id = live_log.live_id, streamers s\n" +
            "WHERE s.streamer_id = live.streamer_id\n" +
            "GROUP BY live.streamer_id\n" +
            "ORDER BY viewer_cnt DESC\n" +
            "LIMIT 300) AS ranksql\n" +
            "WHERE ranksql.streamer_id = :streamerId", nativeQuery = true)
    Integer getStreamerRank(Long streamerId, String beforeDay, String today);




}
