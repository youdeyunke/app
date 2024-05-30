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

import javax.persistence.Column;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class AdminPostBannerListVo implements Serializable {
    @Schema(description = "id", example = "1")
    public Integer id;

    @Schema(description = "图片", example = "https://www.baidu.com/img/bd_logo1.png")
    public String image;

    @Schema(description = "轮播图类型", example = "image")
    public String cat;
    @Schema(description = "catName", example = "catName")
    public String catName;

    @Schema(description = "url", example = "https://www.baidu.com")
    public String url;

    @Schema(description = "备注", example = "备注")
    public String remark;

    @Schema(description = "创建时间", example = "2020-01-01 00:00:00")
    public LocalDateTime createdAt;

    @Schema(description = "更新时间", example = "2020-01-01 00:00:00")
    public LocalDateTime updatedAt;

    @Schema(description = "所属楼盘Id", example = "1")
    public Integer postId;

    @Schema(description = "排序", example = "1")
    public Integer number;
}
