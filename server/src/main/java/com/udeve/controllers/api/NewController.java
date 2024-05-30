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
import com.udeve.request.NewQueryRequest;
import com.udeve.service.NewCatService;
import com.udeve.service.NewService;
import com.udeve.utils.JsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class NewController extends BaseApiController {

    @Autowired
    NewService newService;
    @Autowired
    NewCatService newCatService;

    @GetMapping(value = "/v6/news/")
    public JsonResponse getNews(@RequestParam Map<String, Object> query) {
        JSONObject queryJson = new JSONObject(query);
        NewQueryRequest queryDto = JSONObject.parseObject(queryJson.toString(), NewQueryRequest.class);
        queryDto.setScope("public");
        return newService.getWeappNewsList(queryDto);
    }

    @GetMapping(value = "/v6/news/{id}")
    public JsonResponse getNewsById(@PathVariable(value = "id") Integer id) {
        return newService.getWeappNewsById(id);
    }

    @GetMapping(value = "/v6/news_summary/")
    public JsonResponse getNewsSummary(){
        return newService.getWeappNewsSummary();
    }

    @GetMapping(value = "/v6/news_cats/")
    public JsonResponse getNewsCatList(){
        return newCatService.getWeappNewCatList();
    }

}
