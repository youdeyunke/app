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
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * 全局时间格式化  去掉 "T"
 *
 */
@Configuration
public class LocalDateTimeConfig {

    /**
     * 创建并配置一个LocalDateTimeSerializer Bean实例。
     * 该序列化器用于将LocalDateTime对象序列化为字符串，
     * 字符串格式为"yyyy-MM-dd HH:mm:ss"。
     *
     * @return LocalDateTimeSerializer 返回配置好的LocalDateTimeSerializer实例。
     */
    @Bean
    public LocalDateTimeSerializer localDateTimeDeserializer() {
        // 使用指定的日期时间格式创建LocalDateTimeSerializer实例
        return new LocalDateTimeSerializer(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

    /**
     * 提供一个自定义的 Jackson2ObjectMapperBuilderCustomizer 实例，用于配置 ObjectMapper 的构建过程。
     * 其中，特别针对 LocalDateTime 类型的序列化进行了自定义设置。
     *
     * @return Jackson2ObjectMapperBuilderCustomizer 自定义对象，用于调整 ObjectMapper 的构建配置。
     */
    @Bean
    public Jackson2ObjectMapperBuilderCustomizer jackson2ObjectMapperBuilderCustomizer() {
        // 为 LocalDateTime 类型定义自定义的序列化器
        return builder -> builder.serializerByType(LocalDateTime.class, localDateTimeDeserializer());
    }
}
