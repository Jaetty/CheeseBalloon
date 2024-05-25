package org.greenpine.cheeseballoon.ranking.adapter.out.persistence;

public interface FindTotalAirTimeRankResDtoInterface {

    Integer getRank();
    Long getStreamerId();
    String getName();
    String getPlatform();
    String getProfileUrl();
    Integer getTotalAirTime();
    Boolean getBookmark();

}
