package org.greenpine.cheeseballoon.ranking.adapter.out.persistence;

public interface FindAvgViewerRankResDtoInterface {

    Integer getRank();
    Long getStreamerId();
    String getName();
    Character getPlatform();
    String getProfileUrl();
    Integer getAverageViewer();
    Boolean getBookmark();

}
