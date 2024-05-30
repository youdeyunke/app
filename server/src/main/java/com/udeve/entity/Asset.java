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
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = Asset.TABLE_NAME)
public class Asset {
    public static final String TABLE_NAME = "assets";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    public String file;

    public String name;

    public String filetype;

    @Column(nullable = false)
    public LocalDateTime createdAt;

    @Column(nullable = false)
    public LocalDateTime updatedAt;

}
