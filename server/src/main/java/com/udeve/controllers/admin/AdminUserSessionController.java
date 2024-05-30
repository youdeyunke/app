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
import cn.dev33.satoken.stp.StpUtil;
import com.alibaba.fastjson.JSONObject;
import com.udeve.request.AdminUserLoginRequest;
import com.udeve.service.AdminUserService;
import com.udeve.utils.CaptchaUtil;
import com.udeve.utils.JsonResponse;
import com.udeve.utils.annotation.IgnoringIdentity;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;
import java.io.IOException;
import java.util.UUID;

@Slf4j
@RestController
@Api(tags = "管理员登录")
public class AdminUserSessionController extends BaseApiController {
    @Autowired
    AdminUserService adminUserService;
    @Autowired
    CaptchaUtil captchaUtil;

    @Operation(summary = "管理员登录图片验证码", description = "拉取管理员登录图片验证码")
    @GetMapping(value = "/admin6/captcha")
    public JsonResponse generateCaptcha() throws IOException {
        String uuid = UUID.randomUUID().toString();
        String captchaImg = captchaUtil.generateCaptcha(uuid);
        String imgurl = "data:image/png;base64," +captchaImg;
        JSONObject resp = new JSONObject();
        resp.put("image", imgurl);
        resp.put("captcha_uuid", uuid);

        return JsonResponse.ok(resp);
    }

    @ApiOperation(value="管理员登录")
    @PostMapping(value="/admin6/sessions")
    @IgnoringIdentity("管理员登录接口AOP忽略拦截")
    public JsonResponse adminUserLogin(@RequestBody AdminUserLoginRequest body){
        // 对应的参数有：email, password, captchaUuid, captchaValue
        String uuid = body.getCaptchaUuid();
        String captcha = body.getCaptchaValue();
        if (!captchaUtil.validateCaptcha(uuid,captcha)){
            return JsonResponse.error("验证码错误");
        }
        log.info("管理员{}登录", body.getEmail());
        return adminUserService.login(body.getEmail(), body.getPassword());
    }

    @Operation(summary = "管理员退出登录",description = "管理员退出登录")
    @DeleteMapping(value = "/admin6/sessions/myself")
    @SaCheckLogin
    @IgnoringIdentity("退出登录接口AOP忽略拦截")
    public JsonResponse adminUserLogout(){
        log.info("管理员【{}】退出登录", StpUtil.getExtra("user_name"));
        StpUtil.logout();
        return JsonResponse.ok("退出登录成功！");
    }
}
