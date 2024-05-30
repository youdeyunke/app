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
import com.udeve.request.WeappQrCreateRequest;
import com.udeve.service.QrService;
import com.udeve.utils.JsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class QrController extends BaseApiController {

    @Autowired
    QrService qrService;

    @GetMapping(value = "/v6/qrs/{id}")
    public JsonResponse getQrDetail(@PathVariable("id") Integer id){
        return qrService.weappGetQrDetail(id);
    }

    @PostMapping(value = "/v6/qrs/")
    public JsonResponse createQrImage(@RequestBody WeappQrCreateRequest request){
        return qrService.weappCreateQr(request);
    }

}
