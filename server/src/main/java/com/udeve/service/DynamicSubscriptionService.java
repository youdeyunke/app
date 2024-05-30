package com.udeve.service;
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
import cn.hutool.core.util.ObjectUtil;
import com.udeve.entity.DynamicSubscription;
import com.udeve.repository.DynamicSubscriptionRepository;
import com.udeve.repository.PostRepository;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Slf4j
public class DynamicSubscriptionService {

    @Autowired
    DynamicSubscriptionRepository dynamicSubscriptionRepository;

    @Autowired
    PostRepository postRepository;

    // 获取订阅状态
    public Boolean getSubscriptionStatus(Integer userId,Integer targetId,String targetType) {
        Optional<DynamicSubscription> optional = dynamicSubscriptionRepository.findFirstByUserIdAndTargetIdAndTargetType(userId, targetId, targetType);
        if (optional.isEmpty()) {
            return false;
        }
        return true;
    }


    //  订阅
    public JsonResponse subscribe(Integer userId,Integer targetId,String targetType) {
        if (getSubscriptionStatus(userId,targetId,targetType)) {
            return JsonResponse.ok("已经订阅过了");
        }

        DynamicSubscription dynamicSubscription = new DynamicSubscription();
        dynamicSubscription.setUserId(userId);
        dynamicSubscription.setTargetId(targetId);
        dynamicSubscription.setTargetType(targetType);
        dynamicSubscription.setCreatedAt(LocalDateTime.now());
        dynamicSubscription.setUpdatedAt(LocalDateTime.now());
        dynamicSubscriptionRepository.saveAndFlush(dynamicSubscription);
        return JsonResponse.ok("订阅成功");
    }


    //  取消订阅
    public JsonResponse unsubscribe(Integer userId,Integer targetId,String targetType) {
        if (!getSubscriptionStatus(userId,targetId,targetType)) {
            return JsonResponse.ok("还没有订阅");
        }
        dynamicSubscriptionRepository.deleteByUserIdAndTargetIdAndTargetType(userId, targetType, targetId );
        return JsonResponse.ok("取消订阅成功");
    }
}
