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

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import com.udeve.entity.DetailContent;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class AdminNewUpdateRequest implements Serializable {

    @NotNull(message = "文章分类不能为空")
    @Schema(description = "文章分类id", example = "1")
    public Integer newsCatId;
    @NotBlank(message = "文章标题不能为空")
    @Schema(description = "文章标题", example = "文章标题")
    public String title;
    @NotBlank(message = "文章类型不能为空")
    @Schema(description = "文章类型", example = "文章类型")
    public String contentType;
    @NotBlank(message = "文章作者不能为空")
    @Schema(description = "作者", example = "作者")
    public String author;
    @NotBlank(message = "文章摘要不能为空")
    @Schema(description = "文章摘要", example = "摘要")
    public String summary;
    @NotBlank(message = "文章封面不能为空")
    @Schema(description = "文章封面", example = "封面")
    public String cover;
    @NotBlank(message = "作者头像不能为空")
    public String avatar;
    @Schema(description = "文章跳转url", example = "跳转url")
    public String url;
    @DecimalMin(value = "0", message = "浏览量不能小于0")
    @Schema(description = "浏览数", example = "0")
    public Integer viewNums;
    @DecimalMin(value = "0", message = "点赞量不能小于0")
    @Schema(description = "点赞数", example = "0")
    public Integer likeNums;

    public String source;
    @Schema(description = "文章内容", example = "内容")
    public String content;
    @Schema(description = "是否关联楼盘", example = "true")
    public Boolean hasPosts;
    @Schema(description = "是否置顶", example = "true")
    public Boolean isTop;
    @Schema(description = "是否公开", example = "true")
    public Boolean isPublic;
    @Schema(description = "详细内容id", example = "1")
    public Integer detailContentId;
    @JsonFormat(pattern="yyyy-MM-dd")
    @Schema(description = "日期", example = "2020-01-01 00:00:00")
    public LocalDate date;
    @Schema(description = "城市id", example = "1")
    public Integer cityId;
}
