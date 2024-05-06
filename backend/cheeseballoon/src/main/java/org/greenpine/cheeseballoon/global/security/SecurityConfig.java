package org.greenpine.cheeseballoon.global.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.greenpine.cheeseballoon.global.response.StatusEnum;
import org.greenpine.cheeseballoon.global.token.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig{

    private final JwtUtil jwtUtil;

    String[] permitUrls = {"/member/login"};
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //CSRF, CORS
        http.csrf((csrf) -> csrf.disable());
        http.cors(Customizer.withDefaults());

        //세션 관리 상태 없음으로 구성, Spring Security가 세션 생성 or 사용 X
        http.sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(
                SessionCreationPolicy.STATELESS));

        //JwtAuthFilter를 UsernamePasswordAuthenticationFilter 앞에 추가
        http.addFilterBefore(new JwtAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(new JwtExceptionFilter(), JwtAuthenticationFilter.class);
        //new JwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class

        // 권한 규칙 작성
        http.authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/member/bookmark/**", "/member/viewlog/**").hasAnyAuthority("USER")
                .requestMatchers("/member/login/**").permitAll()
                //.requestMatchers("/member/login/test").hasRole("admin") //role 체크
                .anyRequest().permitAll() //모든 경로에 대한 인증처리는 Pass
                //.anyRequest().authenticated() // 그 외의 요청은 모두 인증이 필요함

        ).exceptionHandling(exceptionHandling -> exceptionHandling //인가안된 경우 응답 설정
                .authenticationEntryPoint((request, response, authException) -> {
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    response.setStatus(HttpStatus.UNAUTHORIZED.value());
                    ObjectMapper mapper = new ObjectMapper();
                    CustomBody body =new CustomBody(StatusEnum.UNAUTHORIZED, "Unauthorized access", null);
                    mapper.writeValue(response.getWriter(), body);
                })
        )
        ;


        return http.build();
    }
}
