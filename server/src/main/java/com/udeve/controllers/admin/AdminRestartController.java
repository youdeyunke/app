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
import com.udeve.utils.JsonResponse;
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.udeve.BaseApiController;

@RestController
@SaCheckLogin
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminRestartController extends BaseApiController {


    @GetMapping(value="/admin6/restart")
    public JsonResponse Restart(){
        //Object res =  restartEndpoint.restart();
        //return new JsonResponse().ok(res, "重启成功");
        //FangApplication.restart();
        return JsonResponse.ok("重启成功");
    }
}
