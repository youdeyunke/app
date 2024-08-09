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
import com.udeve.request.CreateHouseRequest;
import com.udeve.request.HouseSearchRequest;
import com.udeve.entity.User;
import com.udeve.repository.UserRepository;
import com.udeve.service.HouseService;
import com.udeve.utils.JsonResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;

import java.util.Map;

@RestController
@Slf4j
@Api(tags = "二手房相关接口")
public class HouseController extends BaseApiController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    HouseService houseService;
    @Autowired
    ModelMapper modelMapper;



    @ApiOperation(value="创建二手房")
    @PostMapping(value = "/v6/houses")
    @SaCheckLogin
    public JsonResponse Create(@RequestBody CreateHouseRequest dto) {
        Integer userId = (Integer) getUser().get("user_id");
        User userEntity = userRepository.findById(userId).orElse(null);
        if (userEntity == null){
            return JsonResponse.error("当前用户不存在");
        }
        dto.setUserId((userId));
        dto.setContactMobile(userEntity.getMobile());
        dto.setContactName(userEntity.getName());
        return houseService.create(dto);
    }

    @GetMapping(value = "/v6/house_filters")
    @ApiOperation(value = "二手房筛选过滤选项配置数据")
    public JsonResponse HouseFilters(@RequestParam(value = "business", required = true) String business) {
        return houseService.getHouseFilters(business);
    }

    // 拉取房源详情
    @GetMapping(value = "/v6/houses/{id}")
    @ApiOperation(value = "拉取二手房详情数据")
    public JsonResponse Show(@PathVariable("id") Integer id) {
        return houseService.getHouseDetail(id);
    }

    // 拉取房源列表
    @GetMapping(value = "/v6/houses")
    @ApiOperation(value = "拉取二手房列表")
    public JsonResponse Index(@RequestParam Map<String ,Object> query) {
        log.info("-------------------");
        //log.info("query map is {}", query);
        JSONObject queryJson = new JSONObject(query);
        //log.info("query json is {}", queryJson);
        // 这一步是为了将下划线转为驼峰
        HouseSearchRequest queryDto = JSONObject.parseObject(queryJson.toString(), HouseSearchRequest.class);
        //log.info("query dto is {}", queryDto);

        queryDto.setScope("public"); // 注意要加上限制，防止返回了未发布的房源
        queryDto.setIsDelete(false); // 注意要加上限制，防止返回了已删除的房源
        return houseService.getListingForApi(queryDto);
    }

}
