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
import com.alibaba.fastjson.JSONObject;
import com.udeve.BaseApiController;
import com.udeve.request.VideoQueryRequest;
import com.udeve.service.VideoSerivce;
import com.udeve.utils.JsonResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class VideoController extends BaseApiController {

    @Autowired
    VideoSerivce videoSerivce;

    @Operation(summary = "小程序拉取视频列表")
    @GetMapping("/v6/videos")
    public JsonResponse getWeappVideoList(@RequestParam Map<String, Object> query){
        JSONObject jsonObject = new JSONObject(query);
        VideoQueryRequest queryRequest = JSONObject.parseObject(jsonObject.toString(), VideoQueryRequest.class);
        return videoSerivce.getWeappVideoList(queryRequest);
    }

    @Operation(summary = "增加浏览量")
    @PostMapping("/v6/videos/view/{id}")
    public JsonResponse increaseViewNums(@PathVariable("id") Integer id){
        return videoSerivce.increaseViewNums(id);
    }
}
