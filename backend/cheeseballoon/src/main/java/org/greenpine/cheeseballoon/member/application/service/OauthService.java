package org.greenpine.cheeseballoon.member.application.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;

import org.apache.coyote.BadRequestException;
import org.greenpine.cheeseballoon.member.application.port.in.dto.UserInfoDto;
import org.greenpine.cheeseballoon.member.application.port.out.dto.GoogleUserInfoResDto;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OauthService {
    private final String GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
    private final String GOOGLE_USER_API = "https://openidconnect.googleapis.com/v1/userinfo?access_token=";
    @Value("${oauth2.google.client-id}")
    private String GOOGLE_CLIENT_ID;
    @Value("${oauth2.google.client-secret}")
    private String GOOGLE_CLIENT_SECRET;
    @Value("${oauth2.google.redirect-uri}")
    private String GOOGLE_REDIRECT_URL;

    @Value("${oauth2.kakao.redirect-uri}")
    private String KAKAO_REDIRECT_URL;
    @Value("${oauth2.kakao.rest-api-key}")
    private String KAKAO_RESTAPI_KEY;


    public UserInfoDto getGoogleUserInfo(String accessCode) throws JsonProcessingException, BadRequestException {//
        RestTemplate restTemplate=new RestTemplate();
        Map<String, String> params = new HashMap<>();

        params.put("code", accessCode);
        params.put("client_id", GOOGLE_CLIENT_ID);
        params.put("client_secret", GOOGLE_CLIENT_SECRET);
        params.put("redirect_uri", GOOGLE_REDIRECT_URL);
        params.put("grant_type", "authorization_code");

        ResponseEntity<String> responseEntity=restTemplate.postForEntity(GOOGLE_TOKEN_URL, params,String.class);

        if(responseEntity.getStatusCode() == HttpStatus.OK){
            System.out.println(responseEntity.getBody());
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> jsonMap = objectMapper.readValue(responseEntity.getBody(), new TypeReference<Map<String, Object>>() {});
            String accessToken = (String) jsonMap.get("access_token");
            //System.out.println("accessToken:"+accessToken);
            return getGoogleUserInfo(accessToken);
        }

        return null;

    }

    public UserInfoDto requestGoogleUserInfo(String accessToken) throws BadRequestException {
        String apiUrl = GOOGLE_USER_API + accessToken;
        // RestTemplate 생성
        RestTemplate restTemplate = new RestTemplate();

        /*정보 출력용
         ResponseEntity<String> responseEntity2 = restTemplate.getForEntity(apiUrl, String.class);
         String userInfo = responseEntity2.getBody();
         System.out.println(userInfo);*/

        // 사용자 정보 요청 및 응답 받기
        ResponseEntity<GoogleUserInfoResDto> responseEntity = restTemplate.getForEntity(apiUrl, GoogleUserInfoResDto.class);

        // 응답 데이터 확인
        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            GoogleUserInfoResDto googleUserInfo = responseEntity.getBody();
            System.out.println(googleUserInfo);
            return UserInfoDto.builder()
                    .email(googleUserInfo.getEmail())
                    .name(googleUserInfo.getName())
                    .profileUrl(googleUserInfo.getPicture())
                    .build();
        }else
            throw new BadRequestException();

    }

    public UserInfoDto getKakaoUserInfo(String accessCode) throws JsonProcessingException {
        RestTemplate rt = new RestTemplate();

        // HTTP POST를 요청할 때 보내는 데이터(body)를 설명해주는 헤더도 만들어 같이 보내줘야 한다.
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        // body 데이터를 담을 오브젝트인 MultiValueMap를 만들어보자
        // body는 보통 key, value의 쌍으로 이루어지기 때문에 자바에서 제공해주는 MultiValueMap 타입을 사용한다.
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", KAKAO_RESTAPI_KEY);
        params.add("redirect_uri", KAKAO_REDIRECT_URL);
        params.add("code", accessCode);

        // 요청하기 위해 헤더(Header)와 데이터(Body)를 합친다.
        // kakaoTokenRequest는 데이터(Body)와 헤더(Header)를 Entity가 된다.
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        // POST 방식으로 Http 요청한다. 그리고 response 변수의 응답 받는다.
        ResponseEntity<String> responseEntity = rt.exchange(
                "https://kauth.kakao.com/oauth/token", // https://{요청할 서버 주소}
                HttpMethod.POST, // 요청할 방식
                kakaoTokenRequest, // 요청할 때 보낼 데이터
                String.class // 요청 시 반환되는 데이터 타입
        );

        System.out.println(responseEntity.getBody());
        if(responseEntity.getStatusCode() == HttpStatus.OK){
            //System.out.println(responseEntity.getBody());
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> jsonMap = objectMapper.readValue(responseEntity.getBody(), new TypeReference<Map<String, Object>>() {});
            String accessToken = (String) jsonMap.get("access_token");
            System.out.println(accessToken);
        }
        return null;
    }

}