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

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.persistence.Transient;
import java.time.LocalDateTime;

// 用于小程序端活动详情页的展示数据

@Data
public class TourDetailVo {
    @Schema(description = "活动对应楼盘id", example = "1,2,3,4")
    public String postIds;
    @Schema(description = "是否加入活动", example = "false")
    public Boolean joined = false;
    @Schema(description = "活动封面图", example = "https://cdn.udeve.cc/xxx.png")
    public String cover;
    @Schema(description = "活动标题", example = "活动标题")
    public String title;
    public String master;
    @Schema(description = "活动参加按钮文字", example = "立即参加")
    public String joinBtn = "立即参加";
    @Schema(description = "跳转小程序活动小程序id", example = "wx123456789")
    public String weappId;
    @Schema(description = "跳转小程序活动小程序路径", example = "pages/index/index")
    public String weappPath;
    @Schema(description = "活动类型", example = "zhuli")
    public String cat;

    @Schema(description = "活动开始时间", example = "2020-01-01 00:00:00")
    public LocalDateTime startsAt;
    @Schema(description = "活动结束时间", example = "2020-01-01 00:00:00")
    public LocalDateTime endsAt;
    @Schema(description = "活动状态", example = "已结束")
    public String statusName;
}
