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

import com.udeve.entity.PostReview;
import com.udeve.repository.PostReviewRepository;
import com.udeve.request.AdminPostReviewCreateRequest;
import com.udeve.request.AdminPostReviewUpdateRequest;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminPostReviewListVo;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PostReviewService {

    @Autowired
    PostReviewRepository postReviewRepository;

    @Autowired
    ModelMapper modelMapper;

    public JsonResponse getPostReviewList(Integer postId) {
        List<PostReview> postIdOrderById = postReviewRepository.findAllByPostIdOrderById(postId);
        List<AdminPostReviewListVo> list = postIdOrderById.stream().map(postReview -> {
            AdminPostReviewListVo map = modelMapper.map(postReview, AdminPostReviewListVo.class);
            return map;
        }).collect(Collectors.toList());
        return JsonResponse.ok(list);
    }

    public JsonResponse updatePostReview(Integer id, AdminPostReviewUpdateRequest postReview) {
        PostReview map = postReviewRepository.findById(id).orElse(null);
        if(map == null){
            return JsonResponse.error("数据不存在");
        }
        modelMapper.map(postReview, map);
        postReviewRepository.saveAndFlush(map);
        return JsonResponse.ok("更新成功");
    }

    public JsonResponse createPostReview(AdminPostReviewCreateRequest postReview) {
        PostReview map = new PostReview();
        modelMapper.map(postReview, map);
        postReviewRepository.saveAndFlush(map);
        return JsonResponse.ok("创建成功");
    }

    public JsonResponse deletePostReview(Integer id) {
        postReviewRepository.deleteById(id);
        return JsonResponse.ok("删除成功");
    }

    /**
     * 初始化postReview数据
     * @return
     */
    public JsonResponse initDataOfPostReview(Integer postId) {
        PostReview postReview = new PostReview();
        postReview.setPostId(postId);
        postReview.setName("楼盘品质");
        postReview.setScore(5.0f);
        PostReview postReview1 = new PostReview();
        postReview1.setPostId(postId);
        postReview1.setName("交通出行");
        postReview1.setScore(5.0f);
        PostReview postReview2 = new PostReview();
        postReview2.setPostId(postId);
        postReview2.setName("社区配套");
        postReview2.setScore(5.0f);
        postReviewRepository.saveAndFlush(postReview);
        postReviewRepository.saveAndFlush(postReview1);
        postReviewRepository.saveAndFlush(postReview2);
        return JsonResponse.ok("数据初始化成功！");
    }
}
