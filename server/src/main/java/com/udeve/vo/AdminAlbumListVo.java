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

import javax.persistence.Column;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class AdminAlbumListVo implements Serializable {

    @Schema(description = "id", example = "1")
    public Integer id;
    @Schema(description = "分类名称", example = "分类名称")
    public String name;
    @Schema(description = "分类key", example = "分类key")
    public String key;
    @Schema(description = "分类封面", example = "分类封面")
    public String cover;
    @Schema(description = "分类cat", example = "分类cat")
    public String cat;
    @Schema(description = "分类title", example = "分类title")
    public String title;
    @Schema(description = "分类排序", example = "0")
    public Integer number;
    @Schema(description = "分类创建时间", example = "2020-01-01 00:00:00")
    public LocalDateTime createdAt;
    @Schema(description = "分类更新时间", example = "2020-01-01 00:00:00")
    public LocalDateTime updatedAt;
    @Schema(description = "是否可以删除", example = "true")
    public Boolean canDelete;
    @Schema(description = "分类详细信息", example = "分类详细信息")
    public String content;
    @Schema(description = "分类code", example = "分类code")
    public String code;
    @Schema(description = "分类下楼盘数量", example = "10")
    public Integer postCount;
    @Schema(description = "分类下楼盘id", example = "[1,2,3]")
    public List<Integer> postIds;

}
