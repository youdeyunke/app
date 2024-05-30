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
import com.udeve.service.NewPostService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminPostNewListVo;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;

import java.util.List;

@RestController
@SaCheckLogin
@Api(tags = "楼盘新闻管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminNewsPostController  extends BaseApiController {

    @Autowired
    NewPostService newPostService;

    @Operation(summary = "获取楼盘新闻列表", description = "用于获取楼盘新闻列表")
    @GetMapping("/admin6/post_news")
    public JsonResponse<List<AdminPostNewListVo>> getNewPostList(@RequestParam("post_id") Integer postId){
        return newPostService.getNewPostList(postId);
    }

    @Operation(summary = "更新楼盘新闻", description = "用于更新楼盘新闻")
    @PatchMapping("/admin6/post_news/{id}")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse updateNewPost(@PathVariable("id") Integer postId , @RequestBody JSONObject newIds){
        List<Integer> ids = (List<Integer>) newIds.get("news_ids");
        return newPostService.updateNewPost(postId,ids);
    }

}
