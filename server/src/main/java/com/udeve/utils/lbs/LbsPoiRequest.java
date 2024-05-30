package com.udeve.utils.lbs;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
public class LbsPoiRequest implements Serializable {


    public String keyword = "小区";

    public String address_format = "";

    public String filter = "category=房产小区";
}
