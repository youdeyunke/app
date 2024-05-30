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
import com.udeve.service.SaleStatusItemService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminSaleStatusItemListVo;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.udeve.BaseApiController;

import java.util.List;
import java.util.Map;

@RestController
@SaCheckLogin
@Api(tags = "saleStatus管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminSaleStatusItemController extends BaseApiController {

    @Autowired
    SaleStatusItemService saleStatusItemService;

    @Operation(summary = "获取saleStatus列表", description = "获取saleStatus列表")
    @GetMapping(value = "/admin6/sale_status_items")
    public JsonResponse getSaleStatusItemList(@RequestParam Map<String, Object> query){
        String moduleKey = (String) query.get("module_key");
        return saleStatusItemService.getSaleStatusItemList(moduleKey);
    }
}
