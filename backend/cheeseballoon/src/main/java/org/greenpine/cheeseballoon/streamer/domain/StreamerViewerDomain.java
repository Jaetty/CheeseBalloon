package org.greenpine.cheeseballoon.streamer.domain;

import org.greenpine.cheeseballoon.streamer.application.port.out.dto.DailyAvgViewer;
import org.greenpine.cheeseballoon.streamer.application.port.out.dto.FindStreamerDailiyViewerResDtoInterface;

import java.util.ArrayList;
import java.util.List;

public class StreamerViewerDomain {

    public Integer getMaxValue(List<FindStreamerDailiyViewerResDtoInterface> input){
        Integer max = 0;
        if(!input.isEmpty()){
            for(FindStreamerDailiyViewerResDtoInterface var : input){
                max = Math.max(max,var.getMaxViewer());
            }
        }
        return max;
    }

    public Integer getAverageValue(List<FindStreamerDailiyViewerResDtoInterface> input){


        if(!input.isEmpty()){
            Integer sum = 0;
            int count = 0;

            for(FindStreamerDailiyViewerResDtoInterface var : input){
                sum += var.getViewer();
                count++;
            }

            return sum/count;
        }

        return 0;
    }

    public List<DailyAvgViewer> getDailyViewer(List<FindStreamerDailiyViewerResDtoInterface> input){

        List<DailyAvgViewer> result = new ArrayList<>();

        if(!input.isEmpty()){
            for(FindStreamerDailiyViewerResDtoInterface var : input){
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
