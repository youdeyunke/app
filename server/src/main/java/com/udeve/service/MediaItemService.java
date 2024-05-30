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

import com.udeve.entity.BrokerProfile;
import com.udeve.repository.BrokerProfileRepository;
import com.udeve.request.AdminMediaItemCreateRequest;
import com.udeve.request.AdminMediaItemUpdateRequest;
import com.udeve.entity.MediaCat;
import com.udeve.entity.MediaItem;
import com.udeve.request.MediaItemCreateRequest;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.AbstractConverter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.udeve.repository.MediaCatRepository;
import com.udeve.repository.MediaItemRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class MediaItemService{

    @Autowired
    MediaItemRepository mediaItemRepository;
    @Autowired
    MediaCatRepository mediaCatRepository;
    @Autowired
    BrokerProfileRepository brokerProfileRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    BrokerProfileService brokerProfileService;

    public JsonResponse createMediaItem(AdminMediaItemCreateRequest mediaItemUpdateDto) {
        MediaItem map = modelMapper.map(mediaItemUpdateDto, MediaItem.class);
        map.setCreatedAt(LocalDateTime.now());
        map.setUpdatedAt(LocalDateTime.now());
        mediaItemRepository.saveAndFlush(map);
        MediaCat mediaCat = mediaCatRepository.findById(mediaItemUpdateDto.getMediaCatId()).get();
        mediaCat.setItemsCount(mediaItemRepository.countByMediaCatId(mediaItemUpdateDto.getMediaCatId()));
        mediaCatRepository.saveAndFlush(mediaCat);
        return JsonResponse.ok("创建成功");
    }

    public JsonResponse updateMediaItem(Integer id,AdminMediaItemUpdateRequest mediaItemUpdateDto) {
        MediaItem mediaItem = mediaItemRepository.findById(id).get();
        modelMapper.map(mediaItemUpdateDto, mediaItem);
        mediaItem.setUpdatedAt(LocalDateTime.now());
        mediaItemRepository.saveAndFlush(mediaItem);
        return JsonResponse.ok("更新成功");
    }

    public JsonResponse deleteMediaItem(Integer id) {
        mediaItemRepository.deleteById(id);
        return JsonResponse.ok("删除成功");
    }

    public JsonResponse updateMediaItemsOrder(List<Integer> ids) {
        for (int i = 0; i < ids.size(); i++) {
            MediaItem mediaItem = mediaItemRepository.findById(ids.get(i)).get();
            mediaItem.setNumber(i);
            mediaItemRepository.saveAndFlush(mediaItem);
        }
        return JsonResponse.ok("更新成功");
    }
    //小程序接口
    public JsonResponse weAppDeleteMediaItems(Integer userId,Integer mediaItemId){
        MediaItem mediaItem = mediaItemRepository.findById(mediaItemId).get();
        if(mediaItem==null){
            return JsonResponse.ok("要删除的照片不存在");
        }
        Integer mediaCatId = mediaItem.getMediaCatId();
        Integer targetId = mediaCatRepository.findById(mediaCatId).get().getTargetId();
        BrokerProfile brokerProfile = brokerProfileService.isBrokerOrNo(userId);
        if (brokerProfile==null) {
            return JsonResponse.error("当前置业顾问状态异常");
        }
        Integer postId = brokerProfile.getPostId();
        if(!targetId.equals(postId)){//置业顾问操作了不是自己主营的楼盘
            return JsonResponse.error("操作异常");
        }
        mediaItemRepository.deleteById(mediaItemId);
        return JsonResponse.ok("删除照片成功");
    }

    public JsonResponse weAppCreateMediaItems(Integer userId, MediaItemCreateRequest mediaItemCreateRequest){
        Integer catId = mediaItemCreateRequest.getMediaCatId();
        MediaCat mediaCat = mediaCatRepository.findById(catId).get();
        if(mediaCat==null){
            return JsonResponse.error("相册不存在");
        }
        Integer targetId = mediaCat.getTargetId();
        BrokerProfile brokerProfile = brokerProfileService.isBrokerOrNo(userId);
        if (brokerProfile==null) {
            return JsonResponse.error("当前置业顾问状态异常");
        }
        Integer postId = brokerProfile.getPostId();
        if(!targetId.equals(postId)){
            return JsonResponse.error("操作异常");
        }
        MediaItem map = modelMapper.map(mediaItemCreateRequest, MediaItem.class);
        map.setCreatedAt(LocalDateTime.now());
        map.setUpdatedAt(LocalDateTime.now());
        MediaItem mediaItem = mediaItemRepository.saveAndFlush(map);
        if(mediaItem==null){
            return JsonResponse.error("添加照片失败");
        }
        return JsonResponse.ok("添加照片成功");
    }


}
