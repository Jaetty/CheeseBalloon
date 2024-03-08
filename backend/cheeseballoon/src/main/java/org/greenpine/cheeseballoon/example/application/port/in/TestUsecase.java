package org.greenpine.cheeseballoon.example.application.port.in;

import org.greenpine.cheeseballoon.example.application.port.in.dto.TestReqDto;
import org.greenpine.cheeseballoon.example.application.port.out.dto.TestResDto;

public interface TestUsecase {
    //컨트롤러와 서비스를 연결하는 인터페이스(포트)
    //서비스에서 구현할 Test 관련 CRUD 기능

    TestResDto create(TestReqDto testReqDto);

    TestResDto read(Long id);

    //TestRes update(Long id, int value);

    //void delete(Long id);
}
