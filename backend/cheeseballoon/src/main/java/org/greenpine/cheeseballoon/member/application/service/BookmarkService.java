package org.greenpine.cheeseballoon.member.application.service;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.member.application.port.in.BookmarkUsecase;
import org.greenpine.cheeseballoon.member.application.port.in.dto.AddBookmarkReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.DeleteBookmarkReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.FindBookmarkReqDto;
import org.greenpine.cheeseballoon.member.application.port.out.dto.FindBookmarkResDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookmarkService implements BookmarkUsecase {
    @Override
    public List<FindBookmarkResDto> findBookmark(FindBookmarkReqDto reqDto) {
        return null;
    }

    @Override
    public void deleteBookmark(DeleteBookmarkReqDto reqDto) {

    }

    @Override
    public void addBookmark(AddBookmarkReqDto reqDto) {

    }
}
