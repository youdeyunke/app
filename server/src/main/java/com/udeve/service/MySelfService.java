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

import cn.dev33.satoken.stp.StpUtil;
import com.alibaba.fastjson.JSONObject;
import com.udeve.entity.BrokerProfile;
import com.udeve.repository.BrokerProfileRepository;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.WeappUserIconVo;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@Slf4j
public class MySelfService {

    @Autowired
    ModelMapper modelMapper;
    @Autowired
    BrokerProfileRepository brokerProfileRepository;

    public JsonResponse getMyselfBrokerIcons(Integer userId){
        if (!StpUtil.hasRole(userId,"broker")) {
            return JsonResponse.error("您还不是置业顾问");
        }
        BrokerProfile brokerProfile = brokerProfileRepository.findByUserId(userId);
        if (brokerProfile.getStatus().equals(BrokerProfile.STATUS_DISABLE)) {
            return JsonResponse.error("您的账号已被禁用");
        }
        if (brokerProfile.getStatus().equals(BrokerProfile.STATUS_PENDING)) {
            return JsonResponse.error("您的账号正在审核中");
        }
        if (brokerProfile.getStatus().equals(BrokerProfile.STATUS_REFUSE)) {
            return JsonResponse.error("您的入驻申请被拒绝");
        }
        return JsonResponse.ok(List.of(getBrokerIcons(userId)));
    }


    public JSONObject getBrokerIcons(Integer userId){

        WeappUserIconVo vo1 = new WeappUserIconVo();
        vo1.setName("我的电子名片");
        vo1.setUrl("/pkgBroker/pages/broker/profile?id=" + userId);
        vo1.setIconUrl("https://tcdn.udeve.net/udyk/myself_zhuye.png");


        WeappUserIconVo vo3 = new WeappUserIconVo();
        vo3.setName("我的二维码海报");
        vo3.setUrl("/pkgBroker/pages/broker/qr");
        vo3.setIconUrl("https://tcdn.udeve.net/udyk/myself_minpian.png");


        JSONObject result = new JSONObject();
        result.put("label", "工作台");
        result.put("items", List.of(vo1,vo3));
        return result;
    }


}
