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
import cn.hutool.core.util.ObjectUtil;
import com.udeve.entity.Myconfig;
import com.udeve.repository.MyconfigRepository;
import com.udeve.request.UpdateEmailConfigRequest;
import com.udeve.utils.EmailUtil;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.EmailVo;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.mail.MessagingException;

@Service
@Slf4j
public class AdminEmailConfigService{

    @Autowired
    EmailUtil emailUtil;

    @Resource
    private JavaMailSenderImpl javaMailSender;

    @Autowired
    MyconfigRepository myconfigRepository;

    @Autowired
    ModelMapper modelMapper;


    public JsonResponse getEmailConfig(){
        Myconfig myconfig = myconfigRepository.findFirstByOrderByIdDesc();
        EmailVo map = modelMapper.map(myconfig, EmailVo.class);
        return JsonResponse.ok(map);
    }


    public JsonResponse updateEmailConfig(UpdateEmailConfigRequest req){
        Myconfig myconfig = myconfigRepository.findFirstByOrderByIdDesc();
        if (myconfig==null){
            return JsonResponse.error("未找到配置信息！");
        }
        log.info("修改了邮箱配置，重新设置邮件配置！");
        javaMailSender.setHost(req.getEmailHost());
        javaMailSender.setPort(req.getEmailPort());
        javaMailSender.setProtocol(req.getEmailProtocol());
        javaMailSender.setUsername(req.getEmailUsername());
        javaMailSender.setPassword(req.getEmailPassword());
        EmailUtil.from = req.getEmailUsername();
        try {
            javaMailSender.testConnection();//测试连接
        } catch (MessagingException e) {
            log.error("修改邮箱配置失败，{}",e.getMessage());
            // 修改失败的话，将配置信息还原（从数据库中取出老数据）
            // 如果老数据有问题，就返回个新的对象
            if (ObjectUtil.isEmpty(myconfig.getEmailHost()) || ObjectUtil.isEmpty(myconfig.getEmailPort()) || ObjectUtil.isEmpty(myconfig.getEmailProtocol()) || ObjectUtil.isEmpty(myconfig.getEmailUsername()) || ObjectUtil.isEmpty(myconfig.getEmailPassword()) ){
                javaMailSender = new JavaMailSenderImpl();
                EmailUtil.from = "";
            }else {//否则就将数据库中的数据set到javaMailSender中
                javaMailSender.setHost(myconfig.getEmailHost());
                javaMailSender.setPort(myconfig.getEmailPort());
                javaMailSender.setProtocol(myconfig.getEmailProtocol());
                javaMailSender.setUsername(myconfig.getEmailUsername());
                javaMailSender.setPassword(myconfig.getEmailPassword());
                EmailUtil.from = myconfig.getEmailUsername();
            }

            return JsonResponse.error("修改失败，请检查配置是否正确！");
        }
        log.info("修改邮箱配置成功！ host：{}、port：{}、protocol：{}、username：{}、pwd：{}", javaMailSender.getHost(), javaMailSender.getPort(), javaMailSender.getProtocol(), javaMailSender.getUsername(), javaMailSender.getPassword());
        // 修改成功并通过了testConnection  则将配置信息存入到数据库中保存
        myconfig.setEmailHost(req.getEmailHost());
        myconfig.setEmailPort(req.getEmailPort());
        myconfig.setEmailProtocol(req.getEmailProtocol());
        myconfig.setEmailUsername(req.getEmailUsername());
        myconfig.setEmailPassword(req.getEmailPassword());
        myconfigRepository.saveAndFlush(myconfig);
        return JsonResponse.ok("修改成功！");
    }
}
