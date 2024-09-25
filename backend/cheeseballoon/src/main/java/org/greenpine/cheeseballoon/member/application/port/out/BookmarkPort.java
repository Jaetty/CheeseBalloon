package org.greenpine.cheeseballoon.member.application.port.out;

import org.greenpine.cheeseballoon.member.application.port.in.dto.AddBookmarkReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.DeleteBookmarkByStreamerIdReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.DeleteBookmarkReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.FindBookmarkReqDto;
import org.greenpine.cheeseballoon.member.application.port.out.dto.FindBookmarkResDto;

import java.util.List;

public interface BookmarkPort {
    List<FindBookmarkResDto> findBookmark(FindBookmarkReqDto reqDto);

    long deleteBookmark(DeleteBookmarkReqDto reqDto);

    long deleteBookmarkByStreamerId(DeleteBookmarkByStreamerIdReqDto reqDto);

    void addBookmark(AddBookmarkReqDto reqDto);
}
