package org.greenpine.cheeseballoon.ranking.adapter.out.persistence;

public interface FindTopViewerRankResDtoInterface {

    Integer getRank();
    Long getStreamerId();
    String getName();
    Character getPlatform();
    String getProfileUrl();
    Integer getTopViewer();
    Boolean getBookmark();

}
