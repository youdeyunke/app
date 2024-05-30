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

import cn.dev33.satoken.stp.StpUtil;
import com.alibaba.fastjson.JSONObject;
import com.udeve.repository.SysMessageRepository;
import com.udeve.service.UserService;
import com.udeve.utils.JsonResponse;
import com.udeve.utils.ip.IpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.udeve.BaseApiController;
import java.util.Map;

@RestController
public class HeartbeatController extends BaseApiController {
    @Autowired
    UserService userService;
    @Autowired
    SysMessageRepository sysMessageRepository;


    @PostMapping(value = "/v6/heartbeat")
    public JsonResponse heartbeat(@RequestBody Map map) {
        boolean login = StpUtil.isLogin();
        if (!login){//未登录
            return JsonResponse.ok();
        }

        //下面是已登录的业务逻辑实现

        JSONObject result = new JSONObject();
        result.put("user", getUser());
        Integer userId = (Integer) getUser().get("user_id");

        //更新ip及ip归属地
        userService.updateUserIp(IpUtils.getIpAddr(),userId);

        //uid相关
        userService.recordUidForUser(userId,map.get("uid"));

        Integer sysMessageCount = sysMessageRepository.getSysMessageCount(String.valueOf(userId));
        if (sysMessageCount == null) {
            sysMessageCount = 0;
        }
        result.put("sys_message_count", sysMessageCount);
        result.put("unread_message_count",sysMessageCount);
        return JsonResponse.ok(result);
    }

}
