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

import cn.binarywang.wx.miniapp.api.WxMaQrcodeService;
import cn.binarywang.wx.miniapp.api.WxMaService;
import cn.hutool.core.util.ObjectUtil;
import com.udeve.request.AdminTourCreateRequest;
import com.udeve.request.AdminTourUpdateRequest;
import com.udeve.request.TourQueryRequest;
import com.udeve.vo.FileInfo;
import com.alibaba.fastjson.JSONObject;
import com.udeve.repository.*;
import com.udeve.vo.*;
import com.udeve.entity.Tour;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.common.error.WxErrorException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.criteria.*;
import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class TourService {

    @Autowired
    StringRedisTemplate stringRedisTemplate;
    @Autowired
    AdminLogService adminLogService;
    @Autowired
    TourRepository tourRepository;
    @Autowired
    UploadService uploadService;
    @Autowired
    WxMaService wxMaService;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    MyconfigService myconfigService;

    public JsonResponse getTourDetail(Integer tourId){
        Tour tour = tourRepository.findByIdAndIsDeleteFalse(tourId);
        if(ObjectUtil.equals(tour, null)){
            return JsonResponse.error("活动不存在");
        }
        TourDetailVo data  = modelMapper.map(tour, TourDetailVo.class);
        return JsonResponse.ok(data);
    }

    public Page<Tour> getTourList(TourQueryRequest query){
        Specification<Tour> specification = (Specification<Tour>)(Root<Tour> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            //增加一个id大于0的默认条件
            predicates.add(criteriaBuilder.greaterThan(root.get("id"), 0));
            predicates.add(criteriaBuilder.equal(root.get("isDelete"), false));
            if(!ObjectUtil.equals(query.getKw(), null)){
                predicates.add(criteriaBuilder.or(criteriaBuilder.like(root.get("title"), "%" + query.getKw() + "%")));
            }
            if(ObjectUtil.equals(query.getScope(),"public")){
                predicates.add(criteriaBuilder.equal(root.get("isPublic"), true));
            }
            if (query.getPostId() != null){
                Expression<String> postIdsWithComma = criteriaBuilder.concat(criteriaBuilder.concat(",", root.get("postIds")), ",");
                predicates.add(criteriaBuilder.like(postIdsWithComma, "%," + query.getPostId() + ",%"));
            }
            if (query.getIsEnd() != null){
                if (query.getIsEnd()){
                    predicates.add(criteriaBuilder.lessThan(root.get("endsAt"), LocalDateTime.now()));
                } else {
                    predicates.add(criteriaBuilder.greaterThan(root.get("endsAt"), LocalDateTime.now()));
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(query.getPage()-1,query.getPerPage(), sort);
        return tourRepository.findAll(specification, pageable);
    }


    public JsonResponse getAdminTourList(TourQueryRequest queryDto){
        Page<Tour> pageResult = getTourList(queryDto);
        List<AdminTourListVo> list = pageResult.getContent().stream().map(tour -> {
            AdminTourListVo adminTourListVo = modelMapper.map(tour, AdminTourListVo.class);
            return adminTourListVo;
        }).collect(Collectors.toList());
        JSONObject data = new JSONObject();
        PageableInfoVo page = new PageableInfoVo(pageResult.getPageable(),pageResult.getTotalPages() ,pageResult.getTotalElements() );
        data.put("result", list);
        data.put("page", page);
        return JsonResponse.ok(data);
    }

    public JsonResponse getWeappTourList(TourQueryRequest queryDto){
        Page<Tour> tours = getTourList(queryDto);
        List<TourListingItemVo> list = tours.getContent().stream().map(tour -> {
            TourListingItemVo tourListingItemVo = modelMapper.map(tour, TourListingItemVo.class);
            return tourListingItemVo;
        }).collect(Collectors.toList());
        return JsonResponse.ok(list);
    }

    public JsonResponse getTour(Integer id){
        Tour tour = tourRepository.findByIdAndIsDeleteFalse(id);
        if(tour == null){
            return JsonResponse.error("活动不存在");
        }
        TourDetailVo map = modelMapper.map(tour, TourDetailVo.class);
        return JsonResponse.ok(map);
    }

    @Transactional
    public JsonResponse updateTour(Integer id, AdminTourUpdateRequest adminTourUpdateRequest, Integer userId){
        String[] postIdList = adminTourUpdateRequest.getPostIds().split(",");
        if (postIdList.length > 10){
            return JsonResponse.error("活动绑定楼盘不能超过十个");
        }
        Tour tour = tourRepository.findByIdAndIsDeleteFalse(id);
        if(tour == null){
            return JsonResponse.error("活动不存在");
        }
        modelMapper.map(adminTourUpdateRequest, tour);
        return verifyTour(tour, userId);
    }

    @Transactional
    public JsonResponse createTour(AdminTourCreateRequest adminTourCreate, Integer userId)  {
        String[] postIdList = adminTourCreate.getPostIds().split(",");
        if (postIdList.length > 10){
            return JsonResponse.error("活动绑定楼盘不能超过十个");
        }
        Tour tour = new Tour();
        tour.setCreatedAt(LocalDateTime.now());
        tour.setUpdatedAt(LocalDateTime.now());
        modelMapper.map(adminTourCreate, tour);
        return verifyTour(tour, userId);
    }

    public JsonResponse verifyTour(Tour tour, Integer userId){

        if (tour.getId() == null){
            tourRepository.saveAndFlush(tour);
            adminLogService.createAdminLog(userId, "活动管理", "创建活动：" + tour.getTitle() + "，ID：" + tour.getId());
        } else {
            tourRepository.saveAndFlush(tour);
            adminLogService.createAdminLog(userId, "活动管理", "更新活动：" + tour.getTitle() + "，ID：" + tour.getId());
        }


        return JsonResponse.ok();
    }

    @Transactional
    public JsonResponse deleteTour(Integer id, Integer userId){
        Tour tour = tourRepository.findByIdAndIsDeleteFalse(id);
        if(tour == null){
            return JsonResponse.error("活动不存在");
        }
        tour.setIsDelete(true);
        tourRepository.saveAndFlush(tour);
        adminLogService.createAdminLog(userId, "活动管理", "删除活动：" + tour.getTitle() + "，ID：" + tour.getId());
        return JsonResponse.ok("删除成功");
    }
}
