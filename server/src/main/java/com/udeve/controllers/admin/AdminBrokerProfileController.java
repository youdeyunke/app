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
import com.udeve.BaseApiController;
import com.udeve.request.*;
import com.udeve.service.BrokerProfileService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminBrokerProfileDetailVo;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.Map;

@RestController
@SaCheckLogin
@Api(tags = "置业顾问管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminBrokerProfileController extends BaseApiController {

    @Autowired
    BrokerProfileService brokerProfileService;

    @Operation(summary = "拉取置业顾问列表", description = "用于拉取置业顾问列表")
    @GetMapping(value = "/admin6/broker_profile/")
    public JsonResponse<JSONObject> getBrokerProfileList(@RequestParam Map<String, Object> query){
        JSONObject queryJson = new JSONObject(query);
        BrokerQueryRequest queryDto = JSONObject.parseObject(queryJson.toString(), BrokerQueryRequest.class);

        return brokerProfileService.getBrokerProfileList(queryDto);
    }

    @Operation(summary = "拉取置业顾问详情", description = "用于拉取置业顾问详情")
    @GetMapping(value = "/admin6/broker_profile/{id}")
    public JsonResponse<AdminBrokerProfileDetailVo> getBrokerProfile(@PathVariable("id") Integer id){
        return brokerProfileService.getBrokerProfile(id);
    }

    @Operation(summary = "更新置业顾问", description = "用于更新置业顾问")
    @PatchMapping(value = "/admin6/broker_profile/{id}")
    @SaCheckPermission("update_post_broker")
    public JsonResponse updateBrokerProfile(@Valid @RequestBody AdminBrokerProfileUpdateRequest brokerProfile,@PathVariable("id") Integer id){
        return brokerProfileService.updateBrokerProfile(id ,brokerProfile, (Integer) getUser().get("user_id"));
    }

    @Operation(summary = "新建置业顾问", description = "用于新建置业顾问")
    @PostMapping(value = "/admin6/broker_profile/")
    @SaCheckPermission("update_post_broker")
    public JsonResponse createBrokerProfile(@Valid @RequestBody AdminBrokerProfileCreateRequest brokerProfile){
        return brokerProfileService.createBrokerProfile(brokerProfile, (Integer) getUser().get("user_id"));
    }

    @Operation(summary = "删除置业顾问", description = "用于删除置业顾问")
    @DeleteMapping(value = "/admin6/broker_profile/{id}")
    @SaCheckPermission("update_post_broker")
    public JsonResponse deleteBrokerProfile(@PathVariable("id") Integer id){
        return brokerProfileService.deleteBrokerProfile(id, (Integer) getUser().get("user_id"));
    }

    @GetMapping("/admin6/users/simple_search")
    public JsonResponse getBrokerProfiles(@RequestParam Map<String,Object> params){
        return brokerProfileService.getAdminBrokerProfiles(params);
    }

}
