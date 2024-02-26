package org.greenpine.cheeseballoon.example.application.port.out;

import org.greenpine.cheeseballoon.example.application.port.in.dto.TestReqDto;
import org.greenpine.cheeseballoon.example.application.port.out.dto.TestResDto;

public interface TestPort {
    //서비스와 레포지토리를 연결하는 인터페이스(포트)

    TestResDto create(TestReqDto testReqDto);

    TestResDto read(Long id);

//    void update(Long id, int value);
//
//    void delete(Long id);
}
