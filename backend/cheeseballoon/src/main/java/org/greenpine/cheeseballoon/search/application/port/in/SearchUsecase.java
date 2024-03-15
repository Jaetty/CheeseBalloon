package org.greenpine.cheeseballoon.search.application.port.in;

import org.greenpine.cheeseballoon.search.application.port.out.dto.FindSearchLiveResDto;
import org.greenpine.cheeseballoon.search.application.port.out.dto.FindSearchStreamerResDto;

import java.util.List;

public interface SearchUsecase {

    List<FindSearchStreamerResDto> searchStreamer(String query);
    List<FindSearchLiveResDto> searchLive(String query);

}
