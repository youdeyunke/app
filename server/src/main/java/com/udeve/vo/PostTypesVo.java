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

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.udeve.entity.SaleStatusItem;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Data
public class PostTypesVo implements Serializable {
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

    public List<JSONObject> metaList;

    public List<JSONObject> getMetaList() {
        JSONObject meta1 = new JSONObject();
        meta1.put("label", "总价");
        if(this.unknowPrice){
            meta1.put("value", "待定");
        }else{
            meta1.put("value", totalPrice.toString() + "万/套");
        }
        meta1.put("color", "#FF0000");
        JSONObject meta2 = new JSONObject();
        meta2.put("label", "面积");
        meta2.put("value", area.toString() + "㎡");
        JSONObject meta3 = new JSONObject();
        meta3.put("label", "贷款");
        meta3.put("value", "房贷计算器");
        meta3.put("url", "/pkgJisuanqi/pages/daikuan/index");
        meta3.put("is_link", true);

        // 将meta列表返回
        return List.of(meta1, meta2, meta3);
    }

    public List<String> getImagesList() {
        return Arrays.asList(this.images.split(","));
    }

}
