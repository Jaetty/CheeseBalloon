package org.greenpine.cheeseballoon.ranking.adapter.out.persistence;

public interface FindRatingRankResDtoInterface {

    Integer getRank();
    Long getStreamerId();
    String getName();
    String getPlatform();
    String getProfileUrl();
    Double getRating();
    Boolean getBookmark();

}
