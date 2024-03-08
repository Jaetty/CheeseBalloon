package org.greenpine.cheeseballoon.global.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomBody {

    private StatusEnum status;
    private String message;
    private Object data;

}
