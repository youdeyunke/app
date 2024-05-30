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
import com.udeve.request.AdminPermissionCreateRequest;
import com.udeve.request.AdminPermissionUpdateRequest;
import com.udeve.service.PermissionItemService;
import com.udeve.utils.JsonResponse;
import com.udeve.utils.annotation.IgnoringIdentity;
import com.udeve.vo.AdminPermissionListVo;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import com.udeve.BaseApiController;

import javax.validation.Valid;

@RestController
@SaCheckLogin
@Api(tags = "permission管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminPermissionController extends BaseApiController {

    @Autowired
    PermissionItemService permissionItemService;

    @Operation(summary = "获取permission列表", description = "用于获取permission列表")
    @GetMapping(value = "/admin6/permission_items")
    public JsonResponse<List<AdminPermissionListVo>> getPermissionList(){
        return permissionItemService.getPermissionList();
    }

    @Operation(summary = "更新permission", description = "用于更新permission")
    @PatchMapping(value = "/admin6/permission_items/{id}")
    @SaCheckPermission("update_permission_item")
    public JsonResponse updatePermissionItem(@Valid @RequestBody AdminPermissionUpdateRequest permissionItem, @PathVariable("id") Integer id){
        return permissionItemService.updatePermissionItem(id,permissionItem);
    }

    @Operation(summary = "创建permission", description = "用于创建permission")
    @PostMapping(value = "/admin6/permission_items")
    @SaCheckPermission("create_permission_item")
    public JsonResponse createPermissionItem(@Valid @RequestBody AdminPermissionCreateRequest permissionItem){
        return permissionItemService.createPermissionItem(permissionItem);
    }

    @Operation(summary = "删除permission", description = "用于删除permission")
    @DeleteMapping(value = "/admin6/permission_items/{id}")
    @SaCheckPermission("delete_permission_item")
    public JsonResponse deletePermissionItem(@PathVariable("id") Integer id){
        return permissionItemService.deletePermissionItem(id);
    }

    @Operation(summary = "获取permission树", description = "用于获取permission树")
    @GetMapping(value = "/admin6/permission_items/tree")
    public JsonResponse getPermissionTree(){
        return permissionItemService.getPermissionTree();
    }

    @Operation(summary = "根据user获取相关permission菜单", description = "用于根据user获取相关permission菜单")
    @GetMapping(value = "/admin6/menus")
    public JsonResponse getMenus(){
        Map<Object, Object> user = getUser();
        Integer userId = (Integer) user.get("user_id");
        return permissionItemService.getMenus(userId);
    }

}
