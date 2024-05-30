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
import com.udeve.entity.*;
import com.udeve.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
@Async("customTaskExecutor")
public class AsyncService {

    @Autowired
    EventRepository eventRepository;

    @Autowired
    SysMessageService sysMessageService;

    @Autowired
    MyconfigRepository myconfigRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    DynamicSubscriptionRepository dynamicSubscriptionRepository;


    //异步发送动态系统消息综合方法
    public void sendSysMsgToUsers(Integer targetId,String targetType,String title,String content,String url){

        //调用方法前要根据pushDone字段判断是否已经推送过了
        List<DynamicSubscription> dynamicSubscriptions =dynamicSubscriptionRepository.findByTargetIdAndTargetType(targetId,targetType);
        if (dynamicSubscriptions.isEmpty()) {
            log.info("没有订阅此动态的用户");
            return;
        }

        List<Integer> receiverIds = new ArrayList<>();
        dynamicSubscriptions.forEach(dynamicSubscription ->{
            receiverIds.add(dynamicSubscription.getUserId());
        });
        List<Integer> filterIds = receiverIds.stream().filter(Objects::nonNull).toList();
        //为空直接return
        if (filterIds.isEmpty()) {
            return;
        }

        for (Integer receiverId : filterIds) {
            sysMessageService.sendSysMessage(targetType,title,content,receiverId,url);
        }
        //调用完此方法，要将对应的实体类的pushDone字段设置为true，意为：已推送过了

    }
}
