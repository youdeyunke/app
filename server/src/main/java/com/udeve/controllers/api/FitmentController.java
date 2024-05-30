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
import com.udeve.service.FitmentService;
import com.udeve.utils.JsonResponse;
import io.swagger.annotations.Api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.udeve.BaseApiController;

@RestController
@SaCheckLogin
@Api(tags = "fitment管理")
public class FitmentController extends BaseApiController {

    @Autowired
    FitmentService fitmentService;

    @GetMapping(value = "/v6/fitments/")
    public JsonResponse getFitmentList(){
        return fitmentService.getFitmentList();
    }

}
