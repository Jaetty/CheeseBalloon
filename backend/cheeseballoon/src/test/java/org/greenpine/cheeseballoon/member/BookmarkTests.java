package org.greenpine.cheeseballoon.member;

import org.greenpine.cheeseballoon.member.application.port.in.dto.AddBookmarkReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.DeleteBookmarkReqDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.FindBookmarkReqDto;
import org.greenpine.cheeseballoon.member.application.service.BookmarkService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class BookmarkTests {
    @Autowired
    private BookmarkService bookmarkService;

    @Test
    void addTest(){
        AddBookmarkReqDto reqDto = AddBookmarkReqDto.builder()
                .memberId(1L)
                .streamerId(10L)
                .build();
        bookmarkService.addBookmark(reqDto);
    }

    @Test
    void findTest(){
        System.out.println(bookmarkService.findBookmark(FindBookmarkReqDto.builder().memberId(1L).build()));
    }

    @Test
    void deleteTest(){
        //bookmarkService.deleteBookmark(DeleteBookmarkReqDto.builder().bookmarkId(4L).memberId(1L).build());
    }
}
