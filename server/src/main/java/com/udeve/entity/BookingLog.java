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
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = BookingLog.TABLE_NAME)
public class BookingLog {
    public static final String TABLE_NAME = "booking_logs";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @ManyToOne
    @JoinColumn(name = "postId")
    public Post post;

    @Column(insertable = false, updatable = false)
    public Integer postId;

    @ManyToOne
    @JoinColumn(name = "userId")
    public User user;

    @Column(insertable = false, updatable = false)
    public Integer userId;

    public String remark;

    @Column(nullable = false)
    public LocalDateTime createdAt;

    @Column(nullable = false)
    public LocalDateTime updatedAt;

    public Integer status;

    public LocalDate date;

    public String time;

    public String name;

    public String mobile;

}
