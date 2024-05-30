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
import com.udeve.BaseApiController;
import com.udeve.request.AdminQrCreateRequest;
import com.udeve.request.AdminQrUpdateRequest;
import com.udeve.service.QrService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminQrListVo;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@SaCheckLogin
@Api(tags = "渠道二维码管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminQrController extends BaseApiController {

    @Autowired
    QrService qrService;

    @Operation(summary = "获取渠道二维码列表", description = "获取渠道二维码列表")
    @GetMapping(value = "/admin6/qrs")
    public JsonResponse<List<AdminQrListVo>> getQrList(){
        return qrService.getQrList();
    }

    @Operation(summary = "更新渠道二维码详情", description = "更新渠道二维码详情")
    @PatchMapping(value = "/admin6/qrs/{id}")
    public JsonResponse updateQr(@Valid @RequestBody AdminQrUpdateRequest updateRequest, @PathVariable("id") Integer id){
        return qrService.updateQr(id,updateRequest);
    }

    @Operation(summary = "创建渠道二维码", description = "创建渠道二维码")
    @PostMapping(value = "/admin6/qrs")
    public JsonResponse createQr(@Valid @RequestBody AdminQrCreateRequest createRequest){
        return qrService.createQr(createRequest);
    }

    @Operation(summary = "删除渠道二维码", description = "删除渠道二维码")
    @DeleteMapping(value = "/admin6/qrs/{id}")
    public JsonResponse deleteQr(@PathVariable("id") Integer id){
        return qrService.deleteQr(id);
    }

}
