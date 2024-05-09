package org.greenpine.cheeseballoon.streamer.domain;

import org.greenpine.cheeseballoon.streamer.application.port.out.dto.DailyAvgViewer;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindStreamerDailyViewerResDtoInterface;

import java.util.ArrayList;
import java.util.List;

public class StreamerViewerDomain {

    public Integer getMaxValue(List<FindStreamerDailyViewerResDtoInterface> input){
        Integer max = 0;
        if(!input.isEmpty()){
            for(FindStreamerDailyViewerResDtoInterface var : input){
                max = Math.max(max,var.getMaxViewer());
            }
        }
        return max;
    }

    public Integer getAverageValue(List<FindStreamerDailyViewerResDtoInterface> input){


        if(!input.isEmpty()){
            Integer sum = 0;
            int count = 0;

            for(FindStreamerDailyViewerResDtoInterface var : input){
                sum += var.getViewer();
                count++;
            }

            return sum/count;
        }

        return 0;
    }

    public List<DailyAvgViewer> getDailyViewer(List<FindStreamerDailyViewerResDtoInterface> input){

        List<DailyAvgViewer> result = new ArrayList<>();

        if(!input.isEmpty()){
            for(FindStreamerDailyViewerResDtoInterface var : input){
                DailyAvgViewer temp = new DailyAvgViewer();
                temp.setViewer(var.getViewer());
                temp.setDate(var.getDate());
                temp.setMaxViewer(var.getMaxViewer());
                result.add(temp);
            }
        }

        return result;

    }


}
