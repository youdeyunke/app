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
import com.udeve.request.AdminVideoCreateRequest;
import com.udeve.request.AdminVideoQueryRequest;
import com.udeve.request.AdminVideoUpdateRequest;
import com.udeve.service.VideoSerivce;
import com.udeve.utils.JsonResponse;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@Api(tags = "视频管理")
@SaCheckLogin
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminVideoController extends BaseApiController {

    @Autowired
    VideoSerivce videoSerivce;

    @Operation(summary = "拉取视频列表")
    @GetMapping("/admin6/videos")
    public JsonResponse getVideoList(@RequestParam Map<String,Object> map){
        JSONObject queryRequestMap = new JSONObject(map);
        AdminVideoQueryRequest queryRequest = JSONObject.parseObject(queryRequestMap.toString(), AdminVideoQueryRequest.class);
        return videoSerivce.getVideoList(queryRequest);
    }

    @Operation(summary = "创建视频")
    @PostMapping("/admin6/videos")
    @SaCheckPermission("create_video")
    public JsonResponse createVideoInfo(@Validated @RequestBody AdminVideoCreateRequest adminVideoCreateRequest){
        return videoSerivce.createVideoInfo((Integer) getUser().get("user_id"),adminVideoCreateRequest);
    }

    @Operation(summary = "删除视频")
    @DeleteMapping("/admin6/videos/{id}")
    @SaCheckPermission("delete_video")
    public JsonResponse deleteVideoById(@PathVariable("id") Integer id){
        return videoSerivce.deleteVideoById((Integer) getUser().get("user_id"),id);
    }

    @Operation(summary = "修改视频信息")
    @PatchMapping("/admin6/videos/{id}")
    @SaCheckPermission("update_video")
    public JsonResponse updateVideoInfo(@PathVariable("id") Integer id, @Validated @RequestBody AdminVideoUpdateRequest videoUpdateRequest){
        return videoSerivce.updateVideoInfo((Integer) getUser().get("user_id"),id,videoUpdateRequest);
    }
}
