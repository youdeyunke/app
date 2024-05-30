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

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;

@Data
public class WeappNewCatVo implements Serializable {

    @Schema(description = "分类id", example = "1")
    public Integer id;
    @Schema(description = "分类名称", example = "分类名称")
    public String name;
    @Schema(description = "是否公开", example = "true")
    public Boolean isPublic;
    @Schema(description = "排序", example = "0")
    public Integer number;
    @Schema(description = "网络icon地址", example = "http://www.baidu.com/icon.png")
    public String icon;

}
