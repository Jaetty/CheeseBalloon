package org.greenpine.cheeseballoon.ranking.application.port.out.dto;

public interface FindAvgViewerRankResDtoInterface {

    Integer getRank();
    Long getStreamerId();
    String getName();
    Character getPlatform();
    String getProfileUrl();
    Integer getViewerCnt();
    Integer getBookmark();

}
