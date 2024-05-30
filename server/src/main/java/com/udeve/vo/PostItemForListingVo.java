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

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.udeve.entity.SaleStatusItem;
import com.udeve.vo.AdminTagListVo;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.udeve.entity.City;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

/**
 * 用户向小程序端返回楼盘列表的数据结构
 * **/

@NoArgsConstructor
@Data
public class PostItemForListingVo {
    public Integer id;
    public String title;
    public String cover;
    public String address;
    public String districtName;
    public String street;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public AdminCityListVo city;

    public String cityName;
    public String qr;

    public Boolean hasVr = false;
    public Boolean hasVideo = false;
    public JSONObject pointsInfo;
    public String pointTitle;
    public Integer views;

    public List<AdminTagListVo> tags;

    public Float averagePrice = 0F;
    public Float averagePriceMax = 0F;
    public Float areaMax = 0F;
    public Float areaMin = 0F;
    public Float totalPriceMin = 0.0F;
    public Float totalPriceMax = 0.0F;
    public JSONObject areaInfo;
    public JSONObject averagePriceInfo;
    public JSONObject totalPriceInfo;
    public Float latitude;
    public Float longitude;

    public SaleStatusItemVo  saleStatusItem;

    public String phone;

    public String subPhone;

    public String flashImage;


    public String getCityName(){
        return this.city.getName();
    }

}
