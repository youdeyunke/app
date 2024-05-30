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

import com.udeve.vo.MyconfigForWeappVo;
import com.udeve.repository.MyconfigRepository;
import com.udeve.service.MyconfigService;
import com.udeve.utils.JsonResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.udeve.BaseApiController;

@RestController
public class MyconfigController extends BaseApiController {
    @Autowired
    MyconfigRepository myconfigRepository;
    @Autowired
    MyconfigService myconfigService;
    @Autowired
    ModelMapper modelMapper;

    @GetMapping(value="/v6/myconfigs")
    public JsonResponse Show(){
        MyconfigForWeappVo data  = myconfigService.getWeappConfig();
        return JsonResponse.ok(data);
    }

}
