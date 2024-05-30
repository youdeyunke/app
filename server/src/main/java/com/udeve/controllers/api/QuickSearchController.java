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
import java.util.List;
import java.util.stream.Collectors;

import com.udeve.entity.Post;
import com.udeve.repository.PostRepository;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.WeappSimplePostListVo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.udeve.BaseApiController;

@RestController
public class QuickSearchController extends BaseApiController {
    @Autowired
    PostRepository postRepository;
    @Autowired
    ModelMapper modelMapper;

    @GetMapping(value="/v6/quicksearch")
    public JsonResponse Index(@RequestParam(name="kw") String keyword){
        List<Post> posts =  postRepository.findByTitleContainingAndIsPublicTrueAndIsDeleteFalse(keyword);
        List<WeappSimplePostListVo> collect = posts.stream().map(post -> {
            WeappSimplePostListVo map = modelMapper.map(post, WeappSimplePostListVo.class);
            return map;
        }).collect(Collectors.toList());
        return new JsonResponse().ok(collect);
    }
}
