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
import com.udeve.request.AdminMediaFIleCreateRequest;
import com.udeve.request.AdminMediaFIleUpdateRequest;
import com.udeve.request.MediaFileQueryRequest;
import com.udeve.service.MediaFileService;
import com.udeve.utils.JsonResponse;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;

import javax.validation.Valid;
import java.util.Map;

@RestController
@SaCheckLogin
@Api(tags = "文件管理接口")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
@Validated
public class AdminMediaFileController extends BaseApiController {

    @Autowired
    MediaFileService mediaFileService;

    @Operation(summary = "获取文件列表", description = "用于获取文件列表")
    @GetMapping(value = "/admin6/media_files")
    public JsonResponse<JSONObject> getMediaFiles(@RequestParam Map<String,Object> query){
        JSONObject queryJson = new JSONObject(query);
        MediaFileQueryRequest mediaFileQuery = JSONObject.parseObject(queryJson.toString(), MediaFileQueryRequest.class);
        return mediaFileService.getMediaFiles(mediaFileQuery);
    }

    @Operation(summary = "创建文件", description = "用于创建文件")
    @PostMapping(value = "/admin6/media_files")
    public JsonResponse createMediaFile(@Valid @RequestBody AdminMediaFIleCreateRequest mediaFIleCreate){
        return mediaFileService.createMediaFile(getUser().get("user_name").toString(),mediaFIleCreate);
    }

    @Operation(summary = "更新文件", description = "用于更新文件")
    @PatchMapping(value = "/admin6/media_files/{id}")
    public JsonResponse updateMediaFile(@PathVariable("id") Integer id,@Valid @RequestBody AdminMediaFIleUpdateRequest mediaFIleupdate){
        return mediaFileService.updateMediaFile(id,mediaFIleupdate);
    }

    @Operation(summary = "删除文件", description = "用于删除文件")
    @DeleteMapping(value = "/admin6/media_files/{id}")
    public JsonResponse deleteMediaFile(@PathVariable("id") Integer id){
        return mediaFileService.deleteMediaFile(id);
    }


}
