package com.udeve.controllers.api;
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
import com.alibaba.fastjson.JSONObject;
import com.udeve.BaseApiController;
import com.udeve.request.CommonRequest;
import com.udeve.service.FavService;
import com.udeve.utils.JsonResponse;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Slf4j
@Api(tags = "用户收藏或取消收藏接口")
public class FavController extends BaseApiController {

    @Autowired
    FavService favService;

    @PostMapping(value = "/v6/favs")
    @Operation(summary = "取消收藏或添加收藏",description = "取消收藏或添加收藏")
    @SaCheckLogin
    @SaCheckRole("user")
    public JsonResponse addFavOrCancel(@RequestBody Map<String, Object> body) {
        String targetType = body.get("target_type").toString();
        Integer targetId = (Integer) body.get("target_id");
        Integer userId = (Integer) getUser().get("user_id");
        String mobile = (String) getUser().get("user_mobile");
        return favService.addFavOrCancel(targetType, targetId,userId, mobile);
    }

    @GetMapping(value = "/v6/favs")
    @Operation(summary = "根据条件获取用户是否收藏",description = "根据用户id和楼盘id以及楼盘类型获取用户是否收藏")
    public JsonResponse getList(@RequestParam("target_type") String targetType,@RequestParam("target_id") Integer targetId) {
        Integer userId = (Integer) getUser().get("user_id");
        return favService.getList(targetType, targetId,userId);
    }

    @GetMapping(value = "/v6/posts/myfavs")
    @Operation(summary = "获取我的收藏列表",description = "根据当前用户获取我的收藏列表")
    @SaCheckLogin
    @SaCheckRole("user")
    public  JsonResponse getMyFavsList(@RequestParam Map<String,Object> query){
        JSONObject jsonObject = new JSONObject(query);
        String targetType = jsonObject.getString("target_type");
        if (("").equals(targetType)||null==targetType){
            return JsonResponse.error("targetType不能为空");
        }
        CommonRequest commonRequest = JSONObject.parseObject(jsonObject.toString(), CommonRequest.class);
        Integer userId = (Integer) getUser().get("user_id");
        return favService.getMyFavsList(userId,commonRequest,targetType);
    }
}
