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
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
public class AdminPostBannerCreateRequest implements Serializable {

    @NotBlank(message = "图片不能为空")
    @Schema(description = "图片", example = "https://www.baidu.com/img/bd_logo1.png")
    public String image;
    @NotBlank(message = "分类不能为空")
    @Schema(description = "轮播图类型", example = "image")
    public String cat;
    @Schema(description = "catName", example = "catName")
    public String catName;

    @Schema(description = "url", example = "https://www.baidu.com")
    public String url;

    @Schema(description = "备注", example = "备注")
    public String remark;

    @NotNull(message = "postId不能为空")
    @Schema(description = "所属楼盘Id", example = "1")
    public Integer postId;
    @DecimalMin(value = "0",message = "排序必须大于等于0")
    @Schema(description = "排序", example = "1")
    public Integer number;
}
