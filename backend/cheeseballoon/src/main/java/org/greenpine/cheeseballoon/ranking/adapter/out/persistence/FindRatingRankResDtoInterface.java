package org.greenpine.cheeseballoon.ranking.adapter.out.persistence;

public interface FindRatingRankResDtoInterface {

    Integer getRank();
    Long getStreamerId();
    String getName();
    Character getPlatform();
    String getProfileUrl();
    Double getRating();
    Boolean getBookmark();

}
