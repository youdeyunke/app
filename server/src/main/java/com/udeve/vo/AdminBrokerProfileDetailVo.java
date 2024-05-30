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
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class AdminBrokerProfileDetailVo implements Serializable {


    @Schema(description = "置业顾问id", example = "1")
    public Integer id;
    @Schema(description = "置业顾问手机号", example = "13000000000")
    public String mobile;
    @Schema(description = "置业顾问头像", example = "http://www.baidu.com")
    public String avatar;
    @Schema(description = "置业顾问姓名", example = "张三")
    public String name;
    @Schema(description = "置业顾问性别", example = "1")
    public Integer sex;
    @Schema(description = "置业顾问微信号", example = "1300000000")
    public String wechat;
    @Schema(description = "置业顾问微信二维码", example = "http://www.baidu.com")
    public String wechatQr;
    @Schema(description = "置业顾问名片", example = "http://www.baidu.com")
    public String namecard;
    @Schema(description = "置业顾问详情", example = "置业顾问详情")
    public String desc;

    @Schema(description = "置业顾问对应UserID", example = "1")
    public Integer userId;
    @Schema(description = "置业顾问主营PostID", example = "1")
    public Integer postId;
    @Schema(description = "置业顾问主营楼盘Title", example = "置业顾问主营楼盘Title")
    public String postTitle;

    @Schema(description = "置业顾问等级", example = "1")
    public Integer level;

    @Schema(description = "置业顾问审核状态", example = "1")
    public Integer status;

    @Schema(description = "置业顾问点赞数", example = "11")
    public Integer likeNums;
    @Schema(description = "置业顾问浏览数", example = "11")
    public Integer viewNums;

    @Schema(description = "置业顾问所属groupId", example = "1")
    public Integer userGroupId;
    @Schema(description = "置业顾问被拒原因", example = "置业顾问被拒原因")
    public String rejectReason;
    @Schema(description = "置业顾问创建时间", example = "2020-01-01 00:00:00")
    public LocalDateTime createdAt;
    @Schema(description = "置业顾问更新时间", example = "2020-01-01 00:00:00")
    public LocalDateTime updatedAt;
    @Schema(description = "置业顾问标签", example = "置业顾问标签")
    public String tags;
    @Schema(description = "置业顾问二维码", example = "http://www.baidu.com")
    public String qr;



}
