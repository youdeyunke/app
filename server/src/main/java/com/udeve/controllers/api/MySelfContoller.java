package com.udeve.controllers.api;
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

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import com.udeve.BaseApiController;
import com.udeve.service.MySelfService;
import com.udeve.utils.JsonResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class MySelfContoller extends BaseApiController {

    @Autowired
    MySelfService mySelfService;

    /**
     * 获取置业顾问的工作台图标信息
     * 该接口不需要参数，通过用户登录态验证用户身份，并获取当前用户的身份权限。
     * 主要用于展示置业顾问工作台的各种图标信息。
     *
     * @return JsonResponse 返回一个JSON格式的响应，包含工作台图标信息。
     */
    @Operation(summary = "置业顾问工作台")
    @GetMapping("v6/workspace")
    @SaCheckLogin // 检查用户登录状态
    public JsonResponse getMyselfBrokerIcons(){
        // 获取当前登录用户的用户ID
        Integer userId = (Integer) getUser().get("user_id");
        // 调用服务层方法，获取当前置业顾问的图标信息
        return mySelfService.getMyselfBrokerIcons(userId);
    }

}
