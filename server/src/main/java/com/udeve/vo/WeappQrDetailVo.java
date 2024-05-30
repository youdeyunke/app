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
import io.swagger.models.auth.In;
import lombok.Data;

import java.io.Serializable;

@Data
public class WeappQrDetailVo implements Serializable {

    public Integer id;
    public String path;
    public String title;
    public JSONObject data;

}
