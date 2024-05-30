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
@Table(name = AdminLog.TABLE_NAME)
public class AdminLog {
    public static final String TABLE_NAME = "admin_logs";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Column(name = "admin_user_id")
    public Integer adminUserId;

    @Column(name = "operation_type")
    public String operationType;

    @Column(name = "operation")
    public String operation;

    @Column(name = "is_delete")
    public Boolean isDelete;

    @Column(nullable = false,name = "created_at")
    public LocalDateTime createdAt;

    @Column(nullable = false,name = "updated_at")
    public LocalDateTime updatedAt;

    @Column(nullable = false,name = "ip")
    public String ip;

    @Column(name = "`admin`")
    public String admin;

    @Column(name = "ip_region")
    public String ipRegion;

}
