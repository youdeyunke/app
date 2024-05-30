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
@Entity(name = Video.TABLE_NAME)
public class Video {
    public static final String TABLE_NAME = "videos";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Column(name = "title")
    public String title;

    @Column(name = "url")
    public String url;

    @Column(name = "is_wxvideo")
    public Boolean isWxvideo;

    @Column(name = "wxauthor_id")
    public String wxauthorId;

    @Column(name = "author_name")
    public String authorName;

    @Column(name = "wxvideo_id")
    public String wxvideoId;

    @Column(name = "author_avatar")
    public String authorAvatar;

    @Column(name = "is_public")
    public Boolean isPublic = false;

    @Column(name = "view_nums")
    public Integer viewNums;

    @Column(nullable = false)
    public LocalDateTime createdAt;

    @Column(nullable = false)
    public LocalDateTime updatedAt;

    @Column(name = "cover")
    public String cover;
}
