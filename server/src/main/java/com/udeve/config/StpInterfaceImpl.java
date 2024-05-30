package com.udeve.config;
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
import cn.dev33.satoken.stp.StpInterface;
import cn.dev33.satoken.stp.StpUtil;
import com.udeve.service.AdminUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * 自定义权限加载接口实现类
 */
@Component    // 保证此类被 SpringBoot 扫描，完成 Sa-Token 的自定义权限验证扩展
@Slf4j
public class StpInterfaceImpl implements StpInterface {

    @Autowired
    AdminUserService adminUserService;

    /**
     * 返回一个账号所拥有的权限码集合 
     */
    @Override
    public List<String> getPermissionList(Object loginId, String loginType) {
        log.info("-----------------user loginId:{}",loginId);
        //未登录 返回空的权限
        if (StpUtil.getLoginIdDefaultNull()==null) {
            return new ArrayList<>();
        }
        //小程序用户 或 置业顾问 返回空的权限
        if (StpUtil.hasRole("user") ||StpUtil.hasRole("broker")) {
            return new ArrayList<>();
        }
        // 管理后台 查询相关权限并返回
        Integer userId =StpUtil.getLoginIdAsInt();
        List<String> permission = adminUserService.getPermissionsByUserId(userId);
        log.info("-----------------user permission:-----------------\n{}",permission);
        return permission;
    }

    /**
     * 返回一个账号所拥有的角色标识集合 (权限与角色可分开校验)
     */
    @Override
    public List<String> getRoleList(Object loginId, String loginType) {
        //未登录，不给设置身份
        if (StpUtil.getLoginIdDefaultNull()==null) {
            return new ArrayList<>();
        }
        //登录者身份如果是null，默认设置身份为demo
        Object userType = StpUtil.getExtra("user_type");
        if (userType==null){
            ArrayList<String> list = new ArrayList<>();
            list.add("demo");
            return list;
        }
        //
        String userTypeStr = userType.toString();
        String[] split = userTypeStr.split(",");
        List<String> roleList = Arrays.asList(split);
        log.info("-----------------user type:{}",roleList);
        return roleList;
    }

}
