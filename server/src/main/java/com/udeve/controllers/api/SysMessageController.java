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
import com.udeve.request.CommonRequest;
import com.udeve.service.SysMessageService;
import com.udeve.utils.JsonResponse;
import io.swagger.v3.oas.annotations.Operation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@SaCheckLogin
public class SysMessageController extends BaseApiController {


    @Autowired
    SysMessageService sysMessageService;

    @Operation(summary = "拉取系统消息", description = "根据当前登录的用户，拉取关于当前用户的系统消息")
    @GetMapping("/v6/sys_message_list")
    public JsonResponse getSysMessagesByReceiver(@RequestParam Map<String,Object> map){
        JSONObject jsonObject = new JSONObject(map);
        CommonRequest commonRequest = JSONObject.parseObject(jsonObject.toString(), CommonRequest.class);
        String userId = getUser().get("user_id").toString();
        return sysMessageService.getLastThreeMonthSysMessagesByReceiver(userId,commonRequest);
    }

    @Operation(summary = "全部已读", description = "将当前登录的用户的消息都设为已读")
    @PostMapping("/v6/sys_message_list/readall")
    public JsonResponse readAll() {
        String userId = getUser().get("user_id").toString();
        return sysMessageService.readAll(userId);
    }

    @Operation(summary = "单个已读",description = "将单条消息设为已读")
    @PostMapping("/v6/sys_message_list/marker_read/{id}")
    public JsonResponse readByCat(@PathVariable("id") Integer id){
        return sysMessageService.readById(id);
    }

    @Operation(summary = "根据id拉取内容",description = "根据系统消息的id拉取消息内容")
    @GetMapping("/v6/sys_message/{id}")
    public JsonResponse getContentById(@PathVariable("id") Integer id){
        return sysMessageService.getContentById(id);
    }

    @Operation(summary = "删除系统消息",description = "用于删除系统消息")
    @DeleteMapping("/v6/sys_message/{id}")
    public JsonResponse deleteSysMessageById(@PathVariable("id") Integer sysMessageId){
        return sysMessageService.deleteSysMessage(sysMessageId);
    }
}
