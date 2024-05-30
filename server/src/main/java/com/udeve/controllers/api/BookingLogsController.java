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
import com.udeve.request.BookingLogsRequest;
import com.udeve.service.BookingLogService;
import com.udeve.utils.JsonResponse;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@RestController
@Api(tags = "客户预约接口")
@Validated
public class BookingLogsController extends BaseApiController {

    @Autowired
    BookingLogService bookingLogService;

    @Operation(summary = "添加客户预约楼盘信息",description = "添加客户预约楼盘信息")
    @PostMapping(value = "/v6/booking_logs")
    @SaCheckLogin
    @SaCheckRole("user")
    public JsonResponse addBookingLog(@Valid @RequestBody BookingLogsRequest bookingLogsRequest){
        Integer userId = (Integer) getUser().get("user_id");
        bookingLogsRequest.setUserId(userId);
        return bookingLogService.addBookingLog(bookingLogsRequest);
    }

    @Operation(summary = "根据状态查询预约结果",description = "根据状态查询预约结果")
    @GetMapping(value = "/v6/booking_logs/")
    @SaCheckLogin
    @SaCheckRole("user")
    public JsonResponse getBookingLogsList(@RequestParam("status") Integer status){
        Integer userId = (Integer) getUser().get("user_id");
        return bookingLogService.getBookingLogsList(userId,status);
    }

    @Operation(summary = "更新预定状态接口",description = "更新预定状态接口")
    @PutMapping(value = "/v6/booking_logs/{id}")
    @SaCheckLogin
    @SaCheckRole("user")
    public JsonResponse updateBookingStatus(@PathVariable("id") Integer id, @RequestBody @Min(value = 0,message = "不能小于0") @Max(value = 3,message = "不能大于3") Integer status){
        Integer userId = (Integer) getUser().get("user_id");
        return bookingLogService.updateBookingStatus(userId,id,status);
    }
}
