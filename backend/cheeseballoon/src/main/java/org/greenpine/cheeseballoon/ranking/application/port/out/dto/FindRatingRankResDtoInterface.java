package org.greenpine.cheeseballoon.ranking.application.port.out.dto;

public interface FindRatingRankResDtoInterface {

    Integer getRank();
    Long getStreamerId();
    String getName();
    Character getPlatform();
    String getProfileUrl();
    Double getRating();
    Boolean getBookmark();

}
