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
import com.udeve.BaseApiController;
import com.udeve.request.AdminSysConfigCreateRequest;
import com.udeve.request.AdminSysConfigUpdateRequest;
import com.udeve.service.SysConfigService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminSysConfigListVo;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@SaCheckLogin
@Api(tags = "系统参数管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminSysConfigController extends BaseApiController {

    @Autowired
    SysConfigService sysConfigService;

    @Operation(summary = "获取系统参数列表", description = "获取系统参数列表")
    @GetMapping(value = "/admin6/sys_configs/")
    public JsonResponse<List<AdminSysConfigListVo>> getSysCofnigList(){
        return sysConfigService.getSysCofnigList();
    }

    @Operation(summary = "更新系统参数", description = "更新系统参数")
    @PatchMapping(value = "/admin6/sys_configs/{id}")
    public JsonResponse updateSysConfig(@Valid @RequestBody AdminSysConfigUpdateRequest updateRequest, @PathVariable("id") Integer id){
        return sysConfigService.updateSysConfig(id,updateRequest);
    }

    @Operation(summary = "创建系统参数", description = "创建系统参数")
    @PostMapping(value = "/admin6/sys_configs/")
    public JsonResponse createSysConfig(@Valid @RequestBody AdminSysConfigCreateRequest createRequest){
        return sysConfigService.createSysConfig(createRequest);
    }

    @Operation(summary = "删除系统参数", description = "删除系统参数")
    @DeleteMapping(value = "/admin6/sys_configs/{id}")
    public JsonResponse deleteSysConfig(@PathVariable("id") Integer id){
        return sysConfigService.deleteSysConfig(id);
    }

}
