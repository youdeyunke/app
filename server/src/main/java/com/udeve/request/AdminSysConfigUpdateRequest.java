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
public class AdminSysConfigUpdateRequest implements Serializable {

    @NotBlank(message = "key不能为空")
    @Schema(description = "key", example = "key")
    public String key;
    @NotBlank(message = "value不能为空")
    @Schema(description = "value", example = "value")
    public String value;
    @Schema(description = "描述", example = "描述")
    public String desc;
    @NotNull(message = "canDelete不能为空")
    @Schema(description = "是否可删除", example = "true")
    public Boolean canDelete;
    @Schema(description = "是否公开", example = "true")
    public Boolean isPublic;

}
