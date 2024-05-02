package org.greenpine.cheeseballoon.member.application.service;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.member.application.port.in.BookmarkUsecase;
import org.greenpine.cheeseballoon.member.application.port.in.dto.AddBookmarkReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.DeleteBookmarkReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.FindBookmarkReqDto;
import org.greenpine.cheeseballoon.member.application.port.out.BookmarkPort;
import org.greenpine.cheeseballoon.member.application.port.out.dto.FindBookmarkResDto;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookmarkService implements BookmarkUsecase  {
    private final BookmarkPort bookmarkPort;
    @Override
    public List<FindBookmarkResDto> findBookmark(FindBookmarkReqDto reqDto) {
        return bookmarkPort.findBookmark(reqDto);
    }

    @Override
    @Transactional
    public void deleteBookmark(DeleteBookmarkReqDto reqDto) throws RuntimeException{
        long delCnt = bookmarkPort.deleteBookmark(reqDto);
        if(delCnt == 0L )throw new DuplicateKeyException("");
    }

    @Override
    @Transactional
    public void addBookmark(AddBookmarkReqDto reqDto) {
        bookmarkPort.addBookmark(reqDto);
    }
}
