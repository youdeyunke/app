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
public class AdminTypeUpdateRequest implements Serializable {

    @Schema(description = "户型名称", example = "户型名称")
    public String name;
    @NotNull(message = "户型不能为空")
    @DecimalMin(value = "0", message = "户型不能小于0")
    public Integer s;
    @NotNull(message = "户型不能为空")
    @DecimalMin(value = "0", message = "户型不能小于0")
    public Integer t;
    @NotNull(message = "户型不能为空")
    @DecimalMin(value = "0", message = "户型不能小于0")
    public Integer w;
    @Schema(description = "户型详情", example = "户型详情")
    public String desc;
    @Schema(description = "户型图片", example = "https://cdn.udeve.cc/xxx.png")
    public String images;

    @NotNull(message = "楼盘不能为空")
    @Schema(description = "户型相关楼盘id", example = "188")
    public Integer postId;
    @NotBlank(message = "朝向不能为空")
    @Schema(description = "户型朝向", example = "南")
    public String position;
    @NotNull(message = "面积不能为空")
    @DecimalMin(value = "0", message = "面积不能小于0")
    @Schema(description = "户型面积", example = "88")
    public Float area;
    @DecimalMin(value = "0", message = "面积不能小于0")
    @Schema(description = "户型总价", example = "1000")
    public Float totalPrice;
    @DecimalMin(value = "0", message = "面积不能小于0")
    @Schema(description = "户型均价", example = "100")
    public Integer averagePrice;
    @Schema(description = "户型价格未知", example = "true")
    public Boolean unknowPrice;
    @Schema(description = "户型标签", example = "户型标签")
    public String tags;

    @NotNull(message = "请选择销售状态")
    @DecimalMin(value = "0", message = "请选择销售状态")
    @Schema(description = "户型销售状态id", example = "11")
    public Integer saleStatusItemId;
    @Schema(description = "户型vr链接", example = "https://cdn.udeve.cc/xxx.png")
    public String vr;
    public String mainTag;
}
