package org.greenpine.cheeseballoon.streamer.adapter.out.persistence;

public interface FindSummaryRankResDtoInterface {

    Integer getRank();
    Long getStreamerId();
    Integer getAverageViewer();
    Double getRating();
    Integer getTotalAirTime();
    Integer getTopViewer();
    Integer getFollower();

}
