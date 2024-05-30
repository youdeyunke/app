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
@Table(name = DynamicSubscription.TABLE_NAME)
public class DynamicSubscription {

    public static final String TABLE_NAME = "dynamic_subscription";


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Column(name = "target_id")
    public Integer targetId;

    @Column(name = "target_type")
    public String targetType;

    @Column(name = "user_id")
    public Integer userId;

    @Column(nullable = false,name = "created_at")
    public LocalDateTime createdAt;

    @Column(nullable = false,name = "updated_at")
    public LocalDateTime updatedAt;
}
