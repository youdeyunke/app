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

import cn.hutool.core.util.ObjectUtil;
import com.alibaba.fastjson.annotation.JSONField;
import lombok.Data;

import java.io.Serializable;
import java.util.Arrays;

/**
 */
@Data
public class PostQueryRequest implements  Serializable{
    public  String  kw;
    public Integer cityId;
    public Integer districtId;
    public String area;
    public String ids;
    public Integer tagId;
    public String tagIds;
    public Integer fitmentId;
    public Integer catId;
    public Integer albumId;
    public String totalPrice;
    public String averagePrice;
    public Integer limitType = 0;
    public Integer limit;
    public String scope;
    public String order;
    public Integer page;
    public Integer perPage;

    @JSONField(name = "type")
    public String typeName;

    public String[] getMinMaxArea(){
        if (this.area == null){
            return null;
        }
        String[] split = this.area.split(",");
        return split;
    }

    public String[] getAveragePrice(){
        if(this.averagePrice == null){
            return null;
        }
        String[] split = this.averagePrice.split(",");
        return split;
    }

    public String[] getTotalPrice(){
        if(this.totalPrice == null){
            return null;
        }
        String[] split = this.totalPrice.split(",");
        return split;
    }

    public Integer getPage(){
        return this.page == null ? 1 : this.page;
    }

    public String getScope() {
        return this.scope == null ? "public" : this.scope;
    }

    public Integer getPageSize() {
        return this.perPage == null ? 10 : this.perPage;
    }

    public Integer[] getIdList(){
        if(ObjectUtil.isEmpty(this.ids)){
            return null;
        }
        return Arrays.stream(splitValue(ids)).map(Integer::parseInt).toArray(Integer[]::new);
    }
    private String[] splitValue(String value){
        return value == null ? null : value.split(",");
    }
}