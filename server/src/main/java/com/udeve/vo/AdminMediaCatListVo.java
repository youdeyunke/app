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

import javax.persistence.Column;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class AdminMediaCatListVo implements Serializable {

    @Schema(description = "id", example = "1")
    public Integer id;
    @Schema(description = "名称", example = "名称")
    public String name;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Schema(description = "创建时间", example = "2020-01-01 00:00:00")
    public LocalDateTime createdAt;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Schema(description = "更新时间", example = "2020-01-01 00:00:00")
    public LocalDateTime updatedAt;
    @Schema(description = "排序", example = "1")
    public Integer number;
    @Schema(description = "封面id", example = "1")
    public Integer coverId;
    @Schema(description = "相册图片数量", example = "8")
    public Integer itemsCount;
    @Schema(description = "相册类型", example = "楼盘")
    public String targetType;
    @Schema(description = "相册类型id", example = "1")
    public Integer targetId;
    @Schema(description = "是否系统相册", example = "true")
    public Boolean isSystem;

}
