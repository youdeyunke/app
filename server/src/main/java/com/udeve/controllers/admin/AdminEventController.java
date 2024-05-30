package com.udeve.controllers.admin;
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
import com.udeve.request.AdminEventCreateRequest;
import com.udeve.request.AdminEventUpdateRequest;
import com.udeve.request.EventQueryRequest;
import com.udeve.service.EventService;
import com.udeve.utils.JsonResponse;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Map;

@RestController
@SaCheckLogin
@Api(tags = "楼盘动态管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminEventController extends BaseApiController {

    @Autowired
    EventService eventService;
    @Autowired
    ModelMapper modelMapper;

    @Operation(summary = "拉取楼盘动态列表", description = "用于拉取楼盘动态列表")
    @GetMapping(value = "/admin6/events")
    public JsonResponse<JSONObject> getEventList(@RequestParam Map<String, Object> query){
        JSONObject queryJson = new JSONObject(query);
        EventQueryRequest queryDto = JSONObject.parseObject(queryJson.toString(), EventQueryRequest.class);

        return eventService.getEventList(queryDto);
    }

    @Operation(summary = "修改楼盘动态详情信息", description = "用于拉取楼盘动态详情信息")
    @PatchMapping(value = "/admin6/events/{id}")
    public JsonResponse updateEvent(@Valid @RequestBody AdminEventUpdateRequest updateDto, @PathVariable("id") Integer id){
        return eventService.updateEvent(id,updateDto, (Integer) getUser().get("user_id"));
    }

    @Operation(summary = "新建楼盘动态信息", description = "用于新建楼盘动态信息")
    @PostMapping(value = "/admin6/events")
    public JsonResponse createEvent(@Valid @RequestBody AdminEventCreateRequest updateDto){
        return eventService.createEvent(updateDto, (Integer) getUser().get("user_id"));
    }

    @Operation(summary = "删除楼盘动态信息", description = "用于删除楼盘动态信息")
    @DeleteMapping(value = "/admin6/events/{id}")
    public JsonResponse deleteEvent(@PathVariable("id") Integer id){
        return eventService.deleteEvent(id, (Integer) getUser().get("user_id"));
    }
}
