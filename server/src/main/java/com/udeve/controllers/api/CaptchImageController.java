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

import com.alibaba.fastjson.JSONObject;
import com.udeve.BaseApiController;
import com.udeve.utils.CaptchaUtil;
import com.udeve.utils.JsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.UUID;

@RestController
public class CaptchImageController extends BaseApiController {
    @Autowired
    CaptchaUtil captchaUtil;

    // 生成图片验证码
    @GetMapping(value = "/v6/captcha")
    public JsonResponse generateCaptcha() throws IOException {
        String uuid = UUID.randomUUID().toString();
        String captchaImg = captchaUtil.generateCaptcha(uuid);
        String imgurl = "data:image/png;base64," +captchaImg;
        JSONObject resp = new JSONObject();
        resp.put("image", imgurl);
        resp.put("captcha_uuid", uuid);
        return JsonResponse.ok(resp);
    }
}
