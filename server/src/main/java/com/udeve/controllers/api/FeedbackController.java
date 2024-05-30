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
import com.udeve.BaseApiController;
import com.udeve.request.FeedbackCreateRequest;
import com.udeve.service.FeedbackService;
import com.udeve.utils.JsonResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FeedbackController extends BaseApiController {

    @Autowired
    FeedbackService feedbackService;

    @Operation(summary = "小程序用户提交用户反馈")
    @PostMapping("/v6/feedback")
    public JsonResponse createFeedbackInfo(@RequestBody FeedbackCreateRequest createRequest){
        return feedbackService.weappCreateFeedbackInfo(createRequest);
    }
}
