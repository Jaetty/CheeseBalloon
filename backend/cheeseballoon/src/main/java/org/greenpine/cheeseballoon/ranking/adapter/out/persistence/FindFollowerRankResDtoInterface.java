package org.greenpine.cheeseballoon.ranking.adapter.out.persistence;

public interface FindFollowerRankResDtoInterface {

    Integer getRank();
    Long getStreamerId();
    String getName();
    Character getPlatform();
    String getProfileUrl();
    Integer getFollower();
    Boolean getBookmark();

}
