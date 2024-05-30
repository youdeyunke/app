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
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import cn.hutool.core.util.ObjectUtil;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.udeve.BaseApiController;
import com.udeve.request.BookingConfigUpdateRequest;
import com.udeve.service.AdminBookingConfigService;
import com.udeve.utils.JsonResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@SaCheckLogin
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminBookingConfigController extends BaseApiController {

    @Autowired
    AdminBookingConfigService adminBookingConfigService;

    @Operation(summary = "根据楼盘id获取此楼盘的预约时间配置")
    @GetMapping("/admin6/booking_configs/{id}")
    public JsonResponse getBookingConfigs(@PathVariable("id") Integer postId) {
        return adminBookingConfigService.getBookingConfigByPostId(postId);
    }

    @Operation(summary = "根据楼盘id修改此楼盘的预约时间配置")
    @PatchMapping("/admin6/booking_configs/{id}")
    public JsonResponse updateBookingConfig(@PathVariable("id") Integer postId,@RequestBody JSONArray updateRequest){
        if (ObjectUtil.isEmpty(updateRequest)){
            return JsonResponse.error("时间配置信息不能为空");
        }
        JSONArray objects = new JSONArray(updateRequest);
        List<BookingConfigUpdateRequest> updateRequests = JSONArray.parseArray(objects.toJSONString(), BookingConfigUpdateRequest.class);
        return adminBookingConfigService.updateBookingConfig(postId,updateRequests);

    }
}
