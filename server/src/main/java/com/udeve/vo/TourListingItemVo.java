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
import lombok.NoArgsConstructor;

import javax.persistence.Transient;
import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class TourListingItemVo {

    public Integer id;

    public String cat;

    public String cover;
    public String title;
    public String postIds;

    public Boolean isPublic;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime startsAt;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime endsAt;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime createdAt;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public LocalDateTime updatedAt;

    public String master;
    public Integer cityId;
    public String joinBtn = "立即参加";
    public String url;
    public String statusName;
    public String weappId;
    public String weappPath;

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
