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
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = TagEntity.TABLE_NAME)
public class TagEntity {
    public static final String TABLE_NAME = "tags";
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    public String name;

    public String color;

    public Integer number;

    @Column(nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime createdAt;

    @Column(nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime updatedAt;

    public String moduleKey;

    public TagEntity() {
    }

    public TagEntity(String name, String moduleKey) {
        this.name = name;
        this.color = "#1989fa";
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.moduleKey = moduleKey;
    }
}
