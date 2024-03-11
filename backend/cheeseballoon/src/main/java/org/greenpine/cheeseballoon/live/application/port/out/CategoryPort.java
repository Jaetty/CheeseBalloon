package org.greenpine.cheeseballoon.live.application.port.out;

import org.greenpine.cheeseballoon.live.application.port.out.dto.FindCategoriesResDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindHotCategoriesResDto;

public interface CategoryPort {
    FindCategoriesResDto findCategories(String query);
    FindHotCategoriesResDto findHotCategories(int limit);
}
