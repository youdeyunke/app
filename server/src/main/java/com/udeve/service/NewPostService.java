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

import com.udeve.vo.AdminPostNewListVo;
import com.udeve.entity.NewPost;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.udeve.repository.NewPostRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class NewPostService {

    @Autowired
    NewPostRepository newPostRepository;
    @Autowired
    ModelMapper modelMapper;

    public JsonResponse getNewPostList(Integer postId) {
        List<NewPost> byPostId = newPostRepository.findByPostId(postId);
        List<AdminPostNewListVo> list = byPostId.stream().map(newPost -> {
            AdminPostNewListVo map = modelMapper.map(newPost, AdminPostNewListVo.class);
            return map;
        }).collect(Collectors.toList());
        return JsonResponse.ok(list);
    }

    @Transactional
    public JsonResponse updateNewPost(Integer postId ,List<Integer> newIds) {
        newPostRepository.deleteByPostId(postId);
        newIds.forEach(newId -> {
            NewPost newPost = new NewPost();
            newPost.setPostId(postId);
            newPost.setNewsId(newId);
            newPost.setUpdatedAt(LocalDateTime.now());
            newPost.setCreatedAt(LocalDateTime.now());
            newPostRepository.save(newPost);
        });

        return JsonResponse.ok("更新成功");
    }

    public JsonResponse clearPostNews(Integer postId) {
        newPostRepository.deleteByPostId(postId);
        return JsonResponse.ok("清除成功");
    }

}
