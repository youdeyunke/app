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

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class AdminPosterTemplateListVo implements Serializable {

    @Schema(description = "id", example = "1")
    public Integer id;
    @Schema(description = "名称", example = "名称")
    public String name;
    @Schema(description = "是否默认", example = "true")
    public Boolean isDefault;
    @Schema(description = "背景图", example = "https://www.baidu.com/img/bd_logo1.png")
    public String bg;
    @Schema(description = "字体颜色", example = "#ffffff")
    public String fontColor;

    public String cover;
    @Schema(description = "是否可删除", example = "true")
    public Boolean canDelete;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "创建时间", example = "2020-01-01 00:00:00")
    public LocalDateTime createdAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "更新时间", example = "2020-01-01 00:00:00")
    public LocalDateTime updatedAt;
    @Schema(description = "排序", example = "1")
    public Integer number;

}
