package com.udeve.vo;
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
import com.udeve.entity.DetailContent;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class AdminNewListVo implements Serializable {
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

    public LocalDateTime createdAt;
    public LocalDateTime updatedAt;

    public String slug;
    public Integer detailContentId;
    @JsonFormat(pattern="yyyy-MM-dd")
    public LocalDate date;
    public Integer cityId;

    public DetailContent detailContent;

    public String newsCat;
}
