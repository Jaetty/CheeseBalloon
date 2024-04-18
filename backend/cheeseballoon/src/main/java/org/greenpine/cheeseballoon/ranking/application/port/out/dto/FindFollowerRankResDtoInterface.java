package org.greenpine.cheeseballoon.ranking.application.port.out.dto;

public interface FindFollowerRankResDtoInterface {

    Integer getRank();
    Long getStreamerId();
    String getName();
    Character getPlatform();
    String getProfileUrl();
    Integer getFollower();
    Boolean getBookmark();

}
