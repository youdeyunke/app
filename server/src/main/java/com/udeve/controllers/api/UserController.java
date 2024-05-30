package com.udeve.controllers.api;
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

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import com.udeve.entity.BrokerProfile;
import com.udeve.entity.User;
import com.udeve.repository.BrokerProfileRepository;
import com.udeve.repository.UserRepository;
import com.udeve.request.UpdateMyselfRequest;
import com.udeve.service.BrokerProfileService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.BrokerMyselfInfoVo;
import com.udeve.vo.MyselfInfoVo;
import lombok.extern.slf4j.Slf4j;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.udeve.BaseApiController;

import java.util.Map;


@RestController
@Slf4j
public class UserController extends BaseApiController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    BrokerProfileRepository brokerProfileRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    BrokerProfileService brokerProfileService;

    @RequestMapping(value="/v6/users/myself")
    @SaCheckLogin
    @SaCheckRole("user")
    public JsonResponse getMyselfInfo(){
        // 返回当前用户的基本信息
        Integer userId = (Integer) getUser().get("user_id");
        BrokerProfile byUserId = brokerProfileService.isBrokerOrNo(userId);
        if (byUserId==null) {
            MyselfInfoVo vo  = modelMapper.map(userRepository.findById(userId).get(), MyselfInfoVo.class);
            log.info("user entity is {}", vo);
            return JsonResponse.ok(vo);
        }
        BrokerMyselfInfoVo myselfInfoVo = modelMapper.map(byUserId, BrokerMyselfInfoVo.class);
        myselfInfoVo.setId(byUserId.getUserId());
        return JsonResponse.ok(myselfInfoVo);
    }

    @PutMapping(value="/v6/users/myself")
    @SaCheckLogin
    public JsonResponse updateMyserProfile(@RequestBody UpdateMyselfRequest request){
        Integer userId = (Integer) getUser().get("user_id");
        BrokerProfile brokerProfile = brokerProfileRepository.findByUserId(userId);
        if (brokerProfile==null){
            User user = userRepository.findById(userId).get();
            if(request.getName()!=null) user.setName(request.getName());
            if(request.getAvatar()!=null) user.setAvatar(request.getAvatar());
            userRepository.saveAndFlush(user);
            return JsonResponse.ok("更新成功");
        }
        if(brokerProfile.getStatus()!=2){
            return JsonResponse.error("当前置业顾问状态异常");
        }
        modelMapper.map(request,brokerProfile);
        brokerProfileRepository.saveAndFlush(brokerProfile);
        return JsonResponse.ok("更新成功");
    }
}
