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
import com.udeve.entity.SaleStatusItem;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class AdminTypeListVo implements Serializable {
    @Schema(description = "户型id", example = "1")
    public Integer id;

    @Schema(description = "户型名称", example = "户型名称")
    public String name;
    public Integer s;
    public Integer t;
    public Integer w;
    @Schema(description = "户型详情", example = "户型详情")
    public String desc;
    @Schema(description = "户型图片", example = "https://cdn.udeve.cc/xxx.png")
    public String images;
    @Schema(description = "户型图片列表", example = "[https://cdn.udeve.cc/xxx.png,https://cdn.udeve.cc/xxx.png]")
    public List<String> imagesList;
    @Schema(description = "户型相关楼盘id", example = "188")
    public Integer postId;
    @Schema(description = "户型朝向", example = "南")
    public String position;
    @Schema(description = "户型面积", example = "88")
    public Float area;
    @Schema(description = "户型排序", example = "1")
    public Integer number;
    @Schema(description = "户型总价", example = "100")
    public Float totalPrice;
    @Schema(description = "户型均价", example = "100元/㎡")
    public Integer averagePrice;
    @Schema(description = "户型价格未知", example = "true")
    public Boolean unknowPrice;
    @Schema(description = "户型标签", example = "户型标签")
    public String tags;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Schema(description = "创建时间", example = "2020-01-01 00:00:00")
    public LocalDateTime createdAt;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Schema(description = "更新时间", example = "2020-01-01 00:00:00")
    public LocalDateTime updatedAt;

    @Schema(description = "户型销售状态id", example = "11")
    public Integer saleStatusItemId;
    @Schema(description = "户型销售状态详情", example = "户型销售状态详情")
    public SaleStatusItem saleStatusItem;
    @Schema(description = "户型楼盘title", example = "户型楼盘title")
    public String postTitle;
    public String code;
    @Schema(description = "户型vr链接", example = "https://cdn.udeve.cc/xxx.png")
    public String vr;
    public String mainTag;
}
