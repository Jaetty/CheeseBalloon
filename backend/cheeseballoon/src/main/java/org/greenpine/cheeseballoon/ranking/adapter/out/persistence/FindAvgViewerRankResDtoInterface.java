package org.greenpine.cheeseballoon.ranking.adapter.out.persistence;

public interface FindAvgViewerRankResDtoInterface {

    Integer getRank();
    Long getStreamerId();
    String getName();
    String getPlatform();
    String getProfileUrl();
    Integer getAverageViewer();
    Boolean getBookmark();

}
