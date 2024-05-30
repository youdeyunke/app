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
import cn.hutool.core.util.ObjectUtil;
import com.alibaba.fastjson.JSONObject;
import com.udeve.request.AdminLogQueryRequest;
import com.udeve.service.AdminLogService;
import com.udeve.utils.JsonResponse;
import com.udeve.utils.annotation.IgnoringIdentity;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@SaCheckLogin
@Api(tags = "管理后台log管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminLogController extends BaseApiController {

    @Autowired
    AdminLogService adminLogService;

    @Operation(summary = "获取log列表", description = "用于获取log列表")
    @GetMapping(value = "/admin6/logs")
    public JsonResponse<JSONObject> getLogs(@RequestParam Map<String, Object> query){
        JSONObject queryJson = new JSONObject(query);
        AdminLogQueryRequest queryDto = JSONObject.parseObject(queryJson.toString(), AdminLogQueryRequest.class);
        return adminLogService.getLogs(queryDto);
    }

    @Operation(summary = "根据条件导出日志",description = "用于导出条件查询的日志")
    @PostMapping("/admin6/logs/export")
    @SaCheckPermission("export_logs")
    @IgnoringIdentity("导出功能忽略身份")
    public void exportLogs(@RequestBody AdminLogQueryRequest adminLogQueryRequest, HttpServletResponse response){
        adminLogService.exportLogs(adminLogQueryRequest,response);
    }

    @Operation(summary = "创建日志记录")
    @PostMapping("/admin6/logs/create")
    public JsonResponse createAdminLog(@RequestBody JSONObject req){
        String type = req.getString("type");
        String operation = req.getString("operation");
        if (ObjectUtil.isEmpty(type)){
            return JsonResponse.error("操作类型不能为空");
        }
        if (ObjectUtil.isEmpty(operation)){
            return JsonResponse.error("操作内容不能为空");
        }
        return adminLogService.createAdminLog((Integer) getUser().get("user_id"),type,operation);
    }

}
