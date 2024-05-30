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
import lombok.Data;

import java.io.Serializable;
import java.util.Arrays;

@Data
public class NewQueryRequest  extends CommonRequest implements Serializable {
    public Integer postId;

    public Integer catId;
    public Boolean isTop;
    public String ids;

    public Integer[] getIdList(){
        if(this.ids == null || this.ids.isEmpty()){
            return null;
        }
        return Arrays.stream(splitValue(ids)).map(Integer::parseInt).toArray(Integer[]::new);
    }
    private String[] splitValue(String value){
        return value == null ? null : value.split(",");
    }
}
