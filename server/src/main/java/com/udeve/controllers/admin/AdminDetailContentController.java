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
import cn.dev33.satoken.annotation.SaCheckPermission;
import com.udeve.request.AdminDetailContentUpdateRequest;
import com.udeve.service.DetailContentService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminDetailContentVo;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;

import javax.validation.Valid;

@RestController
@SaCheckLogin
@Api(tags = "deatilcontent管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminDetailContentController extends BaseApiController {

    @Autowired
    DetailContentService detailContentService;

    @Operation(summary = "拉取deatilcontent", description = "用于拉取deatilcontent")
    @GetMapping(value = "/admin6/detail_content/{id}")
    public JsonResponse<AdminDetailContentVo> getDetailContentList(@PathVariable("id") Integer id) {
        return detailContentService.getDetailContent(id);
    }

    @Operation(summary = "更新deatilcontent", description = "用于更新deatilcontent")
    @PatchMapping(value = "/admin6/detail_content/{id}")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse updateDetailContent(@RequestBody AdminDetailContentUpdateRequest detailContent,@PathVariable("id") Integer id) {
        return detailContentService.updateDetailContent(id,detailContent);
    }

}
