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
import com.udeve.entity.Role;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data
public class AdminUserListVo implements Serializable {

    @Schema(description = "头像", example = "https://cdn.udeve.cc/xxx.png")
    public String avatar;
    @Schema(description = "最后登录时间", example = "2020-01-01 00:00:00")
    public LocalDateTime currentSignInAt;
    @Schema(description = "最后登录ip", example = "127.0.0.1")
    public String currentSignInIp;
    @Schema(description = "邮箱", example = "1111111@ud.com")
    public String email;
    @Schema(description = "账号到期时间", example = "2020-01-01 00:00:00")
    public LocalDate expiredAt;
    @Schema(description = "账号id", example = "1")
    public Integer id;
    @Schema(description = "账号是否永久有效", example = "true")
    public Boolean isForever;
    @Schema(description = "账号手机号", example = "13000000000")
    public String mobile;
    @Schema(description = "账号名称", example = "账号名称")
    public String name;
    @Schema(description = "账号角色", example = "账号角色")
    public Set<Role> roles;

    //此字段用来控制前端禁用
    //是否是最后一个账号
    @Schema(description = "是否是最后一个账号", example = "true")
    public Boolean isLast = false;


}
