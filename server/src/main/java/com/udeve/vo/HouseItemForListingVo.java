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
import com.fasterxml.jackson.annotation.JsonProperty;
import com.udeve.entity.City;
import com.udeve.entity.DistrictEntity;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
public class HouseItemForListingVo implements Serializable {
    public Integer id;
    public String title;
    public String cover;
    public String address;
    public String districtName;
    public String subDistrictName;
    public String priceLabel;
    public String priceUnit;
    public Float priceValue;
    public String typeName;
    public String content;

    public Integer userId;

    public String remark;
    public LocalDateTime updatedAt = LocalDateTime.now();

    public String business;

    public String seller;
    public String contactName;
    public String contactMobile;
    public String areaLabel;
    public Float areaValue;
    public String typeImage;
    public String internalId;

    // 对前端不直接返回图片字段，而是要根据其他字段进行拼接
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public String images;

    public JSONObject banners;

    public String fitment;
    public String video;
    public String vr;

    public String category;

    public BigDecimal longitude;
    public BigDecimal latitude;

    public Integer ruleId;
    public String position;

    // TODO 此处需要优化，应该设置成city的dto
    public DistrictEntity district;
    public AdminCityListVo city;

    public List<AdminTagListVo> tags;

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
