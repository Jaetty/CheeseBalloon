package org.greenpine.cheeseballoon.example.adapter.out.persistence;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


//@Entity
//@Table(name = "tests")
//@DynamicInsert
//@DynamicUpdate
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class TestEntity { //우리가 아는 엔티티
    //@Id @GeneratedValue
    private Long id;
    private int value;
}
