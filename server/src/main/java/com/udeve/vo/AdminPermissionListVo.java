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
import java.time.LocalDateTime;

@Data
public class AdminPermissionListVo implements Serializable {

    @Schema(description = "id", example = "1")
    public  Integer id;
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

    @Schema(description = "是否隐藏", example = "true")
    public Boolean hidden;
    @Schema(description = "菜单cat", example = "cat")
    public String cat;
    @Schema(description = "菜单排序", example = "10")
    public Integer order;
    @Schema(description = "父级菜单id", example = "1")
    public Integer fatherId;
    @Schema(description = "菜单key", example = "home")
    public String key;
    @Schema(description = "创建时间", example = "2020-01-01 00:00:00")
    public LocalDateTime createdAt;
    @Schema(description = "更新时间", example = "2020-01-01 00:00:00")
    public LocalDateTime updatedAt;
    @Schema(description = "是否启用", example = "true")
    public Boolean enable;

    @Schema(description = "重定向", example = "/home")
    public String redirect;


}
