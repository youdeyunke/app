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
import cn.dev33.satoken.interceptor.SaInterceptor;
import cn.dev33.satoken.stp.StpUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
/**
 * WebMvc配置类，实现WebMvcConfigurer接口，用于配置Spring MVC的相关设置。
 */
public class WebMvcConfig implements WebMvcConfigurer {

    // 从配置文件中读取上传目录路径
    @Value("${udyk.uploadDir}")
    private String uploadDir;

    // 从配置文件中读取文件存储路径
    @Value("${udyk.filestorePath}")
    private String filestorePath;

    /**
     * 配置静态资源处理器。
     * @param registry 资源处理器注册表，用于添加资源处理器。
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 配置静态资源路径，将指定路径下的资源映射到应用中
        registry.addResourceHandler("/"+filestorePath+"/**")
                .addResourceLocations("file:"+uploadDir+"/");
    }

    /**
     * 配置视图控制器。
     * @param registry 视图控制器注册表，用于添加视图控制器。
     */
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // 配置根路径重定向到指定页面
        registry.addRedirectViewController("/", "/admin/index.html");
    }

    /**
     * 添加拦截器。
     * @param registry 拦截器注册表，用于注册拦截器。
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 注册Sa-Token拦截器，开启注解式鉴权功能
        registry.addInterceptor(new SaInterceptor())
                .addPathPatterns("/**");
    }
}
