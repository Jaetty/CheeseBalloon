package org.greenpine.cheeseballoon.live.application.port.in;

import org.greenpine.cheeseballoon.live.application.port.out.dto.FindCategoriesResDto;
import org.greenpine.cheeseballoon.live.application.port.out.dto.FindHotCategoriesResDto;

public interface CategoryUsecase {
    FindCategoriesResDto findCategories(String query);
    FindHotCategoriesResDto findHotCategories(int limit);
}
