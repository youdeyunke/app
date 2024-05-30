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
import com.udeve.request.AdminPosterTemplateCreateRequest;
import com.udeve.request.AdminPosterTemplateUpdateRequest;
import com.udeve.service.PosterTemplateService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminPosterTemplateListVo;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@SaCheckLogin
@Api(tags = "海报背景管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminPosterTemplateController extends BaseApiController {

    @Autowired
    PosterTemplateService posterTemplateService;

    @Operation(summary = "获取海报背景列表", description = "用于获取海报背景列表")
    @GetMapping(value = "/admin6/poster_templates")
    public JsonResponse<List<AdminPosterTemplateListVo>> getPosterTemplateList(){
        return posterTemplateService.getPosterTemplateList();
    }

    @Operation(summary = "创建海报背景", description = "用于创建海报背景")
    @PostMapping(value = "/admin6/poster_templates/")
    public JsonResponse createPosterTemplate(@Valid @RequestBody AdminPosterTemplateCreateRequest createRequest){
        return posterTemplateService.createPosterTemplate(createRequest);
    }

    @Operation(summary = "更新海报背景", description = "用于更新海报背景")
    @PatchMapping(value = "/admin6/poster_templates/{id}")
    public JsonResponse updatePosterTemplate(@Valid @RequestBody AdminPosterTemplateUpdateRequest updateRequest,@PathVariable("id") Integer id){
        return posterTemplateService.updatePosterTemplate(id,updateRequest);
    }

    @Operation(summary = "删除海报背景", description = "用于删除海报背景")
    @DeleteMapping(value = "/admin6/poster_templates/{id}")
    public JsonResponse deletePosterTemplate(@PathVariable("id") Integer id){
        return posterTemplateService.deletePosterTemplate(id);
    }

    @Operation(summary = "更新海报背景排序", description = "用于更新海报背景排序")
    @PostMapping(value = "/admin6/poster_templates/update_order")
    public JsonResponse updateOrder(@RequestBody JSONObject updateRequest){
        List<Integer> ids = (List<Integer>) updateRequest.get("ids");
        return posterTemplateService.updateOrder(ids);
    }

}
