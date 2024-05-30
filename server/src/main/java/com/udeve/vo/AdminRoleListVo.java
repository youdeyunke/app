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
import java.util.List;

@Data
public class AdminRoleListVo implements Serializable {

    @Schema(description = "id", example = "1")
    public Integer id;
    @Schema(description = "名称", example = "名称")
    public String name;
    @Schema(description = "是否启用", example = "true")
    public Boolean enable;
    @Schema(description = "图标", example = "https://www.baidu.com")
    public String icon;
    @Schema(description = "颜色", example = "#000000")
    public String color;
    @Schema(description = "key", example = "key")
    public String key;
    @Schema(description = "创建时间", example = "2020-01-01 00:00:00")
    public LocalDateTime createdAt;
    @Schema(description = "更新时间", example = "2020-01-01 00:00:00")
    public LocalDateTime updatedAt;
    @Schema(description = "权限列表", example = "权限列表")
    public List<AdminPermissionListVo> permissionItems;

}
