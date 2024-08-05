package org.greenpine.cheeseballoon.member.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.member.application.port.in.dto.AddBookmarkReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.DeleteBookmarkReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.FindBookmarkReqDto;
import org.greenpine.cheeseballoon.member.application.port.out.BookmarkPort;
import org.greenpine.cheeseballoon.member.application.port.out.dto.FindBookmarkResDto;
import org.greenpine.cheeseballoon.streamer.adapter.out.persistence.StreamerEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;


@Repository
@RequiredArgsConstructor
public class BookmarkPersistenceAdapter implements BookmarkPort {
    private final BookmarkRepository bookmarkRepository;


    @Override
    public List<FindBookmarkResDto> findBookmark(FindBookmarkReqDto reqDto) {
        List<BookmarkWithFollower> bookmarks = bookmarkRepository.findAllByMemberId(reqDto.getMemberId());
        List<FindBookmarkResDto> res = bookmarks.stream().map(b -> FindBookmarkResDto.builder()
                .bookmarkId(b.getBookmark_id())
                .streamerId(b.getStreamer_id())
                .name(b.getName())
                .profileUrl(b.getProfile_img_url())
                .followerCnt(b.getFollower())
                .isLive(b.getIs_live())
                .platform(b.getPlatform())
                .build()
        ).toList();
        return res;
    }

    @Override
    public long deleteBookmark(DeleteBookmarkReqDto reqDto) {
        MemberEntity member = MemberEntity.builder().memberId(reqDto.getMemberId()).build();
        return bookmarkRepository.deleteByBookmarkIdAndMember(reqDto.getBookmarkId(), member);
    }

    @Override
    public void addBookmark(AddBookmarkReqDto reqDto) {
        MemberEntity member = MemberEntity.builder().memberId(reqDto.getMemberId()).build();
        StreamerEntity streamer = StreamerEntity.builder().streamerId(reqDto.getStreamerId()).build();
        if(bookmarkRepository.findByMemberAndStreamer(member, streamer)!=null)
            return;

        bookmarkRepository.save(BookmarkEntity.builder()
                .streamer(streamer)
                .member(member)
                .build()
        );
    }
}
