package com.udeve.entity;
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

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = House.TABLE_NAME)
public class House {
    public static final String TABLE_NAME = "houses";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Column(name = "title")
    public String title;

    /**
     * 二维码
     */
    public String qr;

    public Integer adminUserId;

    public Integer userId;

//    public Integer companyId;

    public Boolean isPublic = false;

    public Boolean isDelete = false;

    public String publishStatus = "审核中";

    public Boolean isTop = false;

    public Integer favNums = 0;

    public Integer viewNums = 0;

    public Integer searchNums = 0;

    public Integer refreshAt = 0;

    @Column(nullable = false)
    public LocalDateTime createdAt;

    @Column(nullable = false)
    public LocalDateTime updatedAt;

    /**
     * 房源列表显示的封面图片
     */
    public String cover;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="city_id")
    public City city;

    public Integer getCityId(){
        return this.city == null ? null : this.city.id;
    }

    public Integer getDistrictId(){
        return this.district == null ? null : this.district.id;
    }

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="district_id")
    public DistrictEntity district;

    private Boolean isPublished(){
        return this.publishStatus.equals("已发布");
    }

    /**
     * 内部编号
     */
    public String internalId;

    public String subDistrictName;

    /**
     * 挂售方式：经纪人、业主
     */
    public String seller;

    public LocalDate pubDate;

    public String address;

    @Column(precision = 18, scale = 15)
    public BigDecimal latitude;

    @Column(precision = 18, scale = 15)
    public BigDecimal longitude;

    /**
     * 价格名称：总价、单价、月租
     */
    public String priceLabel;

    /**
     * 价格数字
     */
    public Float priceValue;

    /**
     * 价格单位
     */
    public String priceUnit;

    public String typeName;

    public String category;

    /**
     * 字符串标签，逗号分割
     */
    public String tags;

    /**
     * 交易类型：出售、出租
     */
    public String business;

    /**
     * 朝向
     */
    @Column(nullable = false)
    public String position;

    public String video;

    public String vr;

    /**
     * 审核状态：审核中、已发布、未通过、已下架、已成交
     */
    /**
     * 装修情况
     */
    public String fitment;

    public String contactName;

    public String contactMobile;

    public String areaLabel;

    public String getAreaLabel() {
        return this.areaLabel == null ? "套内面积" : this.areaLabel;
    }

    public Float areaValue;

    public String typeImage;

    public String remark;


    public String content;

    public String images;

}
