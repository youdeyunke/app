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
import com.udeve.request.AdminTagCreateRequest;
import com.udeve.request.AdminTagUpdateRequest;
import com.udeve.request.CommonRequest;
import com.udeve.service.TagService;
import com.udeve.utils.JsonResponse;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;

import javax.validation.Valid;
import java.util.Map;

@RestController
@SaCheckLogin
@Api(tags = "楼盘tag管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminTagController extends BaseApiController {

    @Autowired
    TagService tagService;

    @Operation(summary = "获取tag列表", description = "获取tag列表")
    @GetMapping(value = "/admin6/tags")
    public JsonResponse getTagList(@RequestParam Map<String,Object> query){
        JSONObject queryJson = new JSONObject(query);
        CommonRequest queryDto = JSONObject.parseObject(queryJson.toString(), CommonRequest.class);
        return tagService.getTagList(queryDto);
    }

    @Operation(summary = "获取tag详情", description = "获取tag详情")
    @GetMapping(value = "/admin6/tags/{id}")
    public JsonResponse getTagDetail(@PathVariable("id") Integer id){
        return tagService.getTagDetail(id);
    }

    @Operation(summary = "更新tag", description = "更新tag")
    @PatchMapping(value = "/admin6/tags/{id}")
    public JsonResponse updateTag(@Valid @RequestBody AdminTagUpdateRequest tag, @PathVariable("id") Integer id){
        return tagService.updateTag(id,tag);
    }

    @Operation(summary = "创建tag", description = "创建tag")
    @PostMapping(value = "/admin6/tags/")
    public JsonResponse createTag(@Valid @RequestBody AdminTagCreateRequest tag){
        return tagService.createTag(tag);
    }

    @Operation(summary = "删除tag", description = "删除tag")
    @DeleteMapping(value = "/admin6/tags/{id}")
    public JsonResponse deleteTag(@PathVariable("id") Integer id){
        return tagService.deleteTag(id);
    }
}
