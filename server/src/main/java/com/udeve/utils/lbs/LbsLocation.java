package com.udeve.utils.lbs;

import lombok.Data;

import java.io.Serializable;

@Data
public class LbsLocation implements Serializable {
    public Float lat;
    public Float lng;
}
