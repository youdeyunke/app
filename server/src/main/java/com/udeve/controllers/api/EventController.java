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
import com.alibaba.fastjson.JSONObject;
import com.udeve.BaseApiController;
import com.udeve.request.CreateEventsRequest;
import com.udeve.request.EventQueryRequest;
import com.udeve.service.EventService;
import com.udeve.utils.JsonResponse;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.Map;

@RestController
@Api(tags = "楼盘动态接口")
public class EventController extends BaseApiController {

    @Autowired
    EventService eventService;

    @Operation(summary = "小程序获取楼盘动态列表接口")
    @GetMapping(value = "/v6/events")
    public JsonResponse Index(@RequestParam Map<String, Object> query) {
        JSONObject queryJson = new JSONObject(query);
        EventQueryRequest queryDto = JSONObject.parseObject(queryJson.toString(), EventQueryRequest.class);
        return eventService.getWeappEventList(queryDto.getPostId(), queryDto.getCatId());
    }

    @Operation(summary = "小程序获取楼盘动态分类列表")
    @GetMapping(value = "/v6/event_cats")
    public JsonResponse getEventCatsList(){
        return eventService.getEventCatsList();
    }

    @Operation(summary = "小程序发布楼盘动态")
    @PostMapping(value = "/v6/events")
    @SaCheckLogin
    public JsonResponse createEvent(@Valid @RequestBody CreateEventsRequest createEventsRequest){
        Integer userId = (Integer) getUser().get("user_id");
        return eventService.weappCreateEvent(userId,createEventsRequest);
    }

    @Operation(summary = "小程序删除楼盘动态")
    @DeleteMapping(value = "/v6/events/{id}")
    @SaCheckLogin
    public JsonResponse deleteEventById(@PathVariable("id") Integer id){
        Integer userId = (Integer) getUser().get("user_id");
        return eventService.deleteEventById(userId,id);
    }
}
