package org.greenpine.cheeseballoon.member.application.port.in;

import org.greenpine.cheeseballoon.member.application.port.in.dto.AddBookmarkReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.DeleteBookmarkReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.FindBookmarkReqDto;
import org.greenpine.cheeseballoon.member.application.port.out.dto.FindBookmarkResDto;

import java.util.List;

public interface BookmarkUsecase {
    List<FindBookmarkResDto> findBookmark(FindBookmarkReqDto reqDto);

    void deleteBookmark(DeleteBookmarkReqDto reqDto);

    void addBookmark(AddBookmarkReqDto reqDto);
}
