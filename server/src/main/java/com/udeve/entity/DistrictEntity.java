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

@Data
@Entity
@Table(name = DistrictEntity.TABLE_NAME)
public class DistrictEntity {
    public static final String TABLE_NAME = "districts";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public  Integer id;

    public String name;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "city_id")
    public City city;

    public Boolean isPublic = true;

    public Integer number;

    public DistrictEntity() {
    }

    public DistrictEntity(String name, City city, Boolean isPublic, Integer number) {
        this.name = name;
        this.city = city;
        this.isPublic = isPublic;
        this.number = 0;
    }
}
