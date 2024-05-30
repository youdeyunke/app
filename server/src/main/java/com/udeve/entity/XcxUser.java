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

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = XcxUser.TABLE_NAME )
public class XcxUser {
    public static final String TABLE_NAME = "xcx_users";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public Long id;

    @Column(name = "openid", length = 50)
    public String openid;

    @Column(name = "avatar")
    public String avatar;

    @Column(name = "nickname", length = 191)
    public String nickname;

    @Column(name = "city", length = 20)
    public String city;

    @Column(name = "province", length = 20)
    public String province;

    @Column(name = "country", length = 20)
    public String country;

    @Column(name = "gender")
    public Byte gender;

    @Column(name = "session_key")
    public String sessionKey;

    public Integer userId;

    @Column(name = "session_key_gen_at")
    public LocalDateTime sessionKeyGenAt;

}