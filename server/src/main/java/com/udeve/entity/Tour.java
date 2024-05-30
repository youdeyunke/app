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
@Table(name = Tour.TABLE_NAME)
public class Tour {
    public static final String TABLE_NAME = "tours";
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    public String cover;
    public String title;

    public String postIds;

    @Column(name = "is_public")
    public Boolean isPublic = false;


    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime startsAt;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(nullable = false)
    public LocalDateTime endsAt;


    @Column(nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime createdAt;

    @Column(nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime updatedAt;

    public Boolean isDelete = false;

    public String cat;


    public String master;
    public Boolean isTop = false;
    public String joinBtn = "立即参加";

    public String weappId;

    public String weappPath;

    @Transient
    public String statusName;

    public String getStatusName(){
        if (startsAt.isBefore(LocalDateTime.now()) && endsAt.isAfter(LocalDateTime.now())) {
            return "进行中";
        } else if (startsAt.isAfter(LocalDateTime.now())) {
            return "即将开始";
        } else {
            return "已结束";
        }
    }

}
