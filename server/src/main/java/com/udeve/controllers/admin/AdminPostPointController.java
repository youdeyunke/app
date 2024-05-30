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
import com.udeve.request.AdminPostPointCreateRequest;
import com.udeve.request.AdminPostPointUpdateRequest;
import com.udeve.service.PostPointService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminPostPointListVo;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;

import javax.validation.Valid;
import java.util.List;

@RestController
@SaCheckLogin
@Api(tags = "post亮点管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminPostPointController extends BaseApiController {

    @Autowired
    PostPointService postPointService;

    @Operation(summary = "获取post亮点列表", description = "用于获取post亮点列表")
    @GetMapping(value = "/admin6/post_points")
    public JsonResponse<List<AdminPostPointListVo>> getPostPointList(@RequestParam("post_id") Integer postId) {
        return postPointService.getPostPointList(postId);
    }

    @Operation(summary = "更新post亮点", description = "用于更新post亮点")
    @PatchMapping(value = "/admin6/post_points/{id}")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse updatePostPoint(@Valid @RequestBody AdminPostPointUpdateRequest postPoint, @PathVariable("id") Integer id) {
        return postPointService.updatePostPoint(id,postPoint);
    }

    @Operation(summary = "创建post亮点", description = "用于创建post亮点")
    @PostMapping(value = "/admin6/post_points")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse createPostPoint(@Valid @RequestBody AdminPostPointCreateRequest postPoint) {
        return postPointService.createPostPoint(postPoint);
    }

    @Operation(summary = "删除post亮点", description = "用于删除post亮点")
    @DeleteMapping(value = "/admin6/post_points/{id}")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse deletePostPoint(@PathVariable("id") Integer id) {
        return postPointService.deletePostPoint(id);
    }

}
