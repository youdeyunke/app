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
import com.udeve.service.HotSearchService;
import com.udeve.utils.JsonResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HotSearchController extends BaseApiController {

    @Autowired
    HotSearchService hotSearchService;

    @Operation(summary = "获取热门搜索列表")
    @GetMapping(value = "/v6/hot_search")
    public JsonResponse getHotSearchList(){
        return hotSearchService.getHotSearchList();
    }

    @PostMapping(value = "/v6/hot_search")
    public JsonResponse createHoutSearch(@RequestBody JSONObject request){
        Integer postId = (Integer) request.get("post_id");
        return hotSearchService.createHoutSearch(postId);
    }

}
