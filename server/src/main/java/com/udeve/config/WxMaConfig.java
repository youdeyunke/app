package com.udeve.config;

import cn.binarywang.wx.miniapp.api.WxMaService;
import cn.binarywang.wx.miniapp.api.impl.WxMaServiceImpl;
import cn.binarywang.wx.miniapp.config.impl.WxMaDefaultConfigImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.udeve.service.MyconfigService;

@Configuration
@Slf4j
public class WxMaConfig {
    @Autowired
    MyconfigService myconfigService;

    @Bean
    public WxMaService wxMaService() {
        log.info("============初始化微信小程序服务============");
        WxMaDefaultConfigImpl config = new WxMaDefaultConfigImpl();
        if(myconfigService.getAppId() == null){
            log.error("小程序服务初始化失败，appid为空");
            return null;
        }
        config.setAppid(myconfigService.getAppId());
        config.setSecret(myconfigService.getSecret());
        config.autoRefreshToken();
        WxMaService service = new WxMaServiceImpl();
        service.setWxMaConfig(config);
        log.info("小程序服务初始化完成。appid:{}", myconfigService.getAppId());
        return service;
    }
}
