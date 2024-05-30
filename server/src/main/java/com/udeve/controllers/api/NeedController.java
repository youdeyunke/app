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

import cn.dev33.satoken.annotation.SaCheckRole;
import com.udeve.BaseApiController;
import com.udeve.request.WeappNeedCreateRequest;
import com.udeve.service.NeedService;
import com.udeve.utils.JsonResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class NeedController extends BaseApiController {

    @Autowired
    NeedService needService;

    @PostMapping(value = "/v6/needs/")
    @SaCheckRole("user")
    public JsonResponse submitNeed(@Valid @RequestBody WeappNeedCreateRequest request){
        return needService.weappSubmitNeed(request);
    }

}
