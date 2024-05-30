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
import cn.dev33.satoken.annotation.SaMode;
import com.udeve.BaseApiController;
import com.udeve.service.AdminBookingConfigService;
import com.udeve.utils.JsonResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookingConfigController extends BaseApiController {

    @Autowired
    AdminBookingConfigService bookingConfigService;
    @Operation(summary = "小程序根据楼盘id获取此楼盘的预约时间配置数据")
    @GetMapping("/v6/booking_config/{id}")
    public JsonResponse getBookingConfigsByPostId(@PathVariable("id") Integer postId){
        return bookingConfigService.getWeappBookingConfigByPostIdAndStatusTrue(postId);
    }


}
