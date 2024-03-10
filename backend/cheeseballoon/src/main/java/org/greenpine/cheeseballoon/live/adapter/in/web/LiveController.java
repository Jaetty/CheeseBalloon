package org.greenpine.cheeseballoon.live.adapter.in.web;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.greenpine.cheeseballoon.example.application.port.out.message.TestResMsg;
import org.greenpine.cheeseballoon.global.response.CustomBody;
import org.greenpine.cheeseballoon.global.response.StatusEnum;
import org.greenpine.cheeseballoon.live.application.port.in.LiveUsecase;
import org.greenpine.cheeseballoon.live.application.port.in.dto.FindLiveReqDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindLiveResDto;
import org.greenpine.cheeseballoon.live.application.port.out.message.LiveResMsg;
import org.greenpine.cheeseballoon.live.application.service.LiveService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/live")
@RequiredArgsConstructor
public class LiveController {

    final private LiveUsecase liveUsecase;

    @GetMapping("")
    public ResponseEntity<CustomBody> findLives(FindLiveReqDto findLiveReqDto){
        System.out.println(findLiveReqDto);
        List<FindLiveResDto> ret = liveUsecase.findLives(findLiveReqDto);

        return ResponseEntity.ok(new CustomBody(StatusEnum.OK, LiveResMsg.SUCCESS, ret));
    }


    public String getPartition(String word){
        String ret ="";
        String[] chosungs = {"ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ" , "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"};
        String[] jungsungs = {"ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"};
        String[] jongsungs = {"", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"};

        for(int i=0; i<word.length(); i++){
            char cha = word.charAt(i);
            if(cha<0xAC00) {
                ret += cha;
                continue;
            }
            int uniBase = cha - 44032;

            char chosung = (char)(uniBase / 28 / 21);
            char jungsung = (char)(uniBase / 28 % 21);
            char jongsung = (char)(uniBase % 28);

            ret += chosungs[chosung];
            ret += jungsungs[jungsung];
            if(jongsung!=0)
                ret += jongsungs[jongsung];

            /*System.out.println((int)chosung + ", " + chosungs[chosung]);
            System.out.println((int)jungsung + ", " + jungsungs[jungsung]);
            System.out.println((int)jongsung + ", " + jongsungs[jongsung]);*/
        }


        return ret;
    }
}


