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
import com.alibaba.fastjson.JSONObject;
import com.udeve.request.AdminTourCreateRequest;
import com.udeve.request.AdminTourUpdateRequest;
import com.udeve.request.TourQueryRequest;
import com.udeve.service.TourService;
import com.udeve.utils.JsonResponse;
import com.udeve.utils.annotation.IgnoringIdentity;
import com.udeve.vo.TourDetailVo;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Map;

@RestController
@SaCheckLogin
@Api(tags = "huodong管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminTourController extends BaseApiController {

    @Autowired
    TourService tourService;

    @Operation(summary = "获取活动列表", description = "获取活动列表")
    @GetMapping(value = "/admin6/tours")
    public JsonResponse getTourList(@RequestParam Map<String, Object> query){
        JSONObject queryJson = new JSONObject(query);
        TourQueryRequest queryDto = JSONObject.parseObject(queryJson.toString(), TourQueryRequest.class);
        return tourService.getAdminTourList(queryDto);
    }

    @Operation(summary = "获取活动详情", description = "获取活动详情")
    @GetMapping(value = "/admin6/tours/{id}")
    public JsonResponse<TourDetailVo> getTourDetail(@PathVariable("id") Integer id){
        return tourService.getTour(id);
    }

    @Operation(summary = "更新活动", description = "更新活动")
    @PatchMapping(value = "/admin6/tours/{id}")
    @SaCheckPermission(value={"update_tour"},mode= SaMode.OR)
    public JsonResponse updateTour(@Valid @RequestBody AdminTourUpdateRequest adminTourUpdateRequest, @PathVariable("id") Integer id){
        return tourService.updateTour(id,adminTourUpdateRequest, (Integer) getUser().get("user_id"));
    }

    @Operation(summary = "创建活动", description = "创建活动")
    @PostMapping(value = "/admin6/tours/")
    @SaCheckPermission(value={"create_tour"},mode= SaMode.OR)
    public JsonResponse createTour(@Valid @RequestBody AdminTourCreateRequest adminTourCreate){
        return tourService.createTour(adminTourCreate, (Integer) getUser().get("user_id"));
    }

    @Operation(summary = "删除活动", description = "删除活动")
    @DeleteMapping(value = "/admin6/tours/{id}")
    @SaCheckPermission(value={"delete_tour"},mode= SaMode.OR)
    public JsonResponse deleteTour(@PathVariable("id") Integer id){
        return tourService.deleteTour(id, (Integer) getUser().get("user_id"));
    }

}
