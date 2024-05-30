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

import com.alibaba.fastjson.JSONObject;
import com.udeve.entity.Album;
import com.udeve.entity.AlbumPost;
import com.udeve.entity.Post;
import com.udeve.repository.AlbumPostRepository;
import com.udeve.repository.AlbumRepository;
import com.udeve.repository.PostRepository;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class HotSearchService {

    @Autowired
    AlbumRepository albumRepository;
    @Autowired
    AlbumPostRepository albumPostRepository;
    @Autowired
    PostRepository postRepository;

    public JsonResponse getHotSearchList() {
        Album album = albumRepository.findFirstByName("热门搜索");

        List<JSONObject> collect = new ArrayList<>();
        List<Integer> ids = new ArrayList<>();
        if (album != null){
            List<AlbumPost> albumPosts = albumPostRepository.findByAlbumId(album.getId());
            albumPosts.forEach(albumPost -> {
                Post post = postRepository.findById(albumPost.getPostId()).get();
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("id", post.getId());
                jsonObject.put("title", post.getTitle());
                ids.add(post.getId());
                collect.add(jsonObject);
            });
        }

        if (collect.size() < 10) {
            List<Post> postList;
            if (ids.size() != 0){
                postList = postRepository.findTop10ByIdNotInAndIsPublicTrueAndIsDeleteFalseOrderBySearchNumsDesc(ids);
            }else {
                postList = postRepository.findTop10ByIsPublicTrueAndIsDeleteFalseOrderBySearchNumsDesc();
            }
            postList.forEach(post -> {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("id", post.getId());
                jsonObject.put("title", post.getTitle());
                jsonObject.put("search_nums", post.getSearchNums());
                collect.add(jsonObject);
            });
        }
        List<JSONObject> jsonObjects = collect.subList(0, Math.min(collect.size(), 10));
        return JsonResponse.ok(jsonObjects);
    }

    public JsonResponse createHoutSearch(Integer postId){
        Post post = postRepository.findById(postId).get();
        post.setSearchNums(post.getSearchNums() + 1);
        postRepository.saveAndFlush(post);
        return JsonResponse.ok("ok");
    }

}
