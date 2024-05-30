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
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 *  管理后台编辑房源详细信息的dto
 * **/

@AllArgsConstructor
@NoArgsConstructor
@Data
@Slf4j
@ApiModel(value = "管理后台编辑云存储设置的")
public class AdminHouseUpdateRequest implements Serializable {
    public Integer id;
    @Size(min = 3, max = 50, message = "标题长度必须为3-50")
    public String title;
    @Size(min = 5, message = "封面不能为空")
    public String cover;
    @Size(min = 2, message = "地址不能为空")
    public String address;
    public String publishStatus;
    public String priceLabel;
    public String priceUnit;
    public Float priceValue;
    public String typeName;
    public String content;
//    public Integer userId;
    public Integer adminUserId;
    public String remark;

//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
//    public LocalDateTime updatedAt = LocalDateTime.now();

    public String business;

    public String seller;
    public String contactName;
    public String contactMobile;
    //public String areaLabel;  // label不被修改，是数据入库的时候自动生成的
    public Float areaValue;
    public String typeImage;
    public String internalId;
    public String images;
    public String fitment;
    public String video;
    public String vr;

    public String category;

    @DecimalMin(value = "0", message = "请选择地址")
    public BigDecimal longitude;
    @DecimalMin(value = "0", message = "请选择地址")
    public BigDecimal latitude;

    public String position;
    public String area;

    public Integer cityId;
    public Integer districtId;
    @NotBlank(message = "小区不能为空")
    public String subDistrictName;

    public String  tags;

    public Integer getCityId() {
        return cityId==null?1:cityId;
    }

    public Integer getDistrictId() {
        return districtId==null?1:districtId;
    }
}
