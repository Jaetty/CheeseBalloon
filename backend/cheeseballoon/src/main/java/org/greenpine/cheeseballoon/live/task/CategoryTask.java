package org.greenpine.cheeseballoon.live.task;

import org.greenpine.cheeseballoon.live.adapter.out.persistence.CategoryEntity;
import org.greenpine.cheeseballoon.live.adapter.out.persistence.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategoryTask {
    @Autowired
    private CategoryRepository categoryRepository;
    @Scheduled(cron = "0 0 12 * * ?") // run at 12 PM every day
    public void runTask() {
        // add your task logic here
        List<CategoryEntity> entities = categoryRepository.findAllByChosungIsNull();
        for(CategoryEntity entity : entities){
            System.out.println(entity.getCategory());
        }

    }
}
