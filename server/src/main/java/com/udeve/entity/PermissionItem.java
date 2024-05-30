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
@Table(name = PermissionItem.TABLE_NAME)
public class PermissionItem {
    public static final String TABLE_NAME = "permission_items";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public  Integer id;

    public String title;

    public String icon;

    public String path;

    public String componentPath;

    public String componentName;

    public Boolean hidden = false;

    public String cat;

    //由于 order 是一个保留字，在 SQL 语句中使用时可能会引发语法错误。为了避免这种情况，使用反引号（`）将保留字括起来，告知数据库该部分是一个列名而非关键字。
    @Column(name = "`order`")
    public Integer order = 0;

    public Integer fatherId;

    @Column(name = "`key`")
    public String key;

    @Column(nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime createdAt;

    @Column(nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime updatedAt;

    @Column(nullable = false)
    public Boolean enable;

    public String redirect;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (updatedAt == null) {
            updatedAt = LocalDateTime.now();
        }
    }
}
