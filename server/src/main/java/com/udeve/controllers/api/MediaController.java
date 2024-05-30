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

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import com.udeve.BaseApiController;
import com.udeve.entity.MediaCat;
import com.udeve.repository.MediaCatRepository;
import com.udeve.repository.MediaItemRepository;
import com.udeve.request.MediaCatCreateRequest;
import com.udeve.request.MediaItemCreateRequest;
import com.udeve.service.MediaCatService;
import com.udeve.service.MediaFileService;
import com.udeve.service.MediaItemService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.WeappPostXiangceVo;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@Slf4j
@Api(tags = "小程序楼盘相册接口接口")
public class MediaController extends BaseApiController {

    @Autowired
    MediaCatService mediaCatService;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    MediaItemService mediaItemService;

    @GetMapping("/v6/media_cats/")
    public JsonResponse getMediaCatList(@RequestParam("target_type") String targetType, @RequestParam("target_id") Integer targetId){
        return mediaCatService.weAppGetMediaCatList(targetType,targetId);
    }

    @DeleteMapping(value = "/v6/media_cats/{mediaCatId}")
    @SaCheckLogin
    @SaCheckRole("broker")
    public JsonResponse weAppDeleteMediaCat(@PathVariable Integer mediaCatId){
        Integer userId = (Integer) getUser().get("user_id");
        return mediaCatService.weAppDeleteMediaCat(userId,mediaCatId);
    }

    @PostMapping(value = "/v6/media_cats/")
    @SaCheckLogin
    @SaCheckRole("broker")
    public JsonResponse weAppCreateMediaCat(@Valid @RequestBody MediaCatCreateRequest mediaCatCreateRequest){
        Integer userId = (Integer) getUser().get("user_id");
        return mediaCatService.weAppCreateMediaCat(userId,mediaCatCreateRequest);
    }

    @PutMapping(value = "/v6/media_cats/{id}")
    @SaCheckLogin
    @SaCheckRole("broker")
    public JsonResponse weAppUpdateMediaCat(@PathVariable Integer id, @RequestBody Map<String,Object> catData){
        Integer userId = (Integer) getUser().get("user_id");
        return mediaCatService.weAppUpdateMediaCat(userId,id,catData);
    }

    @DeleteMapping(value = "/v6/media_items/{mediaItemId}")
    @SaCheckLogin
    @SaCheckRole("broker")
    public JsonResponse weAppDeleteMediaItems(@PathVariable Integer mediaItemId){
        System.out.println("要删除：==============="+mediaItemId);
        Integer userId = (Integer) getUser().get("user_id");
        return mediaItemService.weAppDeleteMediaItems(userId,mediaItemId);
    }

    @PostMapping(value = "/v6/media_items/")
    @SaCheckLogin
    @SaCheckRole("broker")
    public JsonResponse weAppCreateMediaItems(@Valid @RequestBody MediaItemCreateRequest mediaItemCreateRequest){
        System.out.println(mediaItemCreateRequest);
        Integer userId = (Integer) getUser().get("user_id");
        return mediaItemService.weAppCreateMediaItems(userId,mediaItemCreateRequest);

    }


}
