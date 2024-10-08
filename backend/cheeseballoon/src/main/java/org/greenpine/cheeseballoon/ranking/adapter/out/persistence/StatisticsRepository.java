package org.greenpine.cheeseballoon.ranking.adapter.out.persistence;

import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.FindStreamerRecordDtoInterface;
import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.FindSummaryRankResDtoInterface;
import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.StreamerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface StatisticsRepository extends JpaRepository<StatisticsEntity, Long> {

    @Query(value =
            "SELECT RANK, statistic.streamer_id AS streamerId, average_viewer AS averageViewer, name, profile_url AS profileUrl, channel_url, platform, case when bookmark_id IS NULL then 'false' ELSE 'true' END AS bookmark FROM \n" +
            "(SELECT streamers.streamer_id, streamers.`name`, streamers.profile_url, streamers.channel_url, streamers.platform, statistics.average_viewer, ROW_NUMBER() OVER(ORDER BY average_viewer DESC, streamers.streamer_id) AS RANK\n" +
            "FROM streamers \n" +
            "JOIN statistics ON streamers.streamer_id = statistics.streamer_id AND statistics.dt_code = :dtCode AND streamers.platform LIKE :platform AND statistics.average_viewer > 100\n" +
            "LIMIT 300) AS statistic \n" +
            "LEFT OUTER JOIN bookmarks\n" +
            " ON bookmarks.streamer_id = statistic.streamer_id AND bookmarks.member_id = :memberId", nativeQuery = true)
    List<FindAvgViewerRankResDtoInterface> findAverageViewerRanking(String dtCode, String platform, Long memberId);

    @Query(value = "SELECT RANK, statistic.streamer_id AS streamerId, top_viewer AS TopViewer, name, profile_url AS profileUrl, channel_url, platform, case when bookmark_id IS NULL then 'false' ELSE 'true' END AS bookmark FROM \n" +
            "(SELECT streamers.streamer_id, streamers.`name`, streamers.profile_url, streamers.channel_url, streamers.platform, statistics.top_viewer, ROW_NUMBER() OVER(ORDER BY top_viewer DESC, streamers.streamer_id) AS RANK\n" +
            "FROM streamers \n" +
            "JOIN statistics ON streamers.streamer_id = statistics.streamer_id AND statistics.dt_code = :dtCode AND streamers.platform LIKE :platform AND statistics.average_viewer > 100\n" +
            "LIMIT 300) AS statistic \n" +
            "LEFT OUTER JOIN bookmarks\n" +
            " ON bookmarks.streamer_id = statistic.streamer_id AND bookmarks.member_id = :memberId", nativeQuery = true)
    List<FindTopViewerRankResDtoInterface> findTopViewerRanking(String dtCode, String platform, Long memberId);

    @Query(value = "SELECT RANK, statistic.streamer_id AS streamerId, rating, name, profile_url AS profileUrl, channel_url, platform, case when bookmark_id IS NULL then 'false' ELSE 'true' END AS bookmark FROM \n" +
            "(SELECT streamers.streamer_id, streamers.`name`, streamers.profile_url, streamers.channel_url, streamers.platform, statistics.rating, ROW_NUMBER() OVER(ORDER BY rating DESC, streamers.streamer_id) AS RANK\n" +
            "FROM streamers \n" +
            "JOIN statistics ON streamers.streamer_id = statistics.streamer_id AND statistics.dt_code = :dtCode AND streamers.platform LIKE :platform AND statistics.average_viewer > 100\n" +
            "LIMIT 300) AS statistic \n" +
            "LEFT OUTER JOIN bookmarks\n" +
            " ON bookmarks.streamer_id = statistic.streamer_id AND bookmarks.member_id = :memberId", nativeQuery = true)
    List<FindRatingRankResDtoInterface> findRatingRanking(String dtCode, String platform, Long memberId);


    @Query(value = "SELECT RANK, statistic.streamer_id AS streamerId, time_to_sec(total_air_time) AS totalAirTime, name, profile_url AS profileUrl, channel_url, platform, case when bookmark_id IS NULL then 'false' ELSE 'true' END AS bookmark FROM \n" +
            "(SELECT streamers.streamer_id, streamers.`name`, streamers.profile_url, streamers.channel_url, streamers.platform, statistics.total_air_time, ROW_NUMBER() OVER(ORDER BY total_air_time DESC, streamers.streamer_id) AS RANK\n" +
            "FROM streamers \n" +
            "JOIN statistics ON streamers.streamer_id = statistics.streamer_id AND statistics.dt_code = :dtCode AND streamers.platform LIKE :platform AND statistics.average_viewer > 100\n" +
            "LIMIT 300) AS statistic \n" +
            "LEFT OUTER JOIN bookmarks\n" +
            " ON bookmarks.streamer_id = statistic.streamer_id AND bookmarks.member_id = :memberId", nativeQuery = true)
    List<FindTotalAirTimeRankResDtoInterface> findTotalAirTimeRanking(String dtCode, String platform, Long memberId);

    @Query(value = "SELECT RANK, averageViewer, topViewer, rating, totalAirTime, streamerId, follower \n" +
            "FROM\n" +
            "(SELECT ROW_NUMBER() OVER(ORDER BY average_viewer DESC, statistics.streamer_id) AS RANK, average_viewer AS averageViewer, top_viewer AS topViewer, rating, TIME_TO_SEC(total_air_time) AS totalAirTime, statistics.streamer_id AS streamerId \n" +
            "FROM statistics WHERE dt_code = :dtCode) AS statistic \n" +
            "JOIN streamer_logs ON statistic.streamerId = streamer_logs.streamer_id AND streamer_logs.reg_dt BETWEEN :startDate AND :endDate AND streamer_id = :streamerId", nativeQuery = true)
    FindSummaryRankResDtoInterface findRankingByDtCodeAndStreamerIdAndDates(String dtCode, Long streamerId, LocalDateTime startDate, LocalDateTime endDate);

    StatisticsEntity findByStreamerAndDtCode(StreamerEntity streamerEntity, String dtCode);

    @Query(value="SELECT ROUND(TIME_TO_SEC(total_air_time)/60,0) AS value, LEFT(dt_code,10) AS day FROM statistics WHERE streamer_id = :streamerId AND dt_code LIKE '%-0'", nativeQuery = true)
    List<FindStreamerRecordDtoInterface> findStreamerRecord(Long streamerId);

    @Query(value = "SELECT l.*, ll.* , s.*, c.category, " +
            "false AS bookmark "+
            "FROM lives l " +
            "LEFT JOIN live_logs AS ll ON l.live_id = ll.live_id " +
            "LEFT JOIN categories AS c ON ll.category_id = c.category_id " +
            "LEFT JOIN streamers AS s ON l.streamer_id = s.streamer_id " +
            "WHERE cycle_log_id = (SELECT cycle_log_id FROM cycle_logs ORDER BY cycle_log_id DESC LIMIT 1) " +
            "ORDER BY ll.viewer_cnt DESC "
            , nativeQuery = true)
    List<FindLiveRankingInterface> findLiveRanking();
    @Query(value = "SELECT l.*, ll.* , s.*, c.category, " +
            "false AS bookmark "+
            "FROM lives l " +
            "LEFT JOIN live_logs AS ll ON l.live_id = ll.live_id " +
            "LEFT JOIN categories AS c ON ll.category_id = c.category_id " +
            "LEFT JOIN streamers AS s ON l.streamer_id = s.streamer_id " +
            "WHERE cycle_log_id = (SELECT cycle_log_id FROM cycle_logs ORDER BY cycle_log_id DESC LIMIT 1) " +
            "AND platform = :platform " +
            "ORDER BY ll.viewer_cnt DESC"
            , nativeQuery = true)
    List<FindLiveRankingInterface> findLiveRankingWithPlatform(Character platform);
    @Query(value = "SELECT l.*, ll.* , s.*, c.category, " +
            "CASE " +
            "WHEN b.streamer_id IS NOT NULL THEN true " +
            "ELSE false " +
            "END AS bookmark " +
            "FROM lives l " +
            "LEFT JOIN live_logs AS ll ON l.live_id = ll.live_id " +
            "LEFT JOIN categories AS c ON ll.category_id = c.category_id " +
            "LEFT JOIN streamers AS s ON l.streamer_id = s.streamer_id " +
            "LEFT JOIN bookmarks AS b ON s.streamer_id = b.streamer_id AND b.member_id = :memberId " +
            "WHERE cycle_log_id = (SELECT cycle_log_id FROM cycle_logs ORDER BY cycle_log_id DESC LIMIT 1) " +
            "ORDER BY ll.viewer_cnt DESC"
            , nativeQuery = true)
    List<FindLiveRankingInterface> findLiveRankingWithMemberId(Long memberId);
    @Query(value = "SELECT l.*, ll.* , s.*, c.category, " +
            "CASE " +
            "WHEN b.streamer_id IS NOT NULL THEN true " +
            "ELSE false " +
            "END AS bookmark " +
            "FROM lives l " +
            "LEFT JOIN live_logs AS ll ON l.live_id = ll.live_id " +
            "LEFT JOIN categories AS c ON ll.category_id = c.category_id " +
            "LEFT JOIN streamers AS s ON l.streamer_id = s.streamer_id " +
            "LEFT JOIN bookmarks AS b ON s.streamer_id = b.streamer_id AND b.member_id = :memberId " +
            "WHERE cycle_log_id = (SELECT cycle_log_id FROM cycle_logs ORDER BY cycle_log_id DESC LIMIT 1) " +
            "AND platform = :platform " +
            "ORDER BY ll.viewer_cnt DESC"
            , nativeQuery = true)
    List<FindLiveRankingInterface> findLiveRankingWithMemberIdAndPlatform(Long memberId, Character platform);
}
