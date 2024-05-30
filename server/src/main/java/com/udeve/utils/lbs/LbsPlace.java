package com.udeve.utils.lbs;

import lombok.Data;

import java.io.Serializable;

@Data
public class LbsPlace implements Serializable {

    public String id;
    public String title;
    public String address;
    public String category;
    public Integer type;
    public Integer adcode;

    public String province;
    public String city;
    public String district;
    public LbsLocation location;

}
