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
import io.swagger.annotations.Api;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
@EnableOpenApi
/**
 * Swagger配置类，用于配置和生成API文档。
 */
public class SwaggerConfig {

    /**
     * 创建一个通用的Docket Bean。
     * @return Docket配置实例
     */
    @Bean
    public Docket docket() {
        // Docket实例的配置
        Docket docket = new Docket(DocumentationType.OAS_30)
                .apiInfo(apiInfo()).enable(true)
                .select()
                // 配置swagger接口的提取范围
                .apis(RequestHandlerSelectors.withClassAnnotation(Api.class))
                .paths(PathSelectors.any())
                .build();

        return docket;
    }

    /**
     * 创建管理后台接口的Docket Bean。
     * @return Docket配置实例
     */
    @Bean
    public Docket api() {
        // 针对管理后台接口的特定Docket配置
        return new Docket(DocumentationType.OAS_30)
                .groupName("管理后台接口")
                .apiInfo(apiInfo()).enable(true)
                .select()
                .apis(RequestHandlerSelectors.withClassAnnotation(Api.class))
                .paths(PathSelectors.regex("/api/admin6/.*")) // 管理后台接口的URL匹配规则
                .build();
    }

    /**
     * 创建小程序接口的Docket Bean。
     * @return Docket配置实例
     */
    @Bean
    public Docket apiV6() {
        // 针对小程序接口的特定Docket配置
        return new Docket(DocumentationType.OAS_30)
                .groupName("小程序接口")
                .apiInfo(apiInfo()).enable(true)
                .select()
                .apis(RequestHandlerSelectors.withClassAnnotation(Api.class))
                .paths(PathSelectors.regex("/api/v6/.*")) // 小程序接口的URL匹配规则
                .build();
    }

    /**
     * 创建API基本信息。
     * @return 返回构建好的ApiInfo实例
     */
    @Bean
    public ApiInfo apiInfo() {
        // 构建API文档的详细信息
        return new ApiInfoBuilder()
                .title("友得云客房产营销小程序")
                .description("友得云客房产营销小程序后端API文档. www.youdeyunke.com")
                .contact(new Contact("优得（西安）信息科技有限公司", "https://www.youdeyunke.com","tech@udeve.cn"))
                .version("v2.0.1")
                .build();
    }
}
