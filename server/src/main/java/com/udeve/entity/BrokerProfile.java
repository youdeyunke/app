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
@Table(name = BrokerProfile.TABLE_NAME)
@Data
public class BrokerProfile {
    public static final String TABLE_NAME = "broker_profiles";
    public static final Integer  STATUS_REFUSE = -1; // 审核被拒绝
    public static final  Integer  STATUS_DISABLE = 0; // 关闭权限
    public static final Integer  STATUS_PENDING = 1; // 审核中
    public static final  Integer  STATUS_SUCCESS = 2; // 审核通过,账号开通

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Column(length = 11, unique = true, nullable = false)
    public String mobile;

    public String avatar;

    public String name;

    //数据库存储记录为0、1、-1.其中-1代表当用户没有填写性别时默认性别
    public Integer sex;

    public String wechat;

    public String wechatQr;

    public String namecard;

    @Column(name = "`desc`")
    public String desc;

    public Integer userId;
    @OneToOne
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    public User user;

    public Integer postId;
    public String postTitle;

    public Integer level;

    // status: -1:申请被拒绝， 0, 无， 1，等待审核  2，已入驻
    public Integer status;


    public Integer likeNums;

    public Integer viewNums;

    public String rejectReason;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public LocalDateTime createdAt;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public LocalDateTime updatedAt;

    public String tags;

    public String qr;

    public static String getStatusToString(Integer status) {
        switch (status){
            case -1:
                return "审核被拒绝";
            case 0:
                return "关闭权限";
            case 1:
                return "审核中";
            case 2:
                return "审核通过";

        }
        return "未知";
    }
}
