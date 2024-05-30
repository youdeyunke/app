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
import com.alibaba.fastjson.JSONObject;
import com.udeve.BaseApiController;
import com.udeve.request.AdminFirstScreenAddCreateRequest;
import com.udeve.request.AdminFirstScreenAddUpdateRequest;
import com.udeve.request.CommonRequest;
import com.udeve.service.FirstScreenAddService;
import com.udeve.utils.JsonResponse;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@SaCheckLogin
@Api(tags = "开屏广告管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminFirstScreenAddController extends BaseApiController {

    @Autowired
    FirstScreenAddService firstScreenAddService;

    @Operation(summary = "拉取开屏广告列表", description = "用于拉取开屏广告列表")
    @GetMapping(value = "/admin6/first_screen_adds")
    public JsonResponse<JSONObject> getFlashList(@RequestParam Map<String, Object> query){
        JSONObject queryJson = new JSONObject(query);
        CommonRequest queryDto = JSONObject.parseObject(queryJson.toString(), CommonRequest.class);
        return firstScreenAddService.getFlashList(queryDto);
    }

    @Operation(summary = "拉取开屏广告详情信息", description = "用于拉取开屏广告详情信息")
    @PostMapping(value = "/admin6/first_screen_adds/")
    public JsonResponse createFlash(@Valid @RequestBody AdminFirstScreenAddCreateRequest createRequest){
        return firstScreenAddService.createFlash(createRequest);
    }

    @Operation(summary = "更新开屏广告信息", description = "用于更新开屏广告信息")
    @PatchMapping(value = "/admin6/first_screen_adds/{id}")
    public JsonResponse updateFlash(@Valid @RequestBody AdminFirstScreenAddUpdateRequest updateRequest,@PathVariable("id") Integer id){
        return firstScreenAddService.updateFlash(id,updateRequest);
    }

    @Operation(summary = "删除开屏广告信息", description = "用于删除开屏广告信息")
    @DeleteMapping(value = "/admin6/first_screen_adds/{id}")
    public JsonResponse deleteFlash(@PathVariable("id") Integer id){
        return firstScreenAddService.deleteFlash(id);
    }

}
