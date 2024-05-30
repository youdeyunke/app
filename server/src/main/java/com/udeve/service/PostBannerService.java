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

import com.udeve.request.AdminPostBannerCreateRequest;
import com.udeve.vo.AdminPostBannerListVo;
import com.udeve.request.AdminPostBannerUpdateRequest;
import com.udeve.entity.MyEnumeration;
import com.udeve.entity.PostBanner;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.udeve.repository.MyEnumerationRepository;
import com.udeve.repository.PostBannerRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PostBannerService {

    @Autowired
    PostBannerRepository postBannerRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    MyEnumerationRepository myEnumerationRepository;

    public JsonResponse getPostBannerList(Integer postId) {
        List<MyEnumeration> postBannerCat = myEnumerationRepository.findByCatAndIsDeleteFalseOrderByNumberDesc("post_banner_cat");
        List<PostBanner> postBannerList = postBannerRepository.findAllByPostIdOrderByNumberAsc(postId);
        List<AdminPostBannerListVo> list = postBannerList.stream().map(postBanner -> {
            AdminPostBannerListVo map = modelMapper.map(postBanner, AdminPostBannerListVo.class);
            String catName = postBannerCat.stream().filter(myEnumeration -> myEnumeration.getValue().equals(postBanner.getCat())).findFirst().get().getName();
            map.setCatName(catName);
            return map;
        }).collect(Collectors.toList());
        return JsonResponse.ok(list);
    }

    public JsonResponse updatePostBanner(Integer id,AdminPostBannerUpdateRequest postBanner) {
        PostBanner map = postBannerRepository.findById(id).get();
        modelMapper.map(postBanner, map);
        map.setUpdatedAt(LocalDateTime.now());
        if (map.getNumber() == null) {
            map.setNumber(0);
        }
        postBannerRepository.saveAndFlush(map);
        return JsonResponse.ok("更新成功");
    }

    public JsonResponse createPostBanner(AdminPostBannerCreateRequest postBanner) {
        PostBanner map = modelMapper.map(postBanner, PostBanner.class);
        map.setCreatedAt(LocalDateTime.now());
        map.setUpdatedAt(LocalDateTime.now());
        if (map.getNumber() == null) {
            map.setNumber(0);
        }
        postBannerRepository.saveAndFlush(map);
        return JsonResponse.ok("创建成功");
    }

    public JsonResponse deletePostBanner(Integer id) {
        postBannerRepository.deleteById(id);
        return JsonResponse.ok("删除成功");
    }

}
