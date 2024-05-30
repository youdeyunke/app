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
import com.udeve.request.AdminTypeCreateRequest;
import com.udeve.request.AdminTypeUpdateRequest;
import com.udeve.service.PostTypeService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminTypeListVo;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;

import javax.validation.Valid;
import java.util.List;

@RestController
@SaCheckLogin
@Api(tags = "楼盘户型管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminTypeController extends BaseApiController {

    @Autowired
    PostTypeService postTypeService;

    @Operation(summary = "获取户型列表", description = "获取户型列表")
    @GetMapping(value = "/admin6/types/")
    public JsonResponse<List<AdminTypeListVo>> getTypeList(@RequestParam("post_id") Integer postId) {
        return postTypeService.getTypeList(postId);
    }

    @Operation(summary = "更新户型详情信息", description = "更新户型详情信息")
    @PatchMapping(value = "/admin6/types/{id}")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse updateType(@Valid @RequestBody AdminTypeUpdateRequest type, @PathVariable("id") Integer id) {
        return postTypeService.updateType(id,type);
    }

    @Operation(summary = "创建户型", description = "创建户型")
    @PostMapping(value = "/admin6/types/")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse createType(@Valid @RequestBody AdminTypeCreateRequest type) {
        return postTypeService.createType(type);
    }

    @Operation(summary = "删除户型", description = "删除户型")
    @DeleteMapping(value = "/admin6/types/{id}")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse deleteType(@PathVariable("id") Integer id) {
        return postTypeService.deleteType(id);
    }

    @Operation(summary = "更新户型排序", description = "更新户型排序")
    @PostMapping(value = "/admin6/types/update_order")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse updateTypesOrder(@RequestBody JSONObject params) {
        List<Integer> ids = (List<Integer>) params.get("ids");
        return postTypeService.updateTypesOrder(ids);
    }

}
