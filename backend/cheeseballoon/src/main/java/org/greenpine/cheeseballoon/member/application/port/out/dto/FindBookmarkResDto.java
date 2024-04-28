package org.greenpine.cheeseballoon.member.application.port.out.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FindBookmarkResDto {
    private Long bookmarkId;
    private Long streamerId;
    private String name;
    private Character platform;
    private String profileUrl;
    private Integer followerCnt;
    private Boolean isLive;
}
