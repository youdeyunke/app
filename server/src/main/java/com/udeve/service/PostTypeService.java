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

import com.udeve.request.AdminTypeCreateRequest;
import com.udeve.vo.AdminTypeListVo;
import com.udeve.request.AdminTypeUpdateRequest;
import com.udeve.entity.PostType;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.udeve.repository.PostRepository;
import com.udeve.repository.PostTypeRepository;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PostTypeService {

    @Autowired
    PostTypeRepository postTypeRepository;
    @Autowired
    PostRepository postRepository;
    @Autowired
    ModelMapper modelMapper;

    public JsonResponse getTypeList(Integer postId) {
        List<PostType> allByPostId = postTypeRepository.findAllByPostIdOrderByNumber(postId);
        List<AdminTypeListVo> list = allByPostId.stream().map(postType -> {
            AdminTypeListVo map = modelMapper.map(postType, AdminTypeListVo.class);
            map.setImagesList(Arrays.asList(map.getImages().split(",")));
            return map;
        }).collect(Collectors.toList());
        return JsonResponse.ok(list);
    }

    public JsonResponse updateType(Integer id,AdminTypeUpdateRequest type) {
        PostType map = postTypeRepository.findById(id).get();
        modelMapper.map(type, map);
        map.setUpdatedAt(LocalDateTime.now());
        postTypeRepository.saveAndFlush(map);
        return JsonResponse.ok("更新成功");
    }

    public JsonResponse createType(AdminTypeCreateRequest type) {
        PostType map = modelMapper.map(type, PostType.class);
        map.setCreatedAt(LocalDateTime.now());
        map.setUpdatedAt(LocalDateTime.now());
        map.setPostTitle(postRepository.findById(type.getPostId()).get().getTitle());
        postTypeRepository.saveAndFlush(map);
        return JsonResponse.ok("创建成功");
    }

    public JsonResponse deleteType(Integer id) {
        postTypeRepository.deleteById(id);
        return JsonResponse.ok("删除成功");
    }

    public JsonResponse updateTypesOrder(List<Integer> ids) {
        for (int i = 0; i < ids.size(); i++) {
            PostType postType = postTypeRepository.findById(ids.get(i)).get();
            postType.setNumber(i);
            postTypeRepository.saveAndFlush(postType);
        }
        return JsonResponse.ok("更新成功");
    }

}
