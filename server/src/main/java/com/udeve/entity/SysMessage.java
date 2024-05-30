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
@Entity
@Table(name = SysMessage.TABLE_NAME)
public class SysMessage {
    public static final String TABLE_NAME="sys_messages";

    public static final String CAT_INTEGRAL_CHANGE="integral_change";
    public static final String CAT_LIKE="like";

    public static final String TITLE_LIKE="点赞";
    public static final String TITLE_INTEGRAL_CHANGE="积分变动";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public Integer id;

    @Column
    public String title;

    @Column
    public String content;

    @Column
    public String cat;

    @Column
    public String receiver;

    @Column
    public String url;

    @Column
    public Boolean unread;

    @Column(nullable = false)
    public LocalDateTime createdAt;

    @Column(nullable = false)
    public LocalDateTime updatedAt;
}
