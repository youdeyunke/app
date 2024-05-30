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

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = PostType.TABLE_NAME)
public class PostType {
    public static final String TABLE_NAME = "types";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    public String name;

    public Integer s;

    public Integer t;

    public Integer w;

    @Column(name = "`desc`")
    public String desc;

    public Integer postId;

    public String position;

    public Float area;

    public Integer number;

    public Float totalPrice;

    public Integer averagePrice;

    public Boolean unknowPrice = false;

    public String tags;

    @Column(nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime createdAt;

    @Column(nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime updatedAt;

    public Integer saleStatusItemId;
    @ManyToOne
    @JoinColumn(name = "saleStatusItemId",insertable = false, updatable = false)
    public SaleStatusItem saleStatusItem;

    @Column(nullable = false)
    public String postTitle;

    public String vr;

    public String mainTag;

    public String images;

}
