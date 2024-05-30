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
import com.udeve.request.*;
import com.udeve.service.PostService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminSimplePostListVo;
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
import java.util.Map;

@RestController
@SaCheckLogin
@Api(tags = "楼盘管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminPostController extends BaseApiController {

    @Autowired
    PostService postService;

    @Operation(summary = "获取楼盘主要信息列表", description = "用于获取楼盘主要信息列表")
    @GetMapping(value = "/admin6/posts/simplelist")
    public JsonResponse getPostSimpleList(){
        return postService.getPostSimpleList();
    }

    @GetMapping("/admin6/types")
    public JsonResponse getPostTypeList(@RequestParam("post_id") Integer postId){
        return postService.getPostTypeList(postId);
    }

    @Operation(summary = "创建楼盘", description = "创建楼盘")
    @SaCheckPermission(value={"create_post"},mode= SaMode.OR)
    @PostMapping(value = "/admin6/posts/")
    public JsonResponse createPost(@Valid @RequestBody AdminPostCreateRequest postCreateDto){
        return postService.createPost(postCreateDto, (Integer) getUser().get("user_id"));
    }

    @Operation(summary = "获取楼盘详情信息", description = "获取楼盘详情信息")
    @GetMapping(value = "/admin6/posts/{id}")
    public JsonResponse getPostDetail(@PathVariable("id") Integer id){
        return postService.getPostDetail(id);
    }

    @Operation(summary = "获取楼盘列表", description = "获取楼盘列表")
    @GetMapping(value = "/admin6/posts")
    public JsonResponse Index(@RequestParam Map<String, Object> query) {
        JSONObject queryJson = new JSONObject(query);
        PostQueryRequest queryDto = JSONObject.parseObject(queryJson.toString(), PostQueryRequest.class);
        queryDto.setScope("all");
        return postService.getPostList(queryDto);
    }

    @Operation(summary = "更新楼盘", description = "更新楼盘")
    @PatchMapping(value = "/admin6/posts/{id}")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public  JsonResponse updatePost(@Valid @RequestBody AdminPostUpdateRequest postUpdateDto,@PathVariable("id") Integer id){
        return postService.updatePost(id,postUpdateDto, (Integer) getUser().get("user_id"));
    }

    @Operation(summary = "上下架楼盘", description = "上下架楼盘")
    @PatchMapping(value = "/admin6/posts/isPublic")
    @SaCheckPermission(value={"public_post","unpublic_post"},mode= SaMode.OR)
    public JsonResponse isPublicPost(@RequestBody JSONObject rebody){
        Integer id = (Integer) rebody.get("id");
        String state = (String) rebody.get("state");
        return postService.isPublicPost(id,state, (Integer) getUser().get("user_id"));
    }

    @Operation(summary = "置顶取消置顶楼盘", description = "置顶取消置顶楼盘")
    @PatchMapping(value = "/admin6/posts/isTop")
    @SaCheckPermission(value={"isTop_post"},mode= SaMode.OR)
    public JsonResponse isTopPost(@RequestBody JSONObject rebody){
        Integer id = (Integer) rebody.get("id");
        String state = (String) rebody.get("state");
        return postService.isTopPost(id,state, (Integer) getUser().get("user_id"));
    }

    @Operation(summary = "删除楼盘", description = "删除楼盘")
    @PatchMapping(value = "/admin6/posts/isDelete")
    @SaCheckPermission(value={"delete_post"},mode= SaMode.OR)
    public JsonResponse deletePost(@RequestBody JSONObject rebody){
        Integer id = (Integer) rebody.get("id");
        String state = (String) rebody.get("state");
        return postService.deletePost(id,state, (Integer) getUser().get("user_id"));
    }

    @Operation(summary = "楼盘评测是否显示",description = "楼盘评测是否显示")
    @PatchMapping(value = "/admin6/posts/reviewEnable/{id}")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse updatePostReviewEnable(@PathVariable("id") Integer id){
        return postService.updatePostReviewEnable(id);
    }

    @Operation(summary = "重新生成二维码",description = "用于重新生成楼盘预览二维码")
    @PostMapping("/admin6/posts/refresh_qrcode/{id}")
    @SaCheckPermission(value={"update_post","create_post"},mode= SaMode.OR)
    public JsonResponse refreshPostQrCode(@PathVariable("id") Integer id){
        return postService.refreshQrCode(id);
    }

}
