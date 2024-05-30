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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@Entity
@Table(name = AdminUser.TABLE_NAME)
public class AdminUser {
    public static final String TABLE_NAME = "admin_users";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Column(nullable = false)
    public String email;

    @Column(nullable = false)
    public String encryptedPassword;

    public String resetPasswordToken;

    public LocalDateTime resetPasswordSentAt;

    public LocalDateTime rememberCreatedAt;

    @Column(nullable = false)
    public Integer signInCount = 0;

    public LocalDateTime currentSignInAt;

    public LocalDateTime lastSignInAt;

    public String currentSignInIp;

//    public String lastSignInIp;

    @Column(nullable = false)
    public LocalDateTime createdAt;

    @Column(nullable = false)
    public LocalDateTime updatedAt;

    public String avatar;

    public String name;

    @Column(name = "`desc`")
    public String desc;

//    public Integer userId;

    //public Integer zixunNum;

    //public Integer loupanNum;

//    public String token;

//    public Boolean isSuperadmin;

    public Boolean isForever;

    public LocalDate expiredAt;

    public String mobile;


    public Boolean isDelete = false;


    @ManyToMany
    @JoinTable(name = "admin_user_roles",
            joinColumns = {@JoinColumn(name = "adminUserId", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "roleId", referencedColumnName = "id")})
    public Set<Role> roles;

    public String apiKey;

}
