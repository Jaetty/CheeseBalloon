package org.greenpine.cheeseballoon.example.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.example.application.port.in.dto.TestReqDto;
import org.greenpine.cheeseballoon.example.application.port.out.AnotherPort;
import org.greenpine.cheeseballoon.example.application.port.out.TestPort;
import org.greenpine.cheeseballoon.example.application.port.out.dto.TestResDto;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TestPersistenceAdapter implements TestPort, AnotherPort { //포트 인터페이스를 여기서 구현

    //private final TestRepository testRepository; //db가 없어서 주석처리

    @Override
    public TestResDto create(TestReqDto testReqDto) {
        TestEntity test = new TestEntity(1L, testReqDto.getValue());
        //TestEntity test = testRepository.save(test); //testRepository가 안되니 주석
        return TestResDto.builder()
                .id(test.getId())
                .value(test.getValue())
                .build();
    }

    @Override
    public TestResDto read(Long id) {
        //TestEntity test = testRepository.findById(id); //testRepository가 안되니 주석
        TestEntity test = new TestEntity(id, 100);

        // 여기서 도메인을 부른다.
        return TestResDto.builder()
                .id(test.getId())
                .value(test.getValue())
                .build();

    }


}
