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
import cn.hutool.core.util.ObjectUtil;
import com.alibaba.fastjson.JSONObject;
import com.udeve.BaseApiController;
import com.udeve.service.DynamicSubscriptionService;
import com.udeve.utils.JsonResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class DynamicSubscriptionController extends BaseApiController {

    @Autowired
    DynamicSubscriptionService dynamicSubscriptionService;


    @Operation(summary = "小程序订阅")
    @PostMapping("/v6/subscribe")
    @SaCheckLogin
    public JsonResponse subscribe(@RequestBody JSONObject req){
        Integer targetId = req.getInteger("target_id");
        String targetType = req.getString("target_type");
        Integer userId = (Integer) getUser().get("user_id");
        //target_id和target_type不能为空
        if(ObjectUtil.isEmpty(targetId) || ObjectUtil.isEmpty(targetType)){
            return JsonResponse.error("参数错误");
        }
        return dynamicSubscriptionService.subscribe(userId, targetId, targetType);
    }


    @Operation(summary = "小程序取消订阅")
    @PostMapping("/v6/unsubscribe")
    @SaCheckLogin
    public JsonResponse unSubscribe(@RequestBody JSONObject req){
        Integer targetId = req.getInteger("target_id");
        String targetType = req.getString("target_type");
        Integer userId = (Integer) getUser().get("user_id");
        //target_id和target_type不能为空
        if(ObjectUtil.isEmpty(targetId) || ObjectUtil.isEmpty(targetType)){
            return JsonResponse.error("参数错误");
        }
        return dynamicSubscriptionService.unsubscribe(userId,targetId,targetType);
    }


    @Operation(summary = "获取订阅的状态")
    @GetMapping("/v6/subscribe_status")
    public JsonResponse getSubscribeStatus(@RequestParam("target_id") Integer targetId, @RequestParam("target_type") String targetType){
        Object userId = getUser().get("user_id");
        if (ObjectUtil.isEmpty(userId)) {
            return JsonResponse.ok(false);
        }
        //target_id和target_type不能为空
        if(ObjectUtil.isEmpty(targetId) || ObjectUtil.isEmpty(targetType)){
            return JsonResponse.error("参数错误");
        }
        Boolean status = dynamicSubscriptionService.getSubscriptionStatus((Integer) userId, targetId, targetType);
        return JsonResponse.ok(status);
    }
}
