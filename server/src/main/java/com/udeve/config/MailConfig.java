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
import cn.hutool.core.util.ObjectUtil;
import com.udeve.entity.Myconfig;
import com.udeve.repository.MyconfigRepository;
import com.udeve.utils.EmailUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import javax.mail.MessagingException;

@Configuration
@Slf4j
public class MailConfig {

    @Autowired
    MyconfigRepository myconfigRepository;

    @Bean
    public JavaMailSenderImpl mailSender() {
        log.info("========================init java mail start========================");

        Myconfig myconfig = myconfigRepository.findFirstByOrderByIdDesc();
        if (myconfig==null){
            log.error("初始化邮箱配置失败！myconfigs为null");
            return new JavaMailSenderImpl();
        }

        JavaMailSenderImpl mailSender = getJavaMailSender(myconfig);
        if (mailSender==null){
            log.error("初始化邮箱配置失败！数据库中未填写邮件配置信息");
            return new JavaMailSenderImpl();
        }
        try {
            // 尝试连接邮箱服务器以验证配置的有效性
            mailSender.testConnection();
        } catch (MessagingException e) {
            // 配置验证失败，抛出运行时异常
            log.error("连接邮箱服务器失败，邮件配置信息错误: {}", e.getMessage());
            return new JavaMailSenderImpl();
        }

        //将上面set进去的值一行分别输出
        log.info("初始化邮箱配置成功！ host：{}、port：{}、protocol：{}、username：{}、pwd：{}",
                mailSender.getHost(),
                mailSender.getPort(),
                mailSender.getProtocol(),
                mailSender.getUsername(),
                mailSender.getPassword());
        log.info("========================init java mail end========================");
        return mailSender;
    }

    private static JavaMailSenderImpl getJavaMailSender(Myconfig myconfig) {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        if (isEmpty(myconfig)){
            return null;
        }

        // 数据从数据库表（myconfigs）中取
        // 设置邮件服务器的信息
        mailSender.setHost(myconfig.getEmailHost());//平台地址，这里用的是qq邮箱，使用其他邮箱请更换
        mailSender.setPort(myconfig.getEmailPort());//端口号  smtp的指定端口 使用465要将protocol改为smtps
        mailSender.setProtocol(myconfig.getEmailProtocol());//发送邮件的协议
        mailSender.setUsername(myconfig.getEmailUsername());//发送邮件的邮箱地址
        mailSender.setPassword(myconfig.getEmailPassword());//发送邮件的邮箱授权码
        EmailUtil.from = myconfig.getEmailUsername();
        return mailSender;
    }

    public static boolean isEmpty(Myconfig myconfig){
        String emailHost = myconfig.getEmailHost();
        Integer emailPort = myconfig.getEmailPort();
        String emailProtocol = myconfig.getEmailProtocol();
        String emailUsername = myconfig.getEmailUsername();
        String emailPassword = myconfig.getEmailPassword();
        if (ObjectUtil.isEmpty(emailHost) || ObjectUtil.isEmpty(emailPort) || ObjectUtil.isEmpty(emailProtocol) || ObjectUtil.isEmpty(emailUsername) || ObjectUtil.isEmpty(emailPassword)){
            return true;
        }
        return false;
    }
}
