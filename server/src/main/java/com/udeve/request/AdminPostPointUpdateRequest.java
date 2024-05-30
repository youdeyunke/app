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
public class AdminPostPointUpdateRequest implements Serializable {
    @NotNull(message = "postId不能为空")
    @Schema(description = "楼盘id", example = "楼盘id")
    public Integer postId;
    @NotBlank(message = "name不能为空")
    @Schema(description = "楼盘名称", example = "楼盘名称")
    public String name;
    @Schema(description = "描述", example = "描述")
    public String desc;
    @NotBlank(message = "image不能为空")
    @Schema(description = "图片", example = "https://www.baidu.com/img/bd_logo1.png")
    public String image;
    @NotBlank(message = "icon不能为空")
    @Schema(description = "图标", example = "https://www.baidu.com/img/bd_logo1.png")
    public String icon;
}
