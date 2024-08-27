package org.greenpine.cheeseballoon.member.application.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;

import org.apache.coyote.BadRequestException;
import org.greenpine.cheeseballoon.global.token.JwtUtil;
import org.greenpine.cheeseballoon.member.application.port.in.dto.GetAccessTokenResDto;
import org.greenpine.cheeseballoon.member.application.port.in.dto.UserInfoDto;
import org.greenpine.cheeseballoon.member.application.port.out.dto.GoogleUserInfoResDto;
import org.greenpine.cheeseballoon.member.application.port.out.dto.KakaoUserInfoResDto;
import org.greenpine.cheeseballoon.member.application.port.out.dto.NaverUserInfoResDto;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

import java.math.BigInteger;
import java.security.SecureRandom;
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

    private final String KAKAO_TOKEN_API = "https://kapi.kakao.com/v2/user/me";
    @Value("${oauth2.kakao.redirect-uri}")
    private String KAKAO_REDIRECT_URL;
    @Value("${oauth2.kakao.rest-api-key}")
    private String KAKAO_RESTAPI_KEY;

    private final String NAVER_USER_API = "https://openapi.naver.com/v1/nid/me";
    private final String NAVER_TOKEN_URL = "https://nid.naver.com/oauth2.0/token";
    @Value("${oauth2.naver.redirect-uri}")
    private String NAVER_REDIRECT_URL;
    @Value("${oauth2.naver.client-id}")
    private String NAVER_CLIENT_ID;
    @Value("${oauth2.naver.client-secret}")
    private String NAVER_CLIENT_SECRET;

    private final JwtUtil jwtUtil;
    private final ObjectMapper objectMapper;

    public GetAccessTokenResDto getNewAccessToken(Long memberId, String role){
        String accessToken = jwtUtil.createAccessToken(memberId, role);
        return GetAccessTokenResDto.builder()
                .accessToken(accessToken)
                .build();
    }

    public UserInfoDto getGoogleUserInfo(String accessCode) throws JsonProcessingException, BadRequestException {
        RestTemplate restTemplate=new RestTemplate();
        Map<String, String> params = new HashMap<>();

        params.put("code", accessCode);
        params.put("client_id", GOOGLE_CLIENT_ID);
        params.put("client_secret", GOOGLE_CLIENT_SECRET);
        params.put("redirect_uri", GOOGLE_REDIRECT_URL);
        params.put("grant_type", "authorization_code");

        ResponseEntity<String> responseEntity=restTemplate.postForEntity(GOOGLE_TOKEN_URL, params,String.class);

        if(responseEntity.getStatusCode() == HttpStatus.OK){
            //System.out.println(responseEntity.getBody());
            Map<String, Object> jsonMap = objectMapper.readValue(responseEntity.getBody(), new TypeReference<Map<String, Object>>() {});
            String accessToken = (String) jsonMap.get("access_token");
            //System.out.println("accessToken:"+accessToken);
            return requestGoogleUserInfo(accessToken);
        }

        return null;

    }

    public UserInfoDto requestGoogleUserInfo(String accessToken) throws BadRequestException {
        String apiUrl = GOOGLE_USER_API + accessToken;
        // RestTemplate 생성
        RestTemplate restTemplate = new RestTemplate();
        // 사용자 정보 요청 및 응답 받기
        ResponseEntity<GoogleUserInfoResDto> responseEntity = restTemplate.getForEntity(apiUrl, GoogleUserInfoResDto.class);

        // 응답 데이터 확인
        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            GoogleUserInfoResDto googleUserInfo = responseEntity.getBody();
            //System.out.println(googleUserInfo);
            return UserInfoDto.builder()
                    .originId(googleUserInfo.getSub())
                    .platform('G')
                    .build();
        }else
            throw new BadRequestException();

    }

    public UserInfoDto getKakaoUserInfo(String accessCode) throws JsonProcessingException, BadRequestException {
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
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        // POST 방식으로 Http 요청한다. 그리고 response 변수의 응답 받는다.
        ResponseEntity<String> responseEntity = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class // 요청 시 반환되는 데이터 타입
        );

        //System.out.println(responseEntity.getBody());
        if(responseEntity.getStatusCode() == HttpStatus.OK){
            //System.out.println(responseEntity.getBody());
            Map<String, Object> jsonMap = objectMapper.readValue(responseEntity.getBody(), new TypeReference<Map<String, Object>>() {});
            String accessToken = (String) jsonMap.get("access_token");
            //System.out.println(accessToken);
            return requestKakaoUserInfo(accessToken);
        }
        return null;
    }

    public UserInfoDto requestKakaoUserInfo(String accessToken) throws BadRequestException, JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(
                KAKAO_TOKEN_API,
                HttpMethod.GET,
                entity,
                String.class
        );

        if (response.getStatusCode().is2xxSuccessful()) {
            String responseBody = response.getBody();
            //System.out.println(responseBody);
            KakaoUserInfoResDto kakaoUserInfo = objectMapper.readValue(responseBody, KakaoUserInfoResDto.class);
            //System.out.println("id: " + kakaoUserInfo.getId());
            //System.out.println("nickname: " + kakaoUserInfo.getProperties().getNickname());
            //System.out.println("Thumbnail Image: " + kakaoUserInfo.getProperties().getProfileImage());
            return UserInfoDto.builder()
                    .originId(kakaoUserInfo.getId())
                    .platform('K')
                    .build();
        } else {
            throw new BadRequestException();
        }
    }

    public String[] getNaverUrl(){

        String state = generateState();

        String naverLoginUrl = "https://nid.naver.com/oauth2.0/authorize?response_type=code"
                + "&client_id=" + NAVER_CLIENT_ID
                + "&redirect_uri=" + NAVER_REDIRECT_URL
                + "&state=" + state;

        return new String[] {state, naverLoginUrl};
    }

    public UserInfoDto getNaverUserInfo(String accessCode, String state) throws BadRequestException, JsonProcessingException {
        // HTTP POST를 요청할 때 보내는 데이터(body)를 설명해주는 헤더도 만들어 같이 보내줘야 한다.
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        // body 데이터를 담을 오브젝트인 MultiValueMap를 만들어보자
        // body는 보통 key, value의 쌍으로 이루어지기 때문에 자바에서 제공해주는 MultiValueMap 타입을 사용한다.
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", NAVER_CLIENT_ID);
        params.add("client_secret", NAVER_CLIENT_SECRET);
        params.add("code", accessCode);
        params.add("state", state);
        // 요청하기 위해 헤더(Header)와 데이터(Body)를 합친다.
        RestTemplate restTemplate=new RestTemplate();
        ResponseEntity<String> responseEntity=restTemplate.postForEntity(NAVER_TOKEN_URL, params,String.class);
//        System.out.println(responseEntity.getStatusCode());
        if(responseEntity.getStatusCode() == HttpStatus.OK) {
            Map<String, Object> jsonMap = objectMapper.readValue(responseEntity.getBody(), new TypeReference<Map<String, Object>>() {});
            String accessToken = (String) jsonMap.get("access_token");
            return requestNaverUserInfo(accessToken);
        }
        return null;
    }

    public UserInfoDto requestNaverUserInfo(String accessToken) throws BadRequestException, JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(
                NAVER_USER_API,
                HttpMethod.GET,
                entity,
                String.class
        );

        if (response.getStatusCode().is2xxSuccessful()) {
            String responseBody = response.getBody();
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(responseBody);
            String id = rootNode.path("response").path("id").asText();

            return UserInfoDto.builder()
                    .originId(id)
                    .platform('N')
                    .build();
        } else {
            throw new BadRequestException();
        }

    }

    private String generateState()
    {
        SecureRandom random = new SecureRandom();
        return new BigInteger(130, random).toString(32);
    }

}
