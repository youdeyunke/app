package com.udeve.request;
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

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.io.Serializable;
import java.util.Arrays;

/**
 */
@Data
@Slf4j
@ApiModel(value="二手房搜索查询条件参数")
public class HouseSearchRequest implements  Serializable{
    public  String  kw;
    public  String  text;
    public  String  keyword;
    public  String  keyWord;

    @JsonProperty(value="city_id")
    public Integer cityId;

    public String business;

    @JsonProperty(value="district_id")
    public String districtId;

    public String category;
    public String fitment;
    public String position;
    public String ids;

    public String scope = "public"; // 默认值显示公开的楼盘
    public String order;
    public Integer page = 1;
    public Integer perPage;
    public Boolean isDelete = false;

    @JSONField(name = "type")
    public String typeName;

    public String publishStatus;

    public Integer getPage(){
        return this.page == null ? 0 : this.page -1;
    }

    public  void setKw(String text){
        this.kw = text.strip();
    }

    public void setText(String text){
        this.setKw(text);
    }

    public void setKeyword(String text){
        this.setKw(text);
    }

    private String[] splitValue(String value){
        return value == null ? null : value.split(",");
    }

    public void setKeyWord(String text){
        this.setKw(text);
    }

    public String[] getBusiness(){
        return splitValue(business);
    }

    public Integer[] getIds(){
        if(this.ids == null){
            return null;
        }
        return Arrays.stream(splitValue(ids)).map(Integer::parseInt).toArray(Integer[]::new);
    }

    public String[] getCategory(){
        return  splitValue(category);
    }

    public String[] getFitment(){
        return splitValue(fitment);
    }

    public String[] getPosition(){
        return splitValue(position);
    }

    public String[] getDistrictId(){
        return splitValue(districtId);
    }

    public String getScope() {
        return this.scope == null ? "public" : this.scope;
    }

    public Integer getPageSize() {
        return this.perPage == null ? 10 : this.perPage;
    }
}