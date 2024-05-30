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

import com.udeve.request.WeappUserLoginRequest;
import com.udeve.service.UserService;
import com.udeve.utils.JsonResponse;
import com.udeve.utils.annotation.IgnoringIdentity;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.common.error.WxErrorException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.udeve.BaseApiController;

@RestController
@Slf4j
public class WechatSessionController extends BaseApiController {
    @Autowired
    UserService userService;


    @PostMapping(value="/v6/sessions")
    @IgnoringIdentity("登录接口AOP忽略拦截")
    public JsonResponse weappLogin(@RequestBody WeappUserLoginRequest loginRequest) {
        try {
            return userService.weappLogin(loginRequest);
        }catch (WxErrorException e){
            log.error("微信授权登录错误:{}",e.getMessage());
            if(e.getMessage().contains("appid missing rid")){
                return JsonResponse.error("appid异常，请检查管理后台【系统管理】-【系统设置】-【服务器参数】中appid是否正确");
            }
            return JsonResponse.error("微信授权登录错误：" +e.getMessage());
        }
    }
}
