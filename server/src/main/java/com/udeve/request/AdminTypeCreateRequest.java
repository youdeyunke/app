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

import lombok.Data;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
public class AdminTypeCreateRequest implements Serializable {

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
    public String desc;
    public String images;

    @NotNull(message = "楼盘不能为空")
    public Integer postId;
    @NotBlank(message = "朝向不能为空")
    public String position;
    @NotNull(message = "面积不能为空")
    @DecimalMin(value = "0", message = "面积不能小于0")
    public Float area;
//    public Integer number;
    public Float totalPrice;
    public Integer averagePrice;
    public Boolean unknowPrice;
    public String tags;

    @NotNull(message = "请选择销售状态")
    @DecimalMin(value = "0", message = "请选择销售状态")
    public Integer saleStatusItemId;
    public String vr;
    public String mainTag;
}
