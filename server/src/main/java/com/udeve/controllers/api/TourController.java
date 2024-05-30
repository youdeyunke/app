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

import com.alibaba.fastjson.JSONObject;
import com.udeve.BaseApiController;
import com.udeve.request.*;
import com.udeve.service.TourService;
import com.udeve.utils.JsonResponse;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@Slf4j
@Api("活动相关接口")
public class TourController extends BaseApiController {
    @Autowired
    TourService tourService;

    @GetMapping("/v6/tours/{id}")
    public JsonResponse show(@PathVariable("id") Integer tourId) {
        return tourService.getTourDetail(tourId);
    }

    @GetMapping("/v6/tours")
    public JsonResponse getTourList(@RequestParam Map<String, Object> query){
        JSONObject queryJson = new JSONObject(query);
        TourQueryRequest queryDto = JSONObject.parseObject(queryJson.toString(), TourQueryRequest.class);
        queryDto.setScope("public");
        return tourService.getWeappTourList(queryDto);
    }

}
