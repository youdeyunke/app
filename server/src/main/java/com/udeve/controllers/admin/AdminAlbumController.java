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
import com.udeve.request.AdminAlbumCreateRequest;
import com.udeve.request.AdminAlbumUpdateRequest;
import com.udeve.service.AlbumService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminAlbumListVo;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;
import javax.validation.Valid;
import java.util.List;

@RestController
@SaCheckLogin
@Api(tags = "楼盘分类管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminAlbumController extends BaseApiController {

    @Autowired
    AlbumService albumService;

    @Operation(summary = "拉取楼盘分类列表", description = "用于拉取楼盘分类列表")
    @GetMapping(value = "/admin6/albums/")
    public JsonResponse<List<AdminAlbumListVo>> getAlbumList(){
        return albumService.getAlbumList();
    }

    @Operation(summary = "新建楼盘分类", description = "用于新建楼盘分类")
    @PostMapping(value = "/admin6/albums/")
    @SaCheckPermission("create_album")
    public JsonResponse createAlbum(@Valid @RequestBody AdminAlbumCreateRequest dto){
        return albumService.createAlbum(dto);
    }

    @Operation(summary = "更新楼盘分类", description = "用于更新楼盘分类")
    @PatchMapping(value = "/admin6/albums/{id}")
    @SaCheckPermission("update_album")
    public JsonResponse updateAlbum(@Valid @RequestBody AdminAlbumUpdateRequest dto,@PathVariable("id") Integer id) {
        return albumService.updateAlbum(id ,dto);
    }

    @Operation(summary = "删除楼盘分类", description = "用于删除楼盘分类")
    @DeleteMapping(value = "/admin6/albums/{id}")
    @SaCheckPermission("delete_album")
    public JsonResponse deleteAlbum(@PathVariable("id") Integer id){
        return albumService.deleteAlbum(id);
    }

    @Operation(summary = "更新楼盘分类下的楼盘列表", description = "用于更新楼盘分类下的楼盘列表")
    @PatchMapping(value = "/admin6/album_posts/{id}")
    @SaCheckPermission("update_album")
    public JsonResponse updateAlbumPosts(@PathVariable("id") Integer id, @RequestBody AdminAlbumUpdateRequest dto){
        return albumService.updateAlbumPosts(id, dto);
    }

}
