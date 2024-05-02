package org.greenpine.cheeseballoon.member.adapter.out.persistence;

import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.StreamerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookmarkRepository  extends JpaRepository<BookmarkEntity,Long> {

    @Query(value ="SELECT members.*, streamers.*, bf.bookmark_id, bf.follower, lives.is_live FROM ( "+
            "   SELECT b.*, sl.follower "+
            "   FROM bookmarks b "+
            "   LEFT JOIN ( "+
            "       SELECT streamer_id, MAX(streamer_log_id) AS max_streamer_log_id "+
            "       FROM streamer_logs "+
            "       GROUP BY streamer_id "+
            "   )max_sl ON b.streamer_id = max_sl.streamer_id "+
            "   LEFT JOIN streamer_logs sl ON max_sl.streamer_id = sl.streamer_id AND max_sl.max_streamer_log_id = sl.streamer_log_id "+
            "   where member_id = :memberId "+
            ")  AS bf " +
            "LEFT JOIN members ON bf.member_id = members.member_id " +
            "LEFT JOIN streamers ON bf.streamer_id = streamers.streamer_id "+
            "LEFT JOIN ( "+
            "   SELECT streamer_id, MAX(live_id) AS max_live_id FROM lives " +
            "   GROUP BY streamer_id) max_live "+
            "ON streamers.streamer_id = max_live.streamer_id "+
            "LEFT JOIN lives ON lives.live_id = max_live.max_live_id "
            , nativeQuery = true)
    List<BookmarkWithFollower> findAllByMemberId(Long memberId);

    BookmarkEntity findByMemberAndStreamer(MemberEntity member, StreamerEntity streamer);

    long deleteByBookmarkIdAndMember(Long bookmarkId, MemberEntity member);
}
