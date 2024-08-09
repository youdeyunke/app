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

import com.udeve.request.AdminPostPointCreateRequest;
import com.udeve.vo.AdminPostPointListVo;
import com.udeve.request.AdminPostPointUpdateRequest;
import com.udeve.entity.PostPoint;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.udeve.repository.PostPointRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PostPointService {

    @Autowired
    PostPointRepository postPointRepository;
    @Autowired
    ModelMapper modelMapper;

    public JsonResponse getPostPointList(Integer postId) {
        List<PostPoint> postPointList = postPointRepository.findAllByPostIdOrderById(postId);
        List<AdminPostPointListVo> list = postPointList.stream().map(postPoint -> {
            AdminPostPointListVo map = modelMapper.map(postPoint, AdminPostPointListVo.class);
            return map;
        }).collect(Collectors.toList());
        return JsonResponse.ok(list);
    }

    public JsonResponse updatePostPoint(Integer id,AdminPostPointUpdateRequest postPoint) {
        PostPoint map = postPointRepository.findById(id).orElse(null);
        if(map == null){
            return JsonResponse.error("数据不存在");
        }
        modelMapper.map(postPoint, map);
        map.setUpdatedAt(LocalDateTime.now());
        postPointRepository.saveAndFlush(map);
        return JsonResponse.ok("更新成功");
    }

    public JsonResponse createPostPoint(AdminPostPointCreateRequest postPoint) {
        PostPoint map = new PostPoint();
        modelMapper.map(postPoint, map);
        map.setCreatedAt(LocalDateTime.now());
        map.setUpdatedAt(LocalDateTime.now());
        postPointRepository.saveAndFlush(map);
        return JsonResponse.ok("创建成功");
    }


    public JsonResponse deletePostPoint(Integer id) {
        postPointRepository.deleteById(id);
        return JsonResponse.ok("删除成功");
    }
}
