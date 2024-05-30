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
import com.udeve.request.AdminDistrictCreateRequest;
import com.udeve.request.AdminDistrictUpdateRequest;
import com.udeve.service.DistrictService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminDistrictListVo;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@SaCheckLogin
@Api(tags = "district管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminDistrictController extends BaseApiController {

    @Autowired
    DistrictService districtService;

    @Operation(summary = "拉取区域列表", description = "用于拉取区域列表")
    @GetMapping(value = "/admin6/districts/")
    public JsonResponse<List<AdminDistrictListVo>> getDistrictList(@RequestParam Map<String, Object> query){
        if(query.get("city_id")==null){
            return JsonResponse.ok(new ArrayList<AdminDistrictListVo>());
        }
        Integer cityId =  Integer.parseInt(query.get("city_id").toString());
        return districtService.getDistrictList(cityId);
    }

    @Operation(summary = "拉取区域详情信息", description = "用于拉取区域详情信息")
    @GetMapping(value = "/admin6/districts/{id}")
    public JsonResponse<AdminDistrictListVo> getDistrict(@PathVariable("id") Integer id){
        return districtService.getDistrict(id);
    }

    @Operation(summary = "更新区域信息", description = "用于更新区域信息")
    @PatchMapping(value = "/admin6/districts/{id}")
    public JsonResponse updateDistrict(@Valid @RequestBody AdminDistrictUpdateRequest district,@PathVariable("id") Integer id){
        return districtService.updateDistrict(id,district);
    }

    @Operation(summary = "新建区域信息", description = "用于新建区域信息")
    @PostMapping(value = "/admin6/districts/")
    public JsonResponse createDistrict(@Valid @RequestBody AdminDistrictCreateRequest district){
        return districtService.createDistrict(district);
    }

    @Operation(summary = "删除区域信息", description = "用于删除区域信息")
    @DeleteMapping(value = "/admin6/districts/{id}")
    public JsonResponse deleteDistrict(@PathVariable("id") Integer id){
        return districtService.deleteDistrict(id);
    }
}
