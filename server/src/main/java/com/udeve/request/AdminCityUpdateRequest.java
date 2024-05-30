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
public class AdminCityUpdateRequest implements Serializable {

    @Schema(description = "城市名称", example = "北京")
    public String name;
    @NotNull(message = "是否公开不能为空")
    @Schema(description = "是否公开", example = "true")
    public Boolean isPublic;
    @Schema(description = "adcode", example = "110000")
    public Integer adcode;

    public Integer homePageId;

}
