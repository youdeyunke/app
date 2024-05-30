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
import com.alibaba.fastjson.JSONObject;
import com.udeve.BaseApiController;
import com.udeve.request.CommonRequest;
import com.udeve.service.EventFollowerService;
import com.udeve.utils.JsonResponse;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@Api(tags = "楼盘动态用户订阅或取消接口")
public class EventFollowerController extends BaseApiController {

    @Autowired
    EventFollowerService eventFollowerService;

    /**
     * 拉取我订阅的楼盘动态列表
     */
    @GetMapping(value = "/v6/event_followers/mine")
    @Operation(summary = "我订阅的楼盘动态列表",description ="拉取我订阅的楼盘动态列表" )
    @SaCheckLogin
    @SaCheckRole("user")
    public JsonResponse getEventFollowersMine(@RequestParam Map<String,Object> query){
        JSONObject jsonObject = new JSONObject(query);
        CommonRequest commonRequest = JSONObject.parseObject(jsonObject.toString(), CommonRequest.class);
        Integer userId = (Integer) getUser().get("user_id");
        return eventFollowerService.getEventFollowersMine(userId,commonRequest);
    }
}
