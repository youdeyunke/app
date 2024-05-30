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

@Data
public class AdminHouseCreateRequest implements Serializable {

    @NotBlank(message = "business不能为空")
    public String business;

    @NotNull(message = "cityId不能为空")
    public Integer cityId;

    @NotBlank(message = "Mobile不能为空")
    @Size(min = 11, max = 11, message = "Mobile长度必须为11")
    public String contactMobile;

    @NotBlank(message = "name不能为空")
    public String contactName;

    @NotNull(message = "城市区域不能为空")
    public Integer districtId;

    public String seller;

    @NotBlank(message = "小区不能为空")
    public String subDistrictName;

    @NotNull(message = "标题不能为空")
    public String title;

    public Float latitude;

    public Float longitude;

    @NotNull(message = "地址不能为空")
    public String address;

    @NotBlank(message = "朝向不能为空")
    public String position;

}
