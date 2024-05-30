package com.udeve;
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
import org.apache.commons.collections4.map.HashedMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping(value = "/api")
public class BaseApiController {

    public Map<Object, Object> getUser() {
        // 获取当前会话账号id, 如果未登录，则返回null
        Object loginIdDefaultNull = StpUtil.getLoginIdDefaultNull();
        if(loginIdDefaultNull==null){
            return new HashedMap<>();
        }
        Integer userId = StpUtil.getLoginIdAsInt();// 获取当前会话账号id, 并转换为int类型
        Object userType = StpUtil.getExtra("user_type");
        Object userName = StpUtil.getExtra("user_name");
        Object userMobile = StpUtil.getExtra("user_mobile");

        Map<Object,Object> userMap = new HashedMap<>();
        userMap.put("user_id",userId);
        userMap.put("user_type",userType==null|| userType.equals("") ? "demo" : userType);

        userMap.put("user_name",userName==null || userName.equals("") ? "用户："+userId : userName);

        userMap.put("user_mobile",userMobile==null || userMobile.equals("") ? "用户："+userId : userMobile);

        return userMap;
    }

}
