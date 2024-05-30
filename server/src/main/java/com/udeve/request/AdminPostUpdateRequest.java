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

import com.udeve.entity.Fitment;
import lombok.Data;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;

@Data
public class AdminPostUpdateRequest implements Serializable {

    public Integer adminUserId;
    public Float areaMax;
    public Float areaMin;
    public Float averagePrice;
    public Float averagePriceMax;
    public List<Integer> brokerIds;
    public List<Integer> catIds;
//    public List<CatListVo> cats;
//    public AdminCityListVo city;
    public Integer cityId;
    public Boolean commentEnable;
    public Integer commentNums;
    public Integer companyId;

    public String cover;
//    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
//    public LocalDateTime createdAt;
    public Integer detailContentId;
    public Integer detailId;
//    public AdminDistrictListVo district;
    @DecimalMin(value = "0", message = "请选择区域")
    public Integer districtId;
    public Integer externalId;
    public Fitment fitment;
    @DecimalMin(value = "0", message = "请选择装修")
    public Integer fitmentId;
    public String flashImage;
//    public Integer id;
//    public Boolean isDelete;
    public Boolean isPublic;
    public Boolean isTop;
    public Float latitude;
    public Integer likeNums;
    public Integer likeNumsBase;
    public Float longitude;
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
    @DecimalMin(value = "0", message = "请选择销售状态")
    public Integer saleStatusItemId;
//    public SaleStatusItem saleStatusItem;
    public Integer searchNums;
    public String shareTitle;
    public String sourceUrl;
    public String street;
    @Size(max = 6, message = "分机号长度不能超过6位")
    public String subPhone;
    public List<Integer> tagIds;
    public Integer teamId;
    @Size(min = 3, max = 50, message = "标题长度为3-30个字符")
    public String title;
    public Float totalPriceMax;
    public Float totalPriceMin;
    public Boolean unknowPrice;
    public Boolean unknowTotalPrice;
    public Boolean unknowArea;
//    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
//    public LocalDateTime updatedAt;
    public Integer userId;
    public Integer viewNums;
    public Integer viewNumsBase;

}
