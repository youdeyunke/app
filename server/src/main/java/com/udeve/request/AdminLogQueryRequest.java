package com.udeve.request;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Data
public class AdminLogQueryRequest extends CommonRequest{
    public  String dateRange;


    public List<LocalDateTime> getDates(){
        String[] dates = dateRange.split(",");
        List<LocalDateTime> dateList = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        for (String date : dates) {
            LocalDate localDate = LocalDate.parse(date,formatter);
            dateList.add(LocalDateTime.of(localDate, LocalTime.MIDNIGHT));
        }
        return dateList;
    }
}
