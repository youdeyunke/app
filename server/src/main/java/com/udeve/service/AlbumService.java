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

import com.udeve.request.AdminAlbumCreateRequest;
import com.udeve.vo.AdminAlbumListVo;
import com.udeve.request.AdminAlbumUpdateRequest;
import com.udeve.entity.Album;
import com.udeve.entity.AlbumPost;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.udeve.repository.AlbumPostRepository;
import com.udeve.repository.AlbumRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AlbumService {

    @Autowired
    private AlbumRepository albumRepository;
    @Autowired
    private AlbumPostRepository albumPostRepository;
    @Autowired
    ModelMapper modelMapper;

    public JsonResponse getAlbumList() {
        List<Album> all = albumRepository.findAll();
        List<AdminAlbumListVo> list = all.stream().map(album -> {
            AdminAlbumListVo map = modelMapper.map(album, AdminAlbumListVo.class);
            List<AlbumPost> postIdList = albumPostRepository.findByAlbumId(album.getId());
            List<Integer> postIds = postIdList.stream()
                    .map(AlbumPost::getPostId)
                    .collect(Collectors.toList());
            map.setPostCount(postIds.size());
            map.setPostIds(postIds);
            return map;
        }).collect(Collectors.toList());
        return JsonResponse.ok(list);
    }

    @Transactional
    public JsonResponse updateAlbum(Integer id, AdminAlbumUpdateRequest dto){
        Album album = albumRepository.findById(id).get();
        modelMapper.map(dto, album);

        albumRepository.save(album);
        return JsonResponse.ok("更新成功");
    }

    public JsonResponse createAlbum(AdminAlbumCreateRequest dto){
        Album map = modelMapper.map(dto, Album.class);
        map.setCreatedAt(LocalDateTime.now());
        map.setUpdatedAt(LocalDateTime.now());
        albumRepository.save(map);
        return JsonResponse.ok("创建成功");
    }

    @Transactional
    public JsonResponse deleteAlbum(Integer id){
        albumPostRepository.deleteByAlbumId(id);
        albumRepository.deleteById(id);
        return JsonResponse.ok("删除成功");
    }

    @Transactional
    public JsonResponse updateAlbumPosts(Integer id, AdminAlbumUpdateRequest dto){
        clearAlbumPost(id);
        dto.getPostIds().forEach(postId -> {
            AlbumPost albumPost = new AlbumPost();
            albumPost.setAlbumId(id);
            albumPost.setPostId(postId);
            albumPost.setCreatedAt(LocalDateTime.now());
            albumPost.setUpdatedAt(LocalDateTime.now());
            albumPostRepository.save(albumPost);
        });
        return JsonResponse.ok("更新成功");
    }

    public void clearAlbumPost(Integer albumId){
        List<AlbumPost> byAlbumId = albumPostRepository.findByAlbumId(albumId);
        albumPostRepository.deleteAll(byAlbumId);
    }

}
