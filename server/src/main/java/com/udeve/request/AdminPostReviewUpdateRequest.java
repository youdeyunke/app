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
public class AdminPostReviewUpdateRequest implements Serializable {

    @NotBlank(message = "评测点不能为空")
    @Schema(description = "评测点", example = "评测点")
    public String name;
    @NotNull(message = "评分不能为空")
    @DecimalMin(value = "0.0", message = "评分不能小于0")
    @Schema(description = "评分", example = "5.0")
    public Float score;
    @NotBlank(message = "摘要不能为空")
    @Schema(description = "摘要", example = "xxxxxxx")
    public String content;
    @NotBlank(message = "评测简介不能为空")
    @Schema(description = "评测简介", example = "xxxxxxx")
    public String remark;
    @Schema(description = "图标", example = "https://www.baidu.com/img/bd_logo1.png")
    public String icon;
}
