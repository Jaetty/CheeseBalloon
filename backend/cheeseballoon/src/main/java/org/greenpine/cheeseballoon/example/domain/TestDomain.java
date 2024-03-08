package org.greenpine.cheeseballoon.example.domain;

import lombok.Builder;

@Builder
public class TestDomain {
    private Long id;
    private int value;

    public void add(int num){
        value+=num;
    }
}
