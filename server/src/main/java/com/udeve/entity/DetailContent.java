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
@Table(name = DetailContent.TABLE_NAME)
public class DetailContent {
    public static final String TABLE_NAME = "detail_contents";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Column(nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime createdAt;

    @Column(nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime updatedAt;

    @Column(name = "`value`")
    public String value;

}
