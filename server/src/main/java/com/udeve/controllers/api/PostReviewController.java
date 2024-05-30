package com.udeve.controllers.api;
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
import com.udeve.service.PostReviewService;
import com.udeve.utils.JsonResponse;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(tags = "楼盘评测接口")
@Slf4j
public class PostReviewController extends BaseApiController {

    @Autowired
    PostReviewService postReviewService;

    @Operation(summary = "获取楼盘评测ByPostId", description = "用于通过postId获取楼盘评测")
    @GetMapping(value = "/v6/post_reviews/{id}")
    public JsonResponse getPostReviewById(@PathVariable("id") Integer id) {
        return postReviewService.getPostReviewList(id);
    }
}
