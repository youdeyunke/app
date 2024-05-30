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
import com.udeve.request.AdminPostReviewCreateRequest;
import com.udeve.request.AdminPostReviewUpdateRequest;
import com.udeve.service.PostReviewService;
import com.udeve.utils.JsonResponse;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@SaCheckLogin
@Api(tags = "楼盘评测")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminPostReviewController extends BaseApiController {

    @Autowired
    PostReviewService postReviewService;

    @Operation(summary = "获取楼盘评测列表", description = "用于获取楼盘评测列表")
    @GetMapping(value = "/admin6/post_reviews")
    public JsonResponse getPostReviewList(@RequestParam("post_id") Integer postId) {
        return postReviewService.getPostReviewList(postId);
    }

    @Operation(summary = "更新楼盘评测", description = "用于更新楼盘评测")
    @PatchMapping(value = "/admin6/post_reviews/{id}")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse updatePostReview(@Valid @RequestBody AdminPostReviewUpdateRequest postReview, @PathVariable("id") Integer id) {
        return postReviewService.updatePostReview(id,postReview);
    }

    @Operation(summary = "创建楼盘评测", description = "用于创建楼盘评测")
    @PostMapping(value = "/admin6/post_reviews")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse createPostReview(@Valid @RequestBody AdminPostReviewCreateRequest postReview) {
        return postReviewService.createPostReview(postReview);
    }

    @Operation(summary = "删除楼盘评测", description = "用于删除楼盘评测")
    @DeleteMapping(value = "/admin6/post_reviews/{id}")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse deletePostReview(@PathVariable("id") Integer id) {
        return postReviewService.deletePostReview(id);
    }
}
