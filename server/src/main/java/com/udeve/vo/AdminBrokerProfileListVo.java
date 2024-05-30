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
import com.udeve.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class AdminBrokerProfileListVo implements Serializable {

    public Integer id;
    public String mobile;
    public String avatar;
    public String name;
    public Integer sex;

    public String wechat;

    public String wechatQr;

    public String namecard;
    public String desc;

    public Integer userId;

    public Integer postId;
    public String postTitle;

    public Integer level;
    public Integer status;
    public Integer likeNums;
    public Integer viewNums;
    public String rejectReason;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public LocalDateTime createdAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public LocalDateTime updatedAt;
    public String tags;
    public String qr;
    public AdminUserVo user;

}
