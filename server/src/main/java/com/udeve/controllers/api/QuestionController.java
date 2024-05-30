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
import com.alibaba.fastjson.JSONObject;
import com.udeve.BaseApiController;
import com.udeve.request.AdminAnswerCreateRequest;
import com.udeve.request.QuestionCreateRequest;
import com.udeve.request.QuestionQueryRequest;
import com.udeve.service.QuestionService;
import com.udeve.utils.JsonResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@Slf4j
public class QuestionController extends BaseApiController {

    @Autowired
    QuestionService questionService;

    @GetMapping(value = "/v6/myself/questions")
    @Operation(summary = "小程序用户获取问答列表接口")
    @SaCheckLogin
    public JsonResponse getWeappUserQuestionList(@RequestParam Map<String, Object> query){
        Map<Object, Object> user = getUser();
        log.info(user.toString());
        Integer userId = (Integer) user.get("user_id");
        query.put("is_public",1);
        JSONObject queryJson = new JSONObject(query);
        QuestionQueryRequest queryDto = JSONObject.parseObject(queryJson.toString(), QuestionQueryRequest.class);
        queryDto.setUserId(userId);
        return questionService.getWeappUserQuestionList(queryDto);
    }

    @Operation(summary = "小程序获取问答列表接口",description = "用于获取某个楼盘下的问答，用户登录和不登录都要能获取")
    @GetMapping("/v6/questions")
    public JsonResponse getPublicQuestionList(@RequestParam Map<String, Object> query){
        JSONObject queryJson = new JSONObject(query);
        QuestionQueryRequest queryDto = JSONObject.parseObject(queryJson.toString(), QuestionQueryRequest.class);
        queryDto.setIsPublic(true);
        return questionService.getPublicQuestionList(queryDto);
    }

    @GetMapping(value = "/v6/questions/{id}")
    @Operation(summary = "小程序用户获取问答详情接口")
    public JsonResponse getWeappUserQuestionDetail(@PathVariable("id") Integer id){
        Map<Object, Object> user = getUser();
        Integer userId = (Integer) user.get("user_id");
        return questionService.getWeappUserQuestionDetail(id, userId);
    }

    @PostMapping(value = "/v6/question_followers/{id}")
    @Operation(summary = "小程序用户关注问答接口")
    public JsonResponse followQuestion(@PathVariable("id") Integer id){
        Map<Object, Object> user = getUser();
        Integer userId = (Integer) user.get("user_id");
        return questionService.followQuestion(id, userId);
    }

    @DeleteMapping(value = "/v6/question_followers/{id}")
    @Operation(summary = "小程序用户取消关注问答接口")
    public JsonResponse cancleFollowQuestion(@PathVariable("id") Integer id){
        Map<Object, Object> user = getUser();
        Integer userId = (Integer) user.get("user_id");
        return questionService.cancleFollowQuestion(id, userId);
    }

    @PutMapping(value = "/v6/answers/{id}")
    public JsonResponse likeAnswer(@PathVariable("id") Integer id, @RequestBody JSONObject data){
        String aDo = (String) data.get("do");
        if (aDo.equals("like")) {
            return questionService.likeAnswer(id);
        }
        return JsonResponse.error("do参数错误");
    }

    @PostMapping(value = "/v6/answers/")
    @SaCheckLogin
    public JsonResponse weappCreateAnswer(@RequestBody AdminAnswerCreateRequest data){
        Map<Object, Object> user = getUser();
        Integer userId = (Integer) user.get("user_id");
        data.setUserId(userId);
        return questionService.weappCreateAnswer(data);
    }

    @DeleteMapping(value = "/v6/answers/{id}")
    @SaCheckLogin
    public JsonResponse weappDeleteAnswer(@PathVariable("id") Integer id){
        Map<Object, Object> user = getUser();
        Integer userId = (Integer) user.get("user_id");
        return questionService.weappDeleteAnswer(id, userId);
    }

    @Operation(summary = "小程序用户发布问题")
    @PostMapping(value = "/v6/questions/")
    @SaCheckLogin
    public JsonResponse weAppCreateQuestion(@RequestBody QuestionCreateRequest questionCreateRequest){
        Integer userId = (Integer) getUser().get("user_id");
        return questionService.createQuestion(userId,questionCreateRequest);
    }

    @Operation(summary = "小程序用户删除问题")
    @DeleteMapping(value = "/v6/questions/{qid}")
    @SaCheckLogin
    public JsonResponse weAppDeleteQuestion(@PathVariable Integer qid){
        Integer userId = (Integer) getUser().get("user_id");
        return questionService.deleteQuestion(userId,qid);
    }

}
