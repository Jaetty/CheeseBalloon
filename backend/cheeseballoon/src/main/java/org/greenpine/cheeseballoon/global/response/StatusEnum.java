package org.greenpine.cheeseballoon.global.response;

public enum StatusEnum {
    OK(200, "OK"),
    CREATED(201, "CREATED"),
    BAD_REQUEST(400, "BAD_REQUEST"),
    UNAUTHORIZED(401,"UNAUTHORIZED"), //인증안됨
    FORBIDDEN(403, "FORBIDDEN"), //권한없음
    NOT_FOUND(404, "NOT_FOUND"),
    NOT_EXIST(410, "NOT_EXIST"),
    INTERNAL_SERER_ERROR(500, "INTERNAL_SERVER_ERROR"),
    SERVICE_UNAVAILABLE(503, "SERVICE_UNAVAILABLE");

    int statusCode;
    String code;

    StatusEnum(int statusCode, String code) {
        this.statusCode = statusCode;
        this.code = code;
    }
}
