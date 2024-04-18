package org.greenpine.cheeseballoon.global.response;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.HandlerMethodValidationException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HandlerMethodValidationException.class)
    protected ResponseEntity<CustomBody> handleMethodArgumentNotValidException(HandlerMethodValidationException e) {

        return ResponseEntity.ok(new CustomBody(StatusEnum.BAD_REQUEST, "잘못된 요청입니다.", null));
    }
}
