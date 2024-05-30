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
import com.udeve.request.AdminMetaContentUpdateRequest;
import com.udeve.service.MetaContentService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminMetaContentDetailVo;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;

@RestController
@SaCheckLogin
@Api(tags = "metacontent管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminMetaContentController extends BaseApiController {

    @Autowired
    MetaContentService metaContentService;

    @Operation(summary = "获取metacontent详情", description = "用于获取metacontent详情")
    @GetMapping(value = "/admin6/meta_content/{id}")
    public JsonResponse<AdminMetaContentDetailVo> getMetaContentList(@PathVariable("id") Integer id) {
        return metaContentService.getMetaContent(id);
    }

    @Operation(summary = "更新metacontent信息", description = "用于更新metacontent信息")
    @PatchMapping(value = "/admin6/meta_content/{id}")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse updateMetaContent(@RequestBody AdminMetaContentUpdateRequest metaContent,@PathVariable("id") Integer id) {
        return metaContentService.updateMetaContent(id,metaContent);
    }

}
