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
import com.udeve.request.AdminMediaCatCreateRequest;
import com.udeve.request.AdminMediaCatUpdateRequest;
import com.udeve.request.AdminMediaItemCreateRequest;
import com.udeve.request.AdminMediaItemUpdateRequest;
import com.udeve.service.MediaCatService;
import com.udeve.service.MediaItemService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminMediaCatListVo;
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
@Api(tags = "楼盘相册管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminXiangceController extends BaseApiController {

    @Autowired
    MediaCatService mediaCatService;
    @Autowired
    MediaItemService mediaItemService;

    @Operation(summary = "获取楼盘相册分类列表", description = "获取楼盘相册分类列表")
    @GetMapping(value = "/admin6/media_cats/")
    public JsonResponse<List<AdminMediaCatListVo>> getMediaCatList(@RequestParam("target_type") String targetType, @RequestParam("target_id") Integer targetId) {
        return mediaCatService.getMediaCatList(targetType, targetId);
    }

    @Operation(summary = "获取楼盘相册分类详情", description = "获取楼盘相册分类详情")
    @GetMapping(value = "/admin6/media_cats/{id}")
    public JsonResponse getMediaCatDetail(@PathVariable("id") Integer id) {
        return mediaCatService.getMediaCatDetail(id);
    }

    @Operation(summary = "更新楼盘相册分类详情信息", description = "更新楼盘相册分类详情信息")
    @PatchMapping(value = "/admin6/media_cats/{id}")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse updateMediaCat(@Valid @RequestBody AdminMediaCatUpdateRequest mediaCat, @PathVariable("id") Integer id) {
        return mediaCatService.updateMediaCat(id,mediaCat);
    }

    @Operation(summary = "创建楼盘相册分类", description = "创建楼盘相册分类")
    @PostMapping(value = "/admin6/media_cats/")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse createMediaCat(@Valid @RequestBody AdminMediaCatCreateRequest mediaCat) {
        return mediaCatService.createMediaCat(mediaCat);
    }

    @Operation(summary = "删除楼盘相册分类", description = "删除楼盘相册分类")
    @DeleteMapping(value = "/admin6/media_cats/{id}")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse deleteMediaCat(@PathVariable("id") Integer id) {
        return mediaCatService.deleteMediaCat(id);
    }

    @Operation(summary = "更新楼盘相册信息", description = "更新楼盘相册信息")
    @PatchMapping(value = "/admin6/media_items/{id}")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse updateMediaItem(@PathVariable("id") Integer id, @Valid @RequestBody AdminMediaItemUpdateRequest mediaItem) {
        return mediaItemService.updateMediaItem(id,mediaItem);
    }

    @Operation(summary = "创建楼盘相册", description = "创建楼盘相册")
    @PostMapping(value = "/admin6/media_items/")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse createMediaItem(@Valid @RequestBody AdminMediaItemCreateRequest mediaItem) {
        return mediaItemService.createMediaItem(mediaItem);
    }

    @Operation(summary = "删除楼盘相册", description = "删除楼盘相册")
    @DeleteMapping(value = "/admin6/media_items/{id}")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse deleteMediaItem(@PathVariable("id") Integer id) {
        return mediaItemService.deleteMediaItem(id);
    }

    @Operation(summary = "楼盘相册相片排序", description = "楼盘相册相片排序")
    @PostMapping(value = "/admin6/media_items/update_order")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse updateMediaItemsOrder(@RequestBody JSONObject id) {
        List<Integer> ids = (List<Integer>) id.get("items");
        return mediaItemService.updateMediaItemsOrder(ids);
    }

    @Operation(summary = "楼盘相册分类排序", description = "楼盘相册分类排序")
    @PostMapping(value = "/admin6/media_cats/update_order")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse updateMediaCatsOrder(@RequestBody JSONObject id) {
        List<Integer> ids = (List<Integer>) id.get("items");
        return mediaCatService.updateMediaCatsOrder(ids);
    }

}
