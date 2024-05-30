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
import com.udeve.entity.PostType;
import com.udeve.repository.PostTypeRepository;
import com.udeve.service.PostDetailPageService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.PostTypesVo;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@Api("楼盘户型相关接口")
public class TypeController extends BaseApiController {

    @Autowired
    PostDetailPageService postDetailPageService;
    @Autowired
    PostTypeRepository postTypeRepository;
    @Autowired
    ModelMapper modelMapper;

    @Operation(summary = "楼盘户型接口",description = "根据楼盘id查询户型列表")
    @GetMapping(value = "/v6/types")
    public JsonResponse showTypesInfoById(@RequestParam("id") Integer id){
        return postDetailPageService.getTypeListById(id);
    }

    @Operation(summary = "楼盘户型详情接口",description = "根据户型id查询户型详情")
    @GetMapping(value = "/v6/types/{id}")
    public JsonResponse getTypeDetailById(@PathVariable("id") Integer id){
        PostType postType = postTypeRepository.findById(id).get();
        PostTypesVo map = modelMapper.map(postType, PostTypesVo.class);
        return JsonResponse.ok(map);
    }


}
