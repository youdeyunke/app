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
import cn.dev33.satoken.jwt.StpLogicJwtForSimple;
import cn.dev33.satoken.stp.StpLogic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SaTokenConfigure {
    // Sa-Token 整合 jwt (Simple 简单模式)
    /**
     * 配置并返回一个用于Sa-Token整合JWT的逻辑处理器，采用的是Simple简单模式。
     * 这个方法没有参数。
     *
     * @return StpLogicJwtForSimple - 一个实现了StpLogic接口的Simple模式下的JWT逻辑处理器实例。
     */
    @Bean
    public StpLogic getStpLogicJwt() {
        return new StpLogicJwtForSimple();
    }
}
