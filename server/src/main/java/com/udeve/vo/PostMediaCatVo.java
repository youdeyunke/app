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
public class PostMediaCatVo implements Serializable {
    public String name;
    public String cover = "https://qiniucdn.udeve.net/fang/pkgPost/image-none.png"; // TODO 设置一张默认封面图
    public String url;
    public Integer id;
    public Integer targetId;
    public String targetType;
    public Integer number;

    public String getUrl(){
        return "/pkgXiangce/pages/xiangce/index?target_id=" +this.getTargetId() +"&target_type=" +this.getTargetType();
    }
}
