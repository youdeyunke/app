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
import com.udeve.request.AdminPostBannerCreateRequest;
import com.udeve.request.AdminPostBannerUpdateRequest;
import com.udeve.service.PostBannerService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminPostBannerListVo;
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
@Api(tags = "post轮播图管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminPostBannerController extends BaseApiController {

    @Autowired
    PostBannerService postBannerService;

    @Operation(summary = "获取post轮播图列表", description = "用于获取post轮播图列表")
    @GetMapping(value = "/admin6/post_banners")
    public JsonResponse<List<AdminPostBannerListVo>> getPostBannerList(@RequestParam("post_id") Integer postId){
        return postBannerService.getPostBannerList(postId);
    }

    @Operation(summary = "更新post轮播图", description = "用于更新post轮播图")
    @PatchMapping(value = "/admin6/post_banners/{id}")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse updatePostBanner(@Valid @RequestBody AdminPostBannerUpdateRequest postBanner, @PathVariable("id") Integer id){
        return postBannerService.updatePostBanner(id,postBanner);
    }

    @Operation(summary = "创建post轮播图", description = "用于创建post轮播图")
    @PostMapping(value = "/admin6/post_banners")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse createPostBanner(@Valid @RequestBody AdminPostBannerCreateRequest postBanner){
        return postBannerService.createPostBanner(postBanner);
    }

    @Operation(summary = "删除post轮播图", description = "用于删除post轮播图")
    @DeleteMapping(value = "/admin6/post_banners/{id}")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse deletePostBanner(@PathVariable("id") Integer id){
        return postBannerService.deletePostBanner(id);
    }

}
