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
import com.udeve.request.BrokerJoinRequest;
import com.udeve.service.BrokerProfileService;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.udeve.BaseApiController;

import javax.validation.Valid;

@RestController
@Slf4j
public class BrokerJoinController extends BaseApiController {

    @Autowired
    BrokerProfileService brokerProfileService;

    @PostMapping(value="/v6/brokers")
    @SaCheckLogin
    public JsonResponse JoinApply(@Valid @RequestBody BrokerJoinRequest dto){
        return brokerProfileService.JoinApply(dto,(Integer)getUser().get("user_id"));
    }

    @PostMapping(value="/v6/brokers/check_status")
    public JsonResponse CheckStatus(){
        Integer userId = (Integer) getUser().get("user_id");
        return brokerProfileService.CheckStatus(userId);
    }
}
