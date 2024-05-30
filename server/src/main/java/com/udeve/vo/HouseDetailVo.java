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

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.udeve.vo.AdminTagListVo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.udeve.entity.City;
import com.udeve.entity.DistrictEntity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 *  管理后台编辑房源详细信息的dto
 * **/

@AllArgsConstructor
@NoArgsConstructor
@Data
public class HouseDetailVo implements Serializable {
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
    public String url;

    public String category;

    public BigDecimal longitude;
    public BigDecimal latitude;

    public Integer ruleId;
    public String position;

    public AdminDistrictListVo district;
    public AdminCityListVo city;

    public List<AdminTagListVo> tags;
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

    public JSONObject getBanners(){
        // 返回详情页顶部图片
        JSONObject bannersObj = new JSONObject();
        JSONArray bannerList = new JSONArray();
        JSONArray catList = new JSONArray();

        if(this.vr != null && !("").equals(this.vr) && this.vr.startsWith("https")){
            JSONObject bannerItem  = new JSONObject();
            JSONObject catItem  = new JSONObject();

            bannerItem.put("cat", "vr");
            bannerItem.put("image", this.cover);
            bannerItem.put("url", this.vr);

            catItem.put("name", "VR");
            catItem.put("value", "vr");

            bannerList.add(bannerItem);
            catList.add(catItem);
        }


        if(this.typeImage != null && !("").equals(this.typeImage)){
            JSONObject bannerItem  = new JSONObject();
            JSONObject catItem  = new JSONObject();

            bannerItem.put("cat", "type");
            bannerItem.put("image", this.typeImage);

            catItem.put("name", "户型");
            catItem.put("value", "type");

            bannerList.add(bannerItem);
            catList.add(catItem);
        }

        if(this.video != null && !("").equals(this.video)){
            JSONObject bannerItem  = new JSONObject();
            JSONObject catItem  = new JSONObject();
            bannerItem.put("cat", "video");
            bannerItem.put("image", this.cover);
            bannerItem.put("url", this.video);

            catItem.put("name", "视频");
            catItem.put("value", "video");

            bannerList.add(bannerItem);
            catList.add(catItem);
        }

        List<String> imageList = this.getImageList();
        for(String image : imageList){
            JSONObject bannerItem  = new JSONObject();

            bannerItem.put("cat", "image");
            bannerItem.put("image", image);

            bannerList.add(bannerItem);
        }
        if(imageList.size() > 0){
            JSONObject catItem  = new JSONObject();
            catItem.put("name", "图片");
            catItem.put("value", "image");

            catList.add(catItem);
        }
        bannersObj.put("banners", bannerList);
        bannersObj.put("cats", catList);
        return bannersObj;
    }

}
