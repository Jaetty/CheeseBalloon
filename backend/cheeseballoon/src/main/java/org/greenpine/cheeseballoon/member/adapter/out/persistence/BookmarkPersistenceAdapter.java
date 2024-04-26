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
//        MemberEntity member = MemberEntity.builder()
//                .memberId(reqDto.getMemberId())
//                .build();
        //List<BookmarkEntity> bookmarkEntities = bookmarkRepository.findAllByMemberId(reqDto.getMemberId());
//        List<FindBookmarkResDto> res = bookmarkEntities.stream()
//                .map(entity -> FindBookmarkResDto.builder()
//                        .bookmarkId(entity.getBookmarkId())
//                        .flatform(entity.getStreamer().getPlatform())
//                        .followerCnt(entity.getStreamer().)
//                        .build())
//                .collect(Collectors.toList());
        return null;
    }

    @Override
    public void deleteBookmark(DeleteBookmarkReqDto reqDto) {

    }

    @Override
    public void addBookmark(AddBookmarkReqDto reqDto) {
        bookmarkRepository.save(BookmarkEntity.builder()
                        .streamer(StreamerEntity.builder().streamerId(reqDto.getStreamerId()).build())
                        .member(MemberEntity.builder().memberId(reqDto.getMemberId()).build())
                .build()
        );
    }
}
