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
import com.udeve.request.WeappMapMarketQueryRequest;
import com.udeve.service.MapMarkerService;
import com.udeve.utils.JsonResponse;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(tags = "小程序地图找房")
public class MapMarkerController extends BaseApiController {

    @Autowired
    MapMarkerService mapMarkerService;

    @PostMapping("/v6/map_markers")
    public JsonResponse getMapMarkerList(@RequestBody WeappMapMarketQueryRequest request){
        return mapMarkerService.getMapMarkerList(request);
    }

    @PostMapping("/v6/map_markers_house")
    public JsonResponse getMapMarkerListForHouse(@RequestBody WeappMapMarketQueryRequest request){
        return mapMarkerService.getMapMarkerListForHouse(request);
    }

}
