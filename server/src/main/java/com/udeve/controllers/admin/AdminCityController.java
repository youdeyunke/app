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
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import com.alibaba.fastjson.JSONObject;
import com.udeve.request.AdminCityCreateRequest;
import com.udeve.request.AdminCityUpdateRequest;
import com.udeve.service.CityService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminCityListVo;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@SaCheckLogin
@Api(tags = "city管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminCityController extends BaseApiController {

    @Autowired
    CityService cityService;

    @Operation(summary = "拉取city列表", description = "用于拉取city列表")
    @GetMapping(value = "/admin6/city/")
    public JsonResponse<List<AdminCityListVo>> getCityList(){
        return cityService.getCityList();
    }

    @Operation(summary = "拉取city详情", description = "用于拉取city详情")
    @GetMapping(value = "/admin6/city/{id}")
    public JsonResponse<AdminCityListVo> getCityDetail(@PathVariable("id") Integer id){
        return cityService.getCityDetail(id);
    }

    @Operation(summary = "更新city", description = "用于更新city")
    @PatchMapping(value = "/admin6/city/{id}")
    public JsonResponse updateCity(@Valid @RequestBody AdminCityUpdateRequest city, @PathVariable("id") Integer id){
        return cityService.updateCity(id,city);
    }

    @Operation(summary = "新建city", description = "用于新建city")
    @PostMapping(value = "/admin6/city/")
    public JsonResponse createCity(@Valid @RequestBody AdminCityCreateRequest city){
        return cityService.createCity(city);
    }

    @Operation(summary = "删除city", description = "用于删除city")
    @DeleteMapping(value = "/admin6/city/{id}")
    public JsonResponse deleteCity(@PathVariable("id") Integer id){
        return cityService.deleteCity(id);
    }

    @Operation(summary = "设置默认city", description = "用于设置默认city")
    @PatchMapping(value = "/admin6/city/set_default")
    public JsonResponse setDefaultCity(@RequestBody Map<String, Object> query){
        Integer id = (Integer) query.get("id");
        return cityService.setDefaultCity(id);
    }

    @Operation(summary = "拉取city树", description = "用于拉取city树")
    @GetMapping(value = "/admin6/city_tree")
    public JsonResponse<List<JSONObject>> getCityTree(){
        return cityService.getCityTree();
    }

    @Operation(summary = "拉取city树", description = "拉取公开的city树")
    @GetMapping(value = "/admin6/pub_city_tree")
    public JsonResponse<List<JSONObject>> getPublicCityTree(){
        return cityService.getPublicCityTree();
    }
}
