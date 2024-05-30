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

import com.udeve.BaseApiController;
import com.udeve.request.WeappUpdateFirstScreenAddRequest;
import com.udeve.service.FirstScreenAddService;
import com.udeve.utils.JsonResponse;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = "小程序开屏广告")
public class FirstScreenAddController extends BaseApiController {

    @Autowired
    FirstScreenAddService firstScreenAddService;

     @GetMapping(value = "/v6/first_screen_adds/")
     public JsonResponse getWeappFirstScreen() {
        return firstScreenAddService.getWeappFirstScreen();
     }

     @PutMapping(value = "/v6/first_screen_adds/{id}")
     public JsonResponse updateFirstScreenAdd(@PathVariable("id") Integer id, @RequestBody WeappUpdateFirstScreenAddRequest request){
         return firstScreenAddService.weappUpdateFirstScreenAdd(id, request);
     }
}
