package com.udeve.utils.lbs;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.lang.reflect.Field;
import java.util.Map;

public class QueryParamsUtil {
    // convert Object to queryString
    public static String toQs(Object object){
        // Object --> map
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = objectMapper.convertValue(object, Map.class);
        StringBuilder qs = new StringBuilder();
        for (String key : map.keySet()){

            if (map.get(key) == null){
                continue;
            }
            // key=value&
            qs.append(key);
            qs.append("=");
            qs.append(map.get(key));
            qs.append("&");
        }

        // delete last '&'
        if (qs.length() != 0) {
            qs.deleteCharAt(qs.length() - 1);
        }
        return qs.toString();
    }
}
