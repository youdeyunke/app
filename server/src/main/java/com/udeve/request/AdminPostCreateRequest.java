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

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;

@Data
public class AdminPostCreateRequest implements Serializable {

    public Float areaMax = 0.0f;
    public Float areaMin = 0.0f;
    public Float averagePrice = 0.0f;
    public Float averagePriceMax = 0.0f;
    @NotNull(message = "请选择物业类型")
    public List<Integer> catIds;
    @NotBlank(message = "请选择楼盘封面")
    public String cover;
    @NotNull(message = "请选择区域")
    public Integer districtId;
    @NotNull(message = "请选择装修")
    public Integer fitmentId;
    public Boolean isPublic;
    public String mapTabs;
    public String phone;
    public String pointTitle;
    public String remark;
    @NotNull(message = "请选择销售状态")
    public Integer saleStatusItemId;
    public String street;
    @Size(max = 6, message = "分机号长度不能超过6位")
    public String subPhone;
    @NotNull(message = "请选择标签")
    public List<Integer> tagIds;
    public String theme;
    @NotBlank(message = "标题不能为空")
    public String title;
    public Float totalPriceMax = 0.0f;
    public Float totalPriceMin = 0.0f;
    public Integer viewNums;
    public Boolean unknowArea = false;
    public Boolean unknowPrice = false;
    public Boolean unknowTotalPrice = false;
    @NotNull(message = "纬度不能为空")
    public Float latitude;
    @NotNull(message = "经度不能为空")
    public Float longitude;

}
