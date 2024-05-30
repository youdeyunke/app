
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
import com.udeve.entity.Role;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class AdminUserVo {
    public Integer id;
    public String email;
    public String name;
    public String mobile;

    public String currentSignInIp;

    public LocalDateTime currentSignInAt;
    public String avatar;
    public Boolean isForever;

    public LocalDateTime expiredAt;
    public Set<Role> roles;

    public String apiKey;
}
