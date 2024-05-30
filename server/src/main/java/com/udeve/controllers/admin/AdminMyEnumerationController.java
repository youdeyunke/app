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
import com.udeve.request.AdminMyEnumerationCreateRequest;
import com.udeve.request.AdminMyEnumerationUpdateRequest;
import com.udeve.service.MyEnumerationService;
import com.udeve.utils.JsonResponse;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;




import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;

import javax.validation.Valid;
import java.util.Map;

@RestController
@SaCheckLogin
@Api(tags = "枚举值数据管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminMyEnumerationController extends BaseApiController {

    @Autowired
    MyEnumerationService enumerationService;

    @Autowired
    ModelMapper modelMapper;

    @Operation(summary = "获取枚举值列表", description = "用于获取枚举值列表")
    @GetMapping(value = "/admin6/enumerations/")
    public JsonResponse<JSONObject> getEnumerationList(@RequestParam Map<String, Object> query){
        JSONObject queryJson = new JSONObject(query);
        String cat = queryJson.getString("cat");
        return enumerationService.getEnumerationList(cat);
    }

    @Operation(summary = "创建枚举值", description = "用于创建枚举值")
    @PostMapping(value = "/admin6/enumerations/")
    @SaCheckPermission("update_myconfig_enum")
    public JsonResponse createEnumeration(@Valid @RequestBody AdminMyEnumerationCreateRequest enumeration){

        return enumerationService.createEnumeration(enumeration);
    }

    @Operation(summary = "更新枚举值", description = "用于更新枚举值")
    @PatchMapping(value = "/admin6/enumerations/{id}")
    @SaCheckPermission("update_myconfig_enum")
    public JsonResponse updateEnumeration(@Valid @RequestBody AdminMyEnumerationUpdateRequest enumeration,@PathVariable("id") Integer id){

        return enumerationService.updataEnumeration(id,enumeration);
    }

    @Operation(summary = "删除枚举值", description = "用于删除枚举值")
    @DeleteMapping(value = "/admin6/enumerations/{id}")
    @SaCheckPermission("update_myconfig_enum")
    public JsonResponse deleteEnumeration(@PathVariable("id") Integer id){
        return enumerationService.deleteEnumeration(id);
    }

}
