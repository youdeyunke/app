package com.udeve.controllers.admin;
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
import cn.dev33.satoken.annotation.SaMode;
import com.udeve.utils.JsonResponse;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.udeve.BaseApiController;

@RestController
@SaCheckLogin
@Api(tags = "管理首页基本信息管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminHomeController extends BaseApiController {

    @Operation(summary = "拉取首页基本信息", description = "用于拉取首页基本信息")
    @GetMapping(value = "/admin6/home")
    public JsonResponse getHomeData(){
        return JsonResponse.ok();
    }



}
