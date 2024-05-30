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
public class AdminPermissionCreateRequest implements Serializable {

    @NotBlank(message = "title不能为空")
    @Schema(description = "菜单标题", example = "楼盘管理")
    public String title;
    @Schema(description = "菜单图标", example = "el-icon-s-home")
    public String icon;
    @Schema(description = "菜单路径", example = "/home")
    public String path;
    @Schema(description = "组件路径", example = "/home")
    public String componentPath;

    @Schema(description = "组件名称", example = "home")
    public String componentName;
    @NotNull(message = "hidden不能为空")
    @Schema(description = "是否隐藏", example = "true")
    public Boolean hidden;
    @NotBlank(message = "cat不能为空")
    @Schema(description = "菜单cat", example = "cat")
    public String cat;
    @DecimalMin(value = "0",message = "order不能小于0")
    @Schema(description = "菜单排序", example = "10")
    public Integer order;
//    @NotNull(message = "fatherId不能为空")
    public Integer fatherId;
    @Schema(description = "菜单key", example = "home")
    public String key;
    @NotNull(message = "enable不能为空")
    @Schema(description = "是否启用", example = "true")
    public Boolean enable;
    @Schema(description = "重定向", example = "/home")
    public String redirect;

}
