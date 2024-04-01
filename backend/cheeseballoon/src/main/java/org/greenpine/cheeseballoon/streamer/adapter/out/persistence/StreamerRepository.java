package org.greenpine.cheeseballoon.streamer.adapter.out.persistence;

import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDto;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindSearchStreamerResDtoInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StreamerRepository extends JpaRepository<StreamerEntity,Long> {

    List<StreamerEntity> findAllByNameContaining(String query);

    @Query(value = "SELECT s.streamer_id AS streamerId, s.NAME, li.is_live AS isLive, s.profile_url AS profileUrl, s.channel_url AS channelUrl,sl.follower, s.platform\n" +
            "FROM streamers s JOIN (SELECT streamer_id, follower, reg_dt \n" +
            "\tFROM streamer_logs \n" +
            "\tWHERE (streamer_id, reg_dt) IN (SELECT streamer_id, max(reg_dt) AS reg_dt FROM streamer_logs GROUP BY streamer_id) ORDER BY reg_dt DESC) sl\n" +
            "on s.streamer_id = sl.streamer_id, lives AS li\n" +
            "WHERE NAME LIKE CONCAT('%', :query ,'%') AND li.streamer_id = s.streamer_id;", nativeQuery = true)
    List<FindSearchStreamerResDtoInterface> searchStreamerByName(String query);

    StreamerEntity findByStreamerId(Long id);

}
