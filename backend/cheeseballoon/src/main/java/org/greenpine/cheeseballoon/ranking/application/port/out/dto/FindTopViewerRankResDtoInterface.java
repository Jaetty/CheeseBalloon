package org.greenpine.cheeseballoon.ranking.application.port.out.dto;

public interface FindTopViewerRankResDtoInterface {

    Integer getRank();
    Long getStreamerId();
    String getName();
    Character getPlatform();
    String getProfileUrl();
    Integer getTopViewer();
    Boolean getBookmark();

}
