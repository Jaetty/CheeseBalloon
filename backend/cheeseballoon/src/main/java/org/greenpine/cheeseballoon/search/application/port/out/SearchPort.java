package org.greenpine.cheeseballoon.search.application.port.out;

import org.greenpine.cheeseballoon.search.application.port.out.dto.FindSearchLiveResDto;

import java.util.List;

public interface SearchPort {

    List<FindSearchLiveResDto> findStreamers(String query);
    List<FindSearchLiveResDto> findLives(String query);
}
