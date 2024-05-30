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
import com.udeve.service.BrokerProfileService;
import com.udeve.vo.BrokerProfileListingVo;
import com.udeve.request.BrokerQueryRequest;
import com.udeve.vo.PageableInfoVo;
import com.udeve.entity.BrokerProfile;
import com.udeve.service.BrokerService;
import com.udeve.utils.JsonResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@Slf4j
public class BrokerController extends BaseApiController {
    @Autowired
    BrokerService brokerService;
    @Autowired
    BrokerProfileService brokerProfileService;
    @Autowired
    ModelMapper modelMapper;

    @Operation(summary = "小程序获取置业顾问列表接口")
    @GetMapping("/v6/brokers")
    public JsonResponse Index(@RequestParam Map<String, Object> params) {
        // 转换为Jsonobject
        JSONObject jsonParams = new JSONObject(params);
        // 转换为dto
        BrokerQueryRequest queryDto = JSONObject.parseObject(jsonParams.toString(), BrokerQueryRequest.class);
        queryDto.setStatus("2");//小程序只查询审核通过了的置业顾问
        Page<BrokerProfile> pageResult = brokerProfileService.getListing(queryDto);
        List<BrokerProfileListingVo> result = pageResult.getContent().stream().map(broker -> {
            BrokerProfileListingVo map = modelMapper.map(broker, BrokerProfileListingVo.class);
            return map;
        }).collect(Collectors.toList());
        PageableInfoVo page = new PageableInfoVo(pageResult.getPageable(), pageResult.getTotalPages(), pageResult.getTotalElements());
        JSONObject data = new JSONObject();
        data.put("result", result);
        data.put("page", page);
        return JsonResponse.success(data);
    }
    @Operation(summary = "根据ids顺序返回结果list")
    @GetMapping("/v6/brokers/order_by_ids")
    public JsonResponse getBrokerDetailByIds(@RequestParam Map<String, Object> params) {
        JSONObject jsonParams = new JSONObject(params);
        BrokerQueryRequest queryDto = JSONObject.parseObject(jsonParams.toString(), BrokerQueryRequest.class);
        return brokerProfileService.getBrokerOrderByIds(queryDto);
    }

    @Operation(summary = "小程序获取置业顾问详情接口")
    @GetMapping("/v6/brokers/{id}")
    public JsonResponse getBrokerDetail(@PathVariable("id") Integer id) {
        return brokerProfileService.getWeappBrokerDetail(id);
    }


    @Operation(summary = "小程序置业顾问主页获取置业顾问详情接口")
    @GetMapping("/v6/brokers/show")
    public JsonResponse getBrokerShowDetail(@RequestParam("user_id") Integer userId) {
        return brokerProfileService.getBrokerShowDetail(userId);
    }

    @Operation(summary = "小程序访问置业顾问主页增加浏览量接口")
    @PostMapping(value = "/v6/brokers/view")
    public JsonResponse updateBrokerViewsCount(@RequestBody JSONObject request){
        Object userId = request.get("user_id");
        Integer user_id = null;
        if (userId instanceof String) {
            user_id = Integer.parseInt((String) userId);
        } else if (userId instanceof Integer) {
            user_id = (Integer) userId;
        }
        return brokerProfileService.updateBrokerViewsCount(user_id);
    }

    @Operation(summary = "小程序访问置业顾问主页增加点赞量接口")
    @PostMapping(value = "/v6/brokers/like")
    @SaCheckLogin
    public JsonResponse likeBroker(@RequestBody JSONObject request){
        Object userId = request.get("user_id");
        Integer user_id = null;
        if (userId instanceof String) {
            user_id = Integer.parseInt((String) userId);
        } else if (userId instanceof Integer) {
            user_id = (Integer) userId;
        }
        Integer sendSysMessageUserId = (Integer) getUser().get("user_id");
        return brokerProfileService.likeBroker(user_id,sendSysMessageUserId);
    }

}
