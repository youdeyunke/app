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

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 小程序端发布二手房的dto
 * **/

@AllArgsConstructor
@NoArgsConstructor
@Data
@Slf4j
@ApiModel(value = "发布房源请求")
public class CreateHouseRequest implements Serializable {

    public String cover;

    @NotBlank(message = "标题不能为空")
    @Length(max = 30, message = "标题长度不能超过30个字符")
    public String title = "请填写标题";

    public String address;

    private String publishStatus = "审核中";

    private String priceLabel = "总价";

    private String priceUnit = "元";

    @NotBlank(message = "价格不能为空")
    public Float priceValue;

    public String typeName = "x室x厅";
    public String content = "请完善房源描述";
    public String subDistrictName = "小区名称";
    private Integer userId;

    public String business = "出售";

    public String seller = "业主";

    public String contactName;

    public String contactMobile;

    public String areaLabel = "建面";  // label不被修改，是数据入库的时候自动生成的

    public Float areaValue;

    public String typeImage;

    public String images;

    public String fitment = "精装";

    public String video;

    public String category = "住宅";

    public BigDecimal longitude;

    public BigDecimal latitude;

    public String position = "朝南";

    public String area = "0";

    @NotBlank(message = "区域不能为空")
    public Integer districtId;

    public String  tags = "";

    public LocalDateTime createdAt;

    public LocalDateTime updatedAt;

    public String getTitle() {
        return this.getTypeName() +this.getBusiness();
    }

    public String getPriceLabel() {
        switch (this.getBusiness()) {
            case "竞价":
                return "起拍价";
            case "出租":
                return "租金";
            case "出售":
                return "总价";
        }
        return "总价";
    }

    public String getPriceUnit(){
        switch (this.getBusiness()) {
            case "出租":
                return "元/月";
            default:
                return "万元";
        }
    }


    public LocalDateTime getCreatedAt() {
        return createdAt == null ?  LocalDateTime.now() : createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt == null ?  LocalDateTime.now() : updatedAt;
    }
}
