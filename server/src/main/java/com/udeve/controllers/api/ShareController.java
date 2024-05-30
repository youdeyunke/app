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

import com.udeve.service.ShareService;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;

import java.util.Map;

@RestController
@Slf4j
public class ShareController extends BaseApiController {
    @Autowired
    ShareService shareService;

    @PostMapping("/v6/shares")
    public JsonResponse createShares(@RequestBody Map<String, String> req){
        String uid = req.get("uid");
        String shareCompletePath = req.get("share_complete_path");
        String scoreConfigKey = req.get("score_config_key");
        String title = req.get("title");
        return shareService.createShares(uid,shareCompletePath,scoreConfigKey,title);
    }

}
