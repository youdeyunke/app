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
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import com.alibaba.fastjson.JSONObject;
import com.udeve.BaseApiController;
import com.udeve.request.QueryBookingLogsDto;
import com.udeve.service.BookingLogService;
import com.udeve.utils.JsonResponse;
import com.udeve.utils.annotation.IgnoringIdentity;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@SaCheckLogin
@Api(tags = "bookingLog管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminBookingLogController extends BaseApiController {

    @Autowired
    BookingLogService bookingLogService;

    @Operation(summary = "获取预约看房列表",description = "用于获取预约看房列表")
    @GetMapping("/admin6/booking_logs")
    public JsonResponse getBookingLogs(@RequestParam Map<String,Object> params){
        JSONObject queryJson = new JSONObject(params);
        QueryBookingLogsDto queryBookingLogsDto = JSONObject.parseObject(queryJson.toString(), QueryBookingLogsDto.class);
        return bookingLogService.getAdminBookingLog(queryBookingLogsDto);
    }

    @Operation(summary = "删除预约看房",description = "用于删除预约看房")
    @DeleteMapping("/admin6/booking_logs/{id}")
    @SaCheckPermission("delete_booking_log")
    public JsonResponse deleteBookingLogById(@PathVariable("id") Integer id){
        return bookingLogService.deleteBookingLogById(id);
    }

    @Operation(summary = "导出预约看房",description = "用于导出预约看房")
    @PostMapping("/admin6/booking_logs/export")
    @SaCheckPermission("download_booking_logs")
    @IgnoringIdentity("导出功能忽略身份")
    public void exportBookingLogs(@RequestBody QueryBookingLogsDto dto, HttpServletResponse response){
        bookingLogService.exportBookingLogs(dto,response);
    }

}
