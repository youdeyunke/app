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
public class AdminPosterTemplateCreateRequest implements Serializable {


    @NotBlank(message = "名称不能为空")
    @Schema(description = "名称", example = "名称")
    public String name;
    @NotNull(message = "是否默认不能为空")
    @Schema(description = "是否默认", example = "true")
    public Boolean isDefault;
    @NotBlank(message = "背景图不能为空")
    @Schema(description = "背景图", example = "https://www.baidu.com/img/bd_logo1.png")
    public String bg;
    @NotBlank(message = "背景颜色不能为空")
    @Schema(description = "背景颜色", example = "#ffffff")
    public String fontColor;

    @Schema(description = "是否可删除", example = "true")
    public Boolean canDelete;

//    public Integer number;

}
