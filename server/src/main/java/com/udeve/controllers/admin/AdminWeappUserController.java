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
import cn.hutool.core.util.ObjectUtil;
import com.alibaba.fastjson.JSONObject;
import com.udeve.BaseApiController;
import com.udeve.request.CommonRequest;
import com.udeve.service.AdminWeappUserService;
import com.udeve.utils.JsonResponse;
import com.udeve.utils.annotation.IgnoringIdentity;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Slf4j
@RestController
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
@Api(tags = "用户账号")
public class AdminWeappUserController extends BaseApiController {

    @Autowired
    AdminWeappUserService adminWeappUserService;

    @Operation(summary = "获取小程序用户列表", description = "获取小程序用户列表")
    @GetMapping(value = "/admin6/user_profile/")
    public JsonResponse getUserProfileList(@RequestParam Map<String, Object> query){
        JSONObject queryJson = new JSONObject(query);
        CommonRequest commonRequest = JSONObject.parseObject(queryJson.toString(), CommonRequest.class);

        return adminWeappUserService.getWeappUserList(commonRequest);
    }

    @Operation(summary = "管理后台问答拉取用户",description = "管理后台问答拉取用户")
    @GetMapping("/admin6/users/{id}")
    public JsonResponse getWeappUserDetail(@PathVariable("id") Integer id){
        return adminWeappUserService.getWeappUserDetail(id);
    }

    @Operation(summary = "添加备注")
    @PatchMapping("/admin6/users/remark/{id}")
    public JsonResponse updateWeappUserRemark(@PathVariable("id") Integer id, @RequestBody JSONObject req){
        String remark = req.getString("remark");
        if (ObjectUtil.isEmpty(remark)) {
            return JsonResponse.error("备注不能为空！");
        }
        if (remark.length()>=100) {
            return JsonResponse.error("备注长度超出限制！");
        }
        return adminWeappUserService.updateWeappUserRemark(id,remark);
    }

    @Operation(summary = "拉黑小程序用户", description = "拉黑小程序用户")
    @PatchMapping(value = "/admin6/user_profile/ban/{id}")
    public JsonResponse banUser(@PathVariable("id") Integer id){
        return adminWeappUserService.banUser(id);
    }

    @Operation(summary = "导出客户账号列表",description = "用于导出客户账号数据列表")
    @PostMapping("/admin6/user_profile/export")
    @SaCheckPermission("export_user_profile")
    @IgnoringIdentity("导出功能忽略身份")
    public void exportUserProfile(@RequestBody CommonRequest commonRequest, HttpServletResponse response){
        adminWeappUserService.exportUserProfile(getUser(),commonRequest,response);
    }

}
