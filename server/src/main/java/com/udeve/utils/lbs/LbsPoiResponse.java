package com.udeve.utils.lbs;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class LbsPoiResponse implements Serializable {

    @JsonProperty("data")
    public List<LbsPlace> result;

    public Integer count;
    public String message;
    public Integer status;
    public String requestId;
}
