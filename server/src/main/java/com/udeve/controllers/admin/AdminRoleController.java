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
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import com.udeve.request.AdminRoleCreateRequest;
import com.udeve.request.AdminRoleUpdateRequest;
import com.udeve.service.AdminRoleService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminRoleListVo;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
@Api(tags = "管理员身份管理")
public class AdminRoleController extends BaseApiController {

    @Autowired
    AdminRoleService adminRoleService;

    @Operation(summary = "获取身份列表", description = "获取身份列表")
    @GetMapping(value = "/admin6/roles")
    public JsonResponse<List<AdminRoleListVo>> getRoleList(){
        return adminRoleService.getRoleList();
    }

    @Operation(summary = "获取身份详情", description = "获取身份详情")
    @PatchMapping(value = "/admin6/roles/{id}")
    @SaCheckPermission("update_role")
    public JsonResponse updateRole(@Valid @RequestBody AdminRoleUpdateRequest updateDto,@PathVariable("id") Integer id){
        return adminRoleService.updateRole(id,updateDto, (Integer) getUser().get("user_id"));
    }

    @Operation(summary = "创建身份", description = "创建身份")
    @PostMapping(value = "/admin6/roles")
    @SaCheckPermission("create_role")
    public JsonResponse createRole(@Valid @RequestBody AdminRoleCreateRequest updateDto){
        return adminRoleService.createRole(updateDto, (Integer) getUser().get("user_id"));
    }

    @Operation(summary = "删除身份", description = "删除身份")
    @DeleteMapping(value = "/admin6/roles/{id}")
    @SaCheckPermission("delete_role")
    public JsonResponse deleteRole(@PathVariable("id") Integer id){
        return adminRoleService.deleteRole(id, (Integer) getUser().get("user_id"));
    }

    @GetMapping(value = "/admin6/team_tree")
    public JsonResponse getTeamTree(){
        return adminRoleService.getTeamTree();
    }

}
