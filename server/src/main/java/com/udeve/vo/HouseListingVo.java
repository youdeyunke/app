package com.udeve.vo;
/**
 * +----------------------------------------------------------------------
 * | 友得云客  - 开启房产营销新纪元
 * +----------------------------------------------------------------------
 * | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
 * +----------------------------------------------------------------------
 * | Licensed 友得云客不是自有软件 未经允许不可移除相关版权
 * +----------------------------------------------------------------------
 * | Author: www.youdeyunke.com
 * +----------------------------------------------------------------------
 */

import com.fasterxml.jackson.annotation.JsonProperty;
import com.udeve.vo.AdminTagListVo;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.udeve.entity.City;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 用户向小程序端返回楼盘列表的数据结构
 * **/

@NoArgsConstructor
@Data
public class HouseListingVo implements Serializable {
    public Integer id;
    public String title;
    public String cover;
    public String images;
    public String address;
    public String districtName;
    public String subDistrictName;
    public String priceLabel;
    public String priceUnit;
    public Float priceValue;
    public String areaLabel;
    public Float areaValue;
    public String typeName;
    public String business;
    public String publishStatus;
    public String position;
    public Integer favNums = 0;
    public Integer viewNums = 0;

    public String category;

    public String url;

    public String qr;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public AdminCityListVo city;

    public String cityName;
    public List<AdminTagListVo> tags;

    public String getCityName(){
        return this.city == null ? "" : this.city.getName();
    }

    public void setTags(String text){
        if(text == null || ("").equals(text)){
            return;
        }
        this.tags = Arrays.stream(text.split(",")).toList().stream().map(tag ->{
            AdminTagListVo adminTagListVo = new AdminTagListVo(tag);
            return adminTagListVo;
        }).collect(Collectors.toList());
    }

    public List<String> getImageList(){
        if(this.images==null || ("").equals(this.images)){
            return new ArrayList<>();
        }
        // 兼容逗号和|
        if(this.images.contains("|")) {
            return Arrays.stream(this.images.split("\\|")).toList();
        }
        if(this.images.contains(";")) {
            return Arrays.stream(this.images.split(";")).toList();
        }
        return Arrays.stream(this.images.split(",")).toList();
    }
}
