package com.udeve.service;
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
import cn.binarywang.wx.miniapp.api.WxMaService;
import cn.binarywang.wx.miniapp.bean.scheme.WxMaGenerateSchemeRequest;
import cn.hutool.core.util.ObjectUtil;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.common.error.WxErrorException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@Slf4j
public class JumpService {

    @Autowired
    WxMaService wxMaService;

    @Autowired
    StringRedisTemplate redisTemplate;
    public String genUrlScheme(){

        //先从redis中取
        String openlink = redisTemplate.opsForValue().get("openlink");
        if (ObjectUtil.isNotEmpty(openlink)){
            String urlScheme = "window.launchWeapp=function(){\n" +
                    "             console.log('launch weapp');\n" +
                    "             window.open('"+openlink+"', '_blank')\n" +
                    "           }";
            log.info("从redis中取得：{}",urlScheme);
            return urlScheme;
        }

        //redis没取到，调用微信接口生成
        WxMaGenerateSchemeRequest.WxMaGenerateSchemeRequestBuilder wxMaGenerateSchemeRequestBuilder = WxMaGenerateSchemeRequest.newBuilder();
        WxMaGenerateSchemeRequest.JumpWxa.JumpWxaBuilder jumpWxaBuilder = WxMaGenerateSchemeRequest.JumpWxa.newBuilder();
        wxMaGenerateSchemeRequestBuilder.isExpire(true);

        jumpWxaBuilder.path("/pages/home/home");
        jumpWxaBuilder.query("from=web");
        jumpWxaBuilder.envVersion("trial");//默认值"release"。要打开的小程序版本。正式版为"release"，体验版为"trial"，开发版为"develop"，仅在微信外打开时生效

        wxMaGenerateSchemeRequestBuilder.jumpWxa(jumpWxaBuilder.build());
        String generate = null;
        try {
            generate = wxMaService.getWxMaSchemeService().generate(
                    wxMaGenerateSchemeRequestBuilder.build()
            );
        } catch (WxErrorException e) {
            //生成失败的js
            String urlScheme = "window.launchWeapp=function(){\n" +
                    "             console.log('launch weapp error');\n" +
                    "             // res is #{ res }\n" +
                    "           }";
            log.error("生成失败：原因：{}",e.getMessage());
            return urlScheme;
        }

        log.info("生成结果：{}",generate);

        // 生成成功，但是为空字符串或为null  返回此js
        if (ObjectUtil.isEmpty(generate)){
            log.error("生成结果为空字符串");
            return  "window.launchWeapp=function(){\n" +
                    "             console.log('launch weapp error');\n" +
                    "             // res is #{ res }\n" +
                    "           }";
        }

        //到此步证明生成ok，存入redis，避免频繁调用微信接口
        redisTemplate.opsForValue().set("openlink",generate,1, TimeUnit.HOURS);
        log.info("生成成功：{}，存入redis，有效时间为1小时",generate);
        return "window.launchWeapp=function(){\n" +
                "             console.log('launch weapp');\n" +
                "             window.open('"+generate+"', '_blank')\n" +
                "           }";
    }
}
