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

import lombok.Data;
import com.udeve.entity.Fitment;
import com.udeve.entity.SaleStatusItem;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class AdminPostDetailVo implements Serializable {

    public Integer adminUserId;
    public Float areaMax;
    public Float areaMin;
    public Float averagePrice;
    public Float averagePriceMax;
    public List<Integer> brokerIds;
    public List<Integer> catIds;
    public List<CatListVo> cats;
    public AdminCityListVo city;
    public Integer cityId;
    public Boolean commentEnable;
    public Integer commentNums;
    public Integer companyId;
    public String cover;
    public LocalDateTime createdAt;
    public Integer detailContentId;
    public Integer detailId;
    public AdminDistrictListVo district;
    public Integer districtId;
    public Integer externalId;
    public Fitment fitment;
    public Integer fitmentId;
    public String flashImage;
    public Integer id;
    public Boolean isDelete;
    public Boolean isPublic;
    public Boolean isTop;
    public Double latitude;
    public Integer likeNums;
    public Integer likeNumsBase;
    public Double longitude;
    public String mapTabs;
    public Integer mediaCatId;
    public Integer metaContentId;
    public List<Integer> newsIds;
    public String phone;
    public String pointTitle;
    public Boolean qaEnable;
    public Integer qaNums;
    public String qr;
    public String remark;
    public Integer saleStatusItemId;
    public SaleStatusItem saleStatusItem;
    public Integer searchNums;
    public String shareTitle;
    public String sourceUrl;
    public String street;
    public String subPhone;
    public List<Integer> tagIds;
    public Integer teamId;
    public String title;
    public Float totalPriceMax;
    public Float totalPriceMin;
    public Boolean unknowPrice;
    public Boolean unknowTotalPrice;
    public Boolean unknowArea;
    public LocalDateTime updatedAt;
    public Integer userId;
    public Integer viewNums;
    public Integer viewNumsBase;
    public Boolean reviewEnable;

}
