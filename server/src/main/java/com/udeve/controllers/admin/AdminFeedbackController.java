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
import com.alibaba.fastjson.JSONObject;
import com.udeve.BaseApiController;
import com.udeve.request.AdminFeedbackQueryRequest;
import com.udeve.service.FeedbackService;
import com.udeve.utils.JsonResponse;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Api(tags = "用户反馈管理")
@SaCheckLogin
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminFeedbackController extends BaseApiController {

    @Autowired
    FeedbackService feedbackService;

    @Operation(summary = "拉取用户反馈列表")
    @GetMapping("/admin6/feedback")
    public JsonResponse getFeedbackList(@RequestParam Map<String, Object> query){
        JSONObject jsonObject = new JSONObject(query);
        AdminFeedbackQueryRequest queryRequest = JSONObject.parseObject(jsonObject.toString(), AdminFeedbackQueryRequest.class);
        return feedbackService.getFeedbackList(queryRequest);
    }

    @Operation(summary = "删除用户反馈")
    @DeleteMapping("/admin6/feedback/{id}")
    @SaCheckPermission("delete_feedback")
    public JsonResponse deleteFeedbackById(@PathVariable("id") Integer id){
        return feedbackService.deleteFeedbackById((Integer) getUser().get("user_id"),id);
    }

}
