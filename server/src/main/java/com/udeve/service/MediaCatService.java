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
import com.udeve.entity.BrokerProfile;
import com.udeve.entity.CatEntity;
import com.udeve.repository.BrokerProfileRepository;
import com.udeve.request.AdminMediaCatCreateRequest;
import com.udeve.request.MediaCatCreateRequest;
import com.udeve.vo.AdminMediaCatListVo;
import com.udeve.request.AdminMediaCatUpdateRequest;
import com.udeve.entity.MediaCat;
import com.udeve.entity.MediaItem;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.WeappPostXiangceVo;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.udeve.repository.MediaCatRepository;
import com.udeve.repository.MediaItemRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class MediaCatService {

    @Autowired
    MediaCatRepository mediaCatRepository;
    @Autowired
    MediaItemRepository mediaItemRepository;
    @Autowired
    BrokerProfileRepository brokerProfileRepository;
    @Autowired
    ModelMapper modelMapper;

    public JsonResponse getMediaCatList(String targetType, Integer targetId) {
        List<MediaCat> all = mediaCatRepository.findByTargetTypeAndTargetIdOrderByNumberAsc(targetType, targetId);
        List<AdminMediaCatListVo> list = all.stream().map(mediaCat -> {
            AdminMediaCatListVo map = modelMapper.map(mediaCat, AdminMediaCatListVo.class);
            return map;
        }).collect(Collectors.toList());

        return JsonResponse.ok(list);
    }

    public JsonResponse getMediaCatDetail(Integer id) {
        MediaCat mediaCat = mediaCatRepository.findById(id).orElse(null);
        if (mediaCat == null) {
            return JsonResponse.error("相册不存在");
        }
        AdminMediaCatListVo map = modelMapper.map(mediaCat, AdminMediaCatListVo.class);
        List<MediaItem> byMediaCatId = mediaItemRepository.findByMediaCatIdOrderByNumberAsc(id);
        JSONObject resp = new JSONObject();
        resp.put("data", map);
        resp.put("media_items", byMediaCatId);
        return JsonResponse.ok(resp);
    }

    public JsonResponse updateMediaCat(Integer id,AdminMediaCatUpdateRequest mediaCatUpdateDto) {
        MediaCat map = mediaCatRepository.findById(id).orElse(null);
        if (map == null) {
            return JsonResponse.error("相册不存在");
        }
        modelMapper.map(mediaCatUpdateDto, map);
        map.setUpdatedAt(LocalDateTime.now());
        mediaCatRepository.saveAndFlush(map);
        return JsonResponse.ok("更新成功");
    }

    public JsonResponse createMediaCat(AdminMediaCatCreateRequest mediaCatUpdateDto) {
        MediaCat map = modelMapper.map(mediaCatUpdateDto, MediaCat.class);
        map.setItemsCount(0);
        map.setCreatedAt(LocalDateTime.now());
        map.setUpdatedAt(LocalDateTime.now());
        mediaCatRepository.saveAndFlush(map);
        return JsonResponse.ok("创建成功");
    }

    @Transactional
    public JsonResponse deleteMediaCat(Integer id) {
        mediaItemRepository.deleteByMediaCatId(id);
        mediaCatRepository.deleteById(id);
        return JsonResponse.ok("删除成功");
    }

    public JsonResponse updateMediaCatsOrder(List<Integer> ids) {
        for (int i = 0; i < ids.size(); i++) {
            MediaCat mediaCat = mediaCatRepository.findById(ids.get(i)).orElse(null);
            if (mediaCat == null){
                return JsonResponse.error("相册不存在");
            }
            mediaCat.setNumber(i);
            mediaCatRepository.saveAndFlush(mediaCat);
        }
        return JsonResponse.ok("更新成功");
    }
    //小程序接口
    public JsonResponse weAppGetMediaCatList(String targetType,Integer targetId){
        List<MediaCat> mediaCats = mediaCatRepository.findByTargetTypeAndTargetIdOrderByNumberAsc(targetType, targetId);
        List<WeappPostXiangceVo> collect = mediaCats.stream().map(mediaCat -> {
            WeappPostXiangceVo map = modelMapper.map(mediaCat, WeappPostXiangceVo.class);
            map.setMediaItems(mediaItemRepository.findByMediaCatIdOrderByNumberAsc(mediaCat.getId()));
            return map;
        }).collect(Collectors.toList());
        return JsonResponse.ok(collect);
    }

    @Transactional
    public JsonResponse weAppDeleteMediaCat(Integer userId,Integer mediaCatId){
        BrokerProfile brokerProfile = brokerProfileRepository.findByUserId(userId);
        if(brokerProfile==null){
            return JsonResponse.error("该置业顾问没有主营楼盘");
        }
        if (brokerProfile.getStatus()!=2) {
            return JsonResponse.error("当前置业顾问状态异常");
        }
        Integer postId = brokerProfile.getPostId();
        Optional<MediaCat> optionalMediaCat = mediaCatRepository.findById(mediaCatId);
        if (optionalMediaCat.isEmpty()){
            return JsonResponse.error("相册不存在");
        }
        Integer targetId = optionalMediaCat.get().getTargetId();
        if(!postId.equals(targetId)){
            return JsonResponse.error("删除错误，请重试");
        }
        mediaItemRepository.deleteByMediaCatId(mediaCatId);
        mediaCatRepository.deleteById(mediaCatId);
        return JsonResponse.ok("删除相册成功");
    }

    public JsonResponse weAppCreateMediaCat(Integer userId,MediaCatCreateRequest mediaCatCreateRequest){
        BrokerProfile brokerProfile = brokerProfileRepository.findByUserId(userId);
        if(brokerProfile==null){
            return JsonResponse.error("未绑定楼盘");
        }
        if (brokerProfile.getStatus()!=2) {
            return JsonResponse.error("当前置业顾问状态异常");
        }
        Integer postId = brokerProfile.getPostId();
        //前端未传target_id，无法判断是否是置业顾问操作自己的楼盘的相册
        Integer targetId = mediaCatCreateRequest.getTargetId();
        if(!postId.equals(targetId)){
            return JsonResponse.error("创建楼盘相册错误，请重试");
        }
        MediaCat map = modelMapper.map(mediaCatCreateRequest, MediaCat.class);
        map.setTargetId(postId);
        map.setCreatedAt(LocalDateTime.now());
        map.setUpdatedAt(LocalDateTime.now());
        map.setItemsCount(0);
        mediaCatRepository.saveAndFlush(map);
        return JsonResponse.ok("创建成功");
    }

    public  JsonResponse weAppUpdateMediaCat(Integer userId,Integer id, Map catData){
        BrokerProfile brokerProfile = brokerProfileRepository.findByUserId(userId);
        if(brokerProfile.getPostId()==null){
            return JsonResponse.error("未绑定楼盘");
        }
        if (brokerProfile.getStatus()!=2) {
            return JsonResponse.error("当前置业顾问状态异常");
        }
        MediaCat mediaCat = mediaCatRepository.findById(id).orElse(null);
        if (mediaCat == null){
            return JsonResponse.error("相册不存在");
        }
        Integer targetId = mediaCat.getTargetId();
        Integer postId = brokerProfile.getPostId();
        if(!targetId.equals(postId)){
            return JsonResponse.error("操作异常，请重试");
        }
        mediaCat.setName(catData.get("name").toString());
        mediaCat.setUpdatedAt(LocalDateTime.now());
        mediaCatRepository.saveAndFlush(mediaCat);
        return JsonResponse.ok("修改成功");
    }
}
