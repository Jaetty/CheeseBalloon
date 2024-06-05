package org.greenpine.cheeseballoon.global.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.global.token.JwtUtil;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.SignatureException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    List<GrantedAuthority> userAuth = Collections.singletonList(new SimpleGrantedAuthority("USER"));
    List<GrantedAuthority> managerAuth = Arrays.asList(
            new SimpleGrantedAuthority("MANAGER"),
            new SimpleGrantedAuthority("USER")
    );
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException, JwtException {
        String token = resolveToken(request);
        if(token!=null){
            //System.out.println("token:"+token);
            Claims claims = jwtUtil.extractAllClaims(token);
            if(jwtUtil.isTokenExpired(claims)){
                throw new JwtException("Token Expired");
            }
            Long memberId = jwtUtil.getUserId(claims);
            String role = jwtUtil.getRole(claims);
            System.out.println("필터 memberId : " + memberId +" "+role);
            List<GrantedAuthority> auth;
            if(role.equals("MANAGER")) auth = managerAuth;
            else auth = userAuth;
            //memberId 담고 user권한 부여
            AbstractAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    memberId, null, auth);

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    // Request Header에서 토큰 정보 추출
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7); //Bearer제거
        }
        return null;
    }
}
