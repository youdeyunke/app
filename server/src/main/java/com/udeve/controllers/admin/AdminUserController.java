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
import com.udeve.request.AdminUserCreateRequest;
import com.udeve.request.AdminUserUpdateRequest;
import com.udeve.service.AdminUserService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminUserListVo;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;
import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
@Api(tags = "管理员账号管理")
public class AdminUserController extends BaseApiController {

    @Autowired
    AdminUserService adminUserService;

    @Operation(summary = "获取管理员账号列表", description = "获取管理员账号列表")
    @GetMapping(value = "/admin6/admin_users/")
    public JsonResponse getAdminUserList(){
        return adminUserService.getAdminUserList();
    }

    @Operation(summary = "更新管理员账号信息", description = "更新管理员账号信息")
    @PatchMapping(value = "/admin6/admin_users/{id}")
    @SaCheckPermission("update_adminuser")
    public JsonResponse updateAdminUser(@Valid @RequestBody AdminUserUpdateRequest body, @PathVariable("id") Integer id){
        return adminUserService.updateAdminUser(id,body, (Integer) getUser().get("user_id"));
    }

    @Operation(summary = "创建管理员账号", description = "创建管理员账号")
    @PostMapping(value = "/admin6/admin_users/")
    @SaCheckPermission("create_adminuser")
    public JsonResponse createAdminUser(@Valid @RequestBody AdminUserCreateRequest body){
        return adminUserService.createAdminUser(body, (Integer) getUser().get("user_id"));
    }

    @Operation(summary = "删除管理员账号", description = "删除管理员账号")
    @DeleteMapping(value = "/admin6/admin_users/{id}")
    @SaCheckPermission("delete_adminuser")
    public JsonResponse deleteAdminUser(@PathVariable("id") Integer id){
        return adminUserService.deleteAdminUser(id, (Integer) getUser().get("user_id"));
    }

    @Operation(summary = "更新管理员账号密码", description = "更新管理员账号密码")
    @PostMapping(value = "/admin6/admin_password")
    @SaCheckPermission("update_adminuser")
    public JsonResponse updateAdminPassword(@RequestBody JSONObject body){
        String old_password = (String) body.get("old_password");
        String new_password = (String) body.get("new_password");
        String new_password_confirm = (String) body.get("new_password_confirm");
        Integer id = (Integer) getUser().get("user_id");

        if (!ObjectUtil.equals(new_password,new_password_confirm)){
            return JsonResponse.error("两次密码不一致");
        }

        return adminUserService.changePassword(id, old_password, new_password, (Integer) getUser().get("user_id"));
    }

    @Operation(summary = "重置管理员的api秘钥",description = "重置管理员的api秘钥")
    @PatchMapping("/admin6/reset_api_key")
    @SaCheckPermission("update_adminuser")
    public JsonResponse resetApiKey(){
        return adminUserService.resetApiKey((Integer) getUser().get("user_id"));
    }

    @Operation(summary = "获取管理员信息", description = "获取管理员信息")
    @GetMapping(value = "/admin6/admin_users/mine")
    @SaCheckLogin
    public JsonResponse adminUserGetInfo(){
        return adminUserService.adminUserGetInfo((Integer) getUser().get("user_id"));
    }

}
