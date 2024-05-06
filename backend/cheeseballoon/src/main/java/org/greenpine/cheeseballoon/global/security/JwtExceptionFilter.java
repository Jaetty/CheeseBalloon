package org.greenpine.cheeseballoon.global.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.greenpine.cheeseballoon.global.response.StatusEnum;
import org.greenpine.cheeseballoon.member.application.port.out.message.MemberResMsg;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.http.ResponseEntity;

@Component
public class JwtExceptionFilter extends OncePerRequestFilter { //인증 에러 처리 필터

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws ServletException, IOException {
        try {
            chain.doFilter(req, res); // go to 'JwtAuthenticationFilter'
        } catch ( SignatureException e ) {
            //System.out.println(e);
            CustomBody body = new CustomBody(StatusEnum.UNAUTHORIZED, "Invalid token", null);
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 Unauthorized 상태코드 설정
            res.setContentType(MediaType.APPLICATION_JSON_VALUE); // JSON 형식 응답 Content-Type 설정
            res.getWriter().write(new ObjectMapper().writeValueAsString(body));
        }catch ( JwtException e){
            //System.out.println(e);
            CustomBody body =new CustomBody(StatusEnum.UNAUTHORIZED, e.getMessage(), null);
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            res.setContentType(MediaType.APPLICATION_JSON_VALUE);
            res.getWriter().write(new ObjectMapper().writeValueAsString(body));
        }
    }
}