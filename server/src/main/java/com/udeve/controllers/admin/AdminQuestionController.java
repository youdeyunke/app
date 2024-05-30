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
import com.udeve.request.AdminAnswerCreateRequest;
import com.udeve.request.QuestionQueryRequest;
import com.udeve.service.QuestionService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminQuestionListVo;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@SaCheckLogin
@Api(tags = "post问答管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminQuestionController extends BaseApiController {

    @Autowired
    private QuestionService questionService;

    @Operation(summary = "获取问答列表", description = "获取问答列表")
    @GetMapping(value = "/admin6/questions")
    public JsonResponse getQuestionList(@RequestParam Map<String, Object> query) {
        JSONObject updateJson = new JSONObject(query);
        QuestionQueryRequest queryRequest = JSONObject.parseObject(updateJson.toString(), QuestionQueryRequest.class);

        return questionService.getQuestionsList(queryRequest);
    }

    @Operation(summary = "获取问答详情", description = "获取问答详情")
    @GetMapping(value = "/admin6/questions/{id}")
    public JsonResponse<AdminQuestionListVo> getQuestionDetail(@PathVariable("id") Integer id){
        return questionService.getQuestionDetail(id);
    }

    @Operation(summary = "创建回答", description = "创建回答")
    @PostMapping(value = "/admin6/answers")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse createAnswer(@Valid @RequestBody AdminAnswerCreateRequest request){
        Integer userId = (Integer) getUser().get("user_id");
        return questionService.createAnswer(request,userId);
    }

    @Operation(summary = "删除回答", description = "删除回答")
    @DeleteMapping(value = "/admin6/answers/{id}")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse deleteAnswer(@PathVariable("id") Integer id){
        Integer userId = (Integer) getUser().get("user_id");
        return questionService.deleteAnswer(id,userId);
    }

    @Operation(summary = "删除问题", description = "删除问题")
    @DeleteMapping(value = "/admin6/questions/{id}")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse deleteQuestion(@PathVariable("id") Integer id){
        Integer userId = (Integer) getUser().get("user_id");
        return questionService.deleteQuestionAdmin(id,userId);
    }

    @Operation(summary = "审核问题",description = "审核问题")
    @PatchMapping("/admin6/auditing_question/{id}")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse auditingQuestion(@PathVariable("id") Integer id){
        Integer userId = (Integer) getUser().get("user_id");
        return questionService.auditingQuestion(id,userId);
    }

    @Operation(summary = "审核回答",description = "审核回答")
    @PatchMapping("/admin6/auditing_answer/{id}")
    @SaCheckPermission(value={"update_post"},mode= SaMode.OR)
    public JsonResponse auditingAnswer(@PathVariable("id") Integer answerId){
        Integer userId = (Integer) getUser().get("user_id");
        return questionService.auditingAnswer(answerId,userId);
    }

}
