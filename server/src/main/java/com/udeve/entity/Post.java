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

import cn.hutool.core.util.ObjectUtil;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = Post.TABLE_NAME)
@Data
public class Post {
    public static final String TABLE_NAME = "posts";

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @JsonIgnoreProperties(value = {"posts"})
    @ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinTable(name = "post_cats", joinColumns = {@JoinColumn(name = "post_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "cat_id", referencedColumnName = "id")})
    public List<CatEntity> cats;

    @JsonIgnoreProperties(value = {"posts"})
    @ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinTable(name = "album_posts", joinColumns = {@JoinColumn(name = "post_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "album_id", referencedColumnName = "id")})
    public List<Album> albums;

    @JsonIgnoreProperties(value = {"posts"})
    @ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinTable(name = "post_tags", joinColumns = {@JoinColumn(name = "post_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "tag_id", referencedColumnName = "id")})
    public List<TagEntity> tags;

    public String title;

    public String street;

    public String shareTitle;

    @Column(precision = 18, scale = 15)
    public Float latitude;

    @Column(precision = 18, scale = 15)
    public Float longitude;

    public Float averagePrice = Float.valueOf(0.0F);

    public Float averagePriceMax = Float.valueOf(0.0F);

    public Float totalPriceMin = Float.valueOf(0.0F);

    public Float totalPriceMax = Float.valueOf(0.0F);

    public Float areaMax = Float.valueOf(0.0F);

    public Float areaMin = Float.valueOf(0);

    public Boolean unknowPrice = Boolean.FALSE;

    public Boolean unknowTotalPrice = Boolean.FALSE;

    public Boolean unknowArea = Boolean.FALSE;

    public Integer likeNumsBase = (Integer) 0;

    public Integer viewNumsBase = (Integer) 0;

    public Integer likeNums = (Integer) 0;

    public Integer viewNums = (Integer) 0;

    public Integer qaNums = (Integer) 0;

    public Integer commentNums = (Integer) 0;

    public String phone;

    public String subPhone;

    public String cover;

    public String qr;

    public Boolean isDelete = Boolean.FALSE;

    public Boolean isPublic = Boolean.FALSE;

    public Boolean isTop = Boolean.FALSE;

    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public LocalDateTime createdAt;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public LocalDateTime updatedAt;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "city_id")
    public City city;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "district_id")
    public DistrictEntity district;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sale_status_item_id")
    public SaleStatusItem saleStatusItem;

    // 关联到 fitments 表(Fitment)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fitment_id")
    public Fitment fitment;


    public Integer metaContentId;

    public Integer detailContentId;

    public String pointTitle;

    public Integer searchNums = Integer.valueOf(0);

    public Integer adminUserId;

    public String mapTabs;

    public String flashImage;

    public String remark;

    public Boolean reviewEnable;


    @Transient
    public JSONObject areaInfo;
    @Transient
    public JSONObject averagePriceInfo;
    @Transient
    public JSONObject totalPriceInfo;

    public String getAddress() {
        return this.street;
    }

    public JSONObject getAveragePriceInfo() {
        JSONObject info = new JSONObject();
        info.put("label", "参考均价");
        if (this.unknowPrice) {
            info.put("text", "待定");
            info.put("px", "");
            return info;
        }
        info.put("px", "元/㎡");
        info.put("text", "%s~%s".formatted(this.averagePrice, this.averagePriceMax));
        return info;
    }

    public JSONObject getTotalPriceInfo() {
        JSONObject info = new JSONObject();
        info.put("label", "参考总价");
        info.put("px", "");
        info.put("text", "待定");
        if(this.unknowTotalPrice){
            return info;
        }
        info.put("px", "万");

        if(ObjectUtil.equals(this.totalPriceMax, this.totalPriceMin)) {
            info.put("text", "%s".formatted(this.totalPriceMax));
            return info;
        }
        info.put("text", "%s~%s".formatted(this.totalPriceMin, this.totalPriceMax));
        return info;
    }

    public JSONObject getAreaInfo() {
        JSONObject info = new JSONObject();
        info.put("label", "参考面积");
        info.put("px", "");
        info.put("text", "待定");
        if(this.unknowArea){
            return info;
        }
        info.put("px", "㎡");

        if(ObjectUtil.equals(this.areaMax, this.areaMin)) {
            info.put("text", "%s".formatted(this.areaMax));
            return info;
        }
        info.put("text", "%s~%s".formatted(this.areaMin, this.areaMax));
        return info;
    }

}
