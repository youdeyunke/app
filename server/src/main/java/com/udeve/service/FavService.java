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
import com.udeve.entity.Fav;
import com.udeve.entity.House;
import com.udeve.entity.Post;
import com.udeve.repository.FavRepository;
import com.udeve.repository.HouseRepository;
import com.udeve.repository.PostRepository;
import com.udeve.request.CommonRequest;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.HouseItemForListingVo;
import com.udeve.vo.PostItemForListingVo;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class FavService {

    @Autowired
    FavRepository favRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    PostRepository postRepository;

    @Autowired
    HouseRepository houseRepository;

    /**
     * 用户收藏或取消收藏接口
     * @param targetType
     * @param targetId
     * @return
     */
    public JsonResponse addFavOrCancel(String targetType, Integer targetId, Integer userId, String userMobile) {
        if (targetType == null) {
            return JsonResponse.error("targetType不能为空");
        }
        if (targetId == null) {
            return JsonResponse.error("targetId不能为空");
        }
        String postTitle = postRepository.findById(targetId).get().getTitle();
        Fav fav = favRepository.findByTargetTypeAndTargetIdAndUserId(targetType, targetId,userId);
        //说明已经收藏了，需要取消收藏
        if(fav != null){
            log.info("取消收藏");
            //删除数据库记录
            favRepository.deleteById(fav.getId());
            return JsonResponse.ok(false);
        }
        //未收藏，需要添加收藏
        log.info("添加收藏");
        Fav fav1 = new Fav();
        fav1.setTargetType(targetType);
        fav1.setTargetId(targetId);
        fav1.setUserId(userId);
        fav1.setUpdatedAt(LocalDateTime.now());
        Fav save = favRepository.save(fav1);
        if(save == null){
            return JsonResponse.error("添加收藏失败");
        }
        return JsonResponse.ok(true);
    }

    /**
     * 获取是否收藏的状态，用于前端渲染icon图标
     * @param targetType
     * @param targetId
     * @param userId
     * @return
     */
    public JsonResponse getList(String targetType, Integer targetId, Integer userId){
        if (targetType == null) {
            return JsonResponse.error("targetType不能为空");
        }
        if (targetId == null) {
            return JsonResponse.error("targetId不能为空");
        }
        Fav fav = favRepository.findByTargetTypeAndTargetIdAndUserId(targetType, targetId, userId);
        JSONObject value = new JSONObject();
        if(fav == null){
            value.put("status",0);
            return JsonResponse.ok(value);
        }
        value.put("status",1);
        return JsonResponse.ok(value);
    }

    /**
     * 根据用户id获取用户的收藏列表
     * @param userId
     * @param request
     * @return
     */
    public JsonResponse getMyFavsList(Integer userId, CommonRequest request,String targetType){
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        PageRequest pageable = PageRequest.of(request.getPage() - 1, request.getPerPage(), sort);
        //根据targetType和userId获取收藏列表
        Page<Fav> getMyFavListByUserId = favRepository.findByUserIdAndTargetType(userId,targetType,pageable);
        //获取二手房或新房的ids
        List<Integer> ids = getMyFavListByUserId.getContent().stream().map(item -> item.getTargetId()).collect(Collectors.toList());
        if(targetType.equals("post")){
            List<Post> postList = postRepository.findByIds(ids, pageable);
            List<PostItemForListingVo> postItemForListingVos = postList.stream().map(post -> {
                return modelMapper.map(post, PostItemForListingVo.class);
            }).collect(Collectors.toList());
            return JsonResponse.ok(postItemForListingVos);
        }
        List<House> housesList = houseRepository.findByIds(ids, pageable);
        List<HouseItemForListingVo> houseItemForListingVos = housesList.stream().map(house -> {
                    HouseItemForListingVo map = modelMapper.map(house, HouseItemForListingVo.class);
                    if(map.getCover()==null || ("").equals(map.getCover())){
                        //TODO 改为素材图
                        map.setCover(map.getImageList().size()==0?"https://qiniucdn.udeve.cn/udyk/659e5134e4b04bdf00a71575.png":map.getImageList().get(0));
                    }
                    return map;
                })
                .collect(Collectors.toList());
        return JsonResponse.ok(houseItemForListingVos);
    }
}
