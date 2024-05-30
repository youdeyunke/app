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

import lombok.Data;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class AdminTourListVo implements Serializable{
    public Integer id;
    public String cover;
    public String title;
    public String postIds;
    public Boolean isPublic;


    public LocalDateTime createdAt;
    public LocalDateTime updatedAt;
    public Boolean isDelete;
    public String cat;

    public LocalDateTime startsAt;

    public LocalDateTime endsAt;

    public String master;
    public Boolean isTop;
    public Integer cityId;
    public String joinBtn = "立即参加";

    public String weappId;
    public String weappPath;

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
