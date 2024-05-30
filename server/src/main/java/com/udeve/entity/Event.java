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

@Entity
@Data
@Table(name = Event.TABLE_NAME)
public class Event {
    public static final String TABLE_NAME = "events";
    public static final Integer STATUS_INVALID = -1;// 审核无效 -1
    public static final Integer STATUS_DRAFT = 0;// 等待审核 0 草稿
    public static final Integer STATUS_UNPUBLISHED = 1;// 审核通过 1  未发布
    public static final Integer STATUS_PUBLISHED = 2;// 发布上线 2  已发布
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    public String content;

    public Integer postId;

    public Integer catId;

    @Column(nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime createdAt;

    @Column(nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime updatedAt;

    public String pubTime;

    public String title;

    @Column(nullable = false)
    public Integer status;

    public String author;

    public String images;

    public String pubFrom;

    public Boolean isPublic = false;

    public Boolean pushDone = false;//是否已推送


    @ManyToOne
    @JoinColumn(name = "postId",insertable = false, updatable = false, nullable = true)
    public Post post;

}
