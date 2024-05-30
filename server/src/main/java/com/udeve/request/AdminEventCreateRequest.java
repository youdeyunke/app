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

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
public class AdminEventCreateRequest implements Serializable {

    @Schema(description = "内容", example = "内容")
    public String content;
    @NotNull(message = "楼盘id不能为空")
    @Schema(description = "楼盘id", example = "1")
    public Integer postId;
    @NotNull(message = "分类id不能为空")
    @Schema(description = "分类id", example = "1")
    public Integer catId;
    @NotBlank(message = "发布时间不能为空")
    @Schema(description = "发布时间", example = "2020-01-01 00:00:00")
    public String pubTime;
    @NotBlank(message = "标题不能为空")
    @Schema(description = "标题", example = "标题")
    public String title;
    @NotBlank(message = "作者不能为空")
    @Schema(description = "作者", example = "作者")
    public String author;

    @Schema(description = "图片", example = "图片")
    public String images;

    @NotNull(message = "发布状态不能为空")
    @Schema(description = "发布状态", example = "1")
    public Integer status;

    @Schema(description = "是否推送", example = "true")
    public Boolean pushEnable;
}
