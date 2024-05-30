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
@Table(name = PostCat.TABLE_NAME)
public class PostCat {
    public static final String TABLE_NAME = "post_cats";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Column(name = "post_id")
    public Integer postId;

    @Column(name = "cat_id")
    public Integer catId;

    public Integer number;

    @Column(name = "created_at",nullable = false)
    public LocalDateTime createdAt;

    @Column(name = "updated_at",nullable = false)
    public LocalDateTime updatedAt;

}
