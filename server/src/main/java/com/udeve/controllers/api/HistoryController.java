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
import com.udeve.request.CommonRequest;
import com.udeve.request.HistoryCreateRequest;
import com.udeve.request.QuestionQueryRequest;
import com.udeve.service.MyHistoryService;
import com.udeve.utils.JsonResponse;
import io.swagger.v3.oas.annotations.Operation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class HistoryController extends BaseApiController{

    @Autowired
    private MyHistoryService myHistoryService;

    @PostMapping("/v6/history")
    @Operation(summary = "小程序用户创建历史记录接口")
    public JsonResponse createHistory(@RequestBody HistoryCreateRequest request){
        Map<Object, Object> user = getUser();
        Integer userId = (Integer) user.get("user_id");
        if(userId==null){
            return JsonResponse.ok();
        }
        request.setUserId(userId);
        return myHistoryService.createHistory(request);
    }

    @GetMapping("/v6/history")
    @Operation(summary = "小程序用户获取历史记录接口")
    @SaCheckLogin
    public JsonResponse getHistoryList(@RequestParam Map<String, Object> query){
        Map<Object, Object> user = getUser();
        Integer userId = (Integer) user.get("user_id");
        JSONObject queryJson = new JSONObject(query);
        CommonRequest queryDto = JSONObject.parseObject(queryJson.toString(), CommonRequest.class);
        return myHistoryService.getHistoryList(queryDto, userId);
    }

}
