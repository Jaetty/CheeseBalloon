package org.greenpine.cheeseballoon.example.application.service;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.example.application.port.in.AnotherUsecase;
import org.greenpine.cheeseballoon.example.application.port.in.TestUsecase;
import org.greenpine.cheeseballoon.example.application.port.in.dto.TestReqDto;
import org.greenpine.cheeseballoon.example.application.port.out.TestPort;
import org.greenpine.cheeseballoon.example.application.port.out.dto.TestResDto;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TestService implements TestUsecase, AnotherUsecase {

    private final TestPort testPort; //레포지토리 사용하기 위한 포트
    @Override
    public TestResDto create(TestReqDto testReqDto) {
        //비즈니스 로직 여기서 구현하기
        //예를들어 입금의 경우 계좌 엔티티 가져오고 머니 추가하고 save하는 로직

        return testPort.create(testReqDto);
    }

    @Override
    public TestResDto read(Long id) {
        //비즈니스 로직 여기서 구현하기

        return testPort.read(id);
    }
}
