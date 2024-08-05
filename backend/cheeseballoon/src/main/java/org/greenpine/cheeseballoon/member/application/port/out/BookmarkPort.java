package org.greenpine.cheeseballoon.member.application.port.out;

import org.greenpine.cheeseballoon.member.application.port.in.dto.AddBookmarkReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.DeleteBookmarkReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.FindBookmarkReqDto;
import org.greenpine.cheeseballoon.member.application.port.out.dto.FindBookmarkResDto;

import java.util.List;

public interface BookmarkPort {
    List<FindBookmarkResDto> findBookmark(FindBookmarkReqDto reqDto);

    long deleteBookmark(DeleteBookmarkReqDto reqDto);

    void addBookmark(AddBookmarkReqDto reqDto);
}
