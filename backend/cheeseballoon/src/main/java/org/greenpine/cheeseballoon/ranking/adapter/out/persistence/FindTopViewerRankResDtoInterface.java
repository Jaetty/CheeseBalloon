package org.greenpine.cheeseballoon.ranking.adapter.out.persistence;

public interface FindTopViewerRankResDtoInterface {

    Integer getRank();
    Long getStreamerId();
    String getName();
    String getPlatform();
    String getProfileUrl();
    Integer getTopViewer();
    Boolean getBookmark();

}
