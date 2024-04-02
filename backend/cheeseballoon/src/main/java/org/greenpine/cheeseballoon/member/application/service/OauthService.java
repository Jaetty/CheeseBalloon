package org.greenpine.cheeseballoon.member.application.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;

import org.apache.coyote.BadRequestException;
import org.greenpine.cheeseballoon.member.application.port.in.dto.UserInfoDto;
import org.greenpine.cheeseballoon.member.application.port.out.dto.GoogleUserInfoResDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
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
    private String LOGIN_REDIRECT_URL;

    public UserInfoDto getGoogleAccessToken(String accessCode) throws JsonProcessingException, BadRequestException {//
        RestTemplate restTemplate=new RestTemplate();
        Map<String, String> params = new HashMap<>();

        params.put("code", accessCode);
        params.put("client_id", GOOGLE_CLIENT_ID);
        params.put("client_secret", GOOGLE_CLIENT_SECRET);
        params.put("redirect_uri", LOGIN_REDIRECT_URL);
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

    public UserInfoDto getGoogleUserInfo(String accessToken) throws BadRequestException {
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

}
