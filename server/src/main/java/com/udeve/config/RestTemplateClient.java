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
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateClient {

    /**
     * 创建并配置一个 RestTemplate 实例，用于执行 RESTful 服务的调用。
     *
     * @return RestTemplate 一个配置了 HttpClient 的 RestTemplate 实例，可用于进行 HTTP 请求。
     */
    @Bean
    public RestTemplate restTemplate() {
        // 创建一个默认配置的 HttpClient 实例
        HttpClient httpClient = HttpClients.createDefault();
        // 使用 HttpClient 创建 RestTemplate 请求工厂
        ClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory(httpClient);
        // 基于请求工厂创建并返回一个 RestTemplate 实例
        return new RestTemplate(requestFactory);
    }
}
