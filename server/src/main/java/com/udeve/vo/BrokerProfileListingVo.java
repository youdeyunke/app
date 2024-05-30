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

import lombok.Data;

import java.io.Serializable;

@Data
public class BrokerProfileListingVo implements Serializable {
    public String avatar;
    public String name = "未填写";
    public Integer userId;
    public String mobile;
    public Integer level;
    public Integer postId;
    public String postTitle;
    public String qr;

    public String getMobile() {
        return this.mobile;
        // TODO 将用户手机号码中间四位替换为*
        //return this.mobile.replaceAll("(\\d{3})\\d{4}(\\d{4})", "$1****$2");
    }

}
