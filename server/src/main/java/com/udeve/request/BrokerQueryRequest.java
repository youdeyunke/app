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

import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import com.udeve.entity.BrokerProfile;

import java.io.Serializable;
import java.util.Arrays;

/**
 */
@Data
@Slf4j
@ApiModel(value="broker搜索查询条件参数")
public class BrokerQueryRequest implements  Serializable{
    public String  kw = null;
    public String ids = null;
    public String status;
    public String postId = null;

    public String order = "id desc";
    public Integer page = 1;
    public Integer perPage = 20;
    public String scope;

    // 置业顾问等级
    public Integer level;

    public Integer getPage(){
        return this.page == null ? 0 : this.page -1;
    }

    private String[] splitValue(String value){
        return value == null ? null : value.split(",");
    }

    public String getOrderField(){
       if(this.order == null || this.order == ""){
           return null;
       }
       return this.order.split(" ")[0];
    }

    public String getOrderDirection(){
         if(this.order == null || this.order == ""){
              return null;
         }
         return this.order.split(" ")[1];
    }

    public Integer[] getStatusList(){
        if(this.status == null || this.status == ""){
            return null;
        }
        return Arrays.stream(splitValue(status)).map(Integer::parseInt).toArray(Integer[]::new);
    }

    public Integer[] getPostIdList(){
        if(this.postId == null || this.postId == ""){
            return null;
        }
        return Arrays.stream(splitValue(postId)).map(Integer::parseInt).toArray(Integer[]::new);
    }

    public Integer[] getIdList(){
        if(this.ids == null || this.ids == ""){
            return null;
        }
        return Arrays.stream(splitValue(ids)).map(Integer::parseInt).toArray(Integer[]::new);
    }


    public Integer getPageSize() {
        return this.perPage == null ? 10 : this.perPage;
    }
}