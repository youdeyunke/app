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

import com.udeve.entity.DynamicSubscription;
import com.udeve.entity.Post;
import com.udeve.repository.DynamicSubscriptionRepository;
import com.udeve.repository.PostRepository;
import com.udeve.request.CommonRequest;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.PostItemForListingVo;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Slf4j
public class EventFollowerService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    DynamicSubscriptionRepository dynamicSubscriptionRepository;

    /**
     * 拉取我订阅的楼盘列表
     */
    public JsonResponse getEventFollowersMine(Integer userId,CommonRequest request){
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        PageRequest pageable = PageRequest.of(request.getPage() - 1, request.getPerPage(), sort);
        List<DynamicSubscription> dynamicSubscriptionList = dynamicSubscriptionRepository.findByUserIdAndTargetType(userId, "post_event");
        if (dynamicSubscriptionList.isEmpty()){
            log.info("用户未订阅任何楼盘动态");
            return JsonResponse.ok();
        }
        List<Integer> listIds = dynamicSubscriptionList.stream().map(DynamicSubscription::getTargetId).toList();
        List<Integer> postIds = listIds.stream().filter(Objects::nonNull).toList();
        if (postIds.isEmpty()){
            log.info("用户订阅的楼盘动态不存在.");
            return JsonResponse.ok();
        }
        Page<Post> postPage = postRepository.getByIdsAndIsDeleteFalseAndIsPublicTrue(postIds, pageable);
        List<PostItemForListingVo> postItemForListingVos = postPage.getContent().stream().map(post -> {
            return modelMapper.map(post, PostItemForListingVo.class);
        }).collect(Collectors.toList());
        return JsonResponse.ok(postItemForListingVos);
    }
}
