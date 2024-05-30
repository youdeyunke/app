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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Table(name= New.TABLE_NAME)
@Entity
@Data
public class New {
    public static final String TABLE_NAME = "news";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;
    public Integer newsCatId;
    public String title;
    public String contentType;
    public String author;
    public String summary;
    public String cover;
    public String avatar;
    public String url;
    public Integer viewNums;
    public Integer likeNums;
    public String source;
    public String content;
    public Boolean hasPosts;
    public Boolean isTop;
    public Boolean isPublic;

    @Column(nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime createdAt;
    @Column(nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime updatedAt;

    public Integer detailContentId;

    @JsonFormat(pattern="yyyy-MM-dd")
    public LocalDate date;
    public Integer cityId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "detailContentId", nullable = true,insertable = false, updatable = false)
    public DetailContent detailContent;
    @OneToMany
    @JoinColumn(name = "newsId", referencedColumnName = "id")
    public List<NewPost> newPosts;

}
