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
public class AdminPostReviewListVo implements Serializable {
    @Schema(description = "id", example = "1")
    public Integer id;
    @Schema(description = "评测点", example = "评测点")
    public String name;
    @Schema(description = "评分", example = "5.0")
    public Float score;
    @Schema(description = "摘要", example = "xxxxxxx")
    public String content;
    @Schema(description = "评测简介", example = "xxxxxxx")
    public String remark;
    @Schema(description = "图标", example = "https://www.baidu.com/img/bd_logo1.png")
    public String icon;
    @Schema(description = "楼盘id", example = "9")
    public Integer postId;
}
