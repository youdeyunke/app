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

import com.udeve.request.AdminMyEnumerationCreateRequest;
import com.udeve.vo.AdminMyEnumerationListVo;
import com.udeve.request.AdminMyEnumerationUpdateRequest;
import com.udeve.entity.MyEnumeration;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.udeve.repository.MyEnumerationRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class MyEnumerationService {

    @Autowired
    private MyEnumerationRepository myEnumerationRepository;
    @Autowired
    ModelMapper modelMapper;

    public JsonResponse getEnumerationList(String cat){

        if(cat == null || cat.isEmpty()){
            List<MyEnumeration> all = myEnumerationRepository.findByIsDeleteFalseOrderByNumberDesc();
            List<AdminMyEnumerationListVo> collect = all.stream().map(myEnumeration -> {
                AdminMyEnumerationListVo map = modelMapper.map(myEnumeration, AdminMyEnumerationListVo.class);
                return map;
            }).collect(Collectors.toList());
            return JsonResponse.ok(collect);
        }else {
            List<MyEnumeration> enums = myEnumerationRepository.findByCatAndIsDeleteFalseOrderByNumberDesc(cat);

            List<AdminMyEnumerationListVo> collect = enums.stream().map(myEnumeration -> {
                AdminMyEnumerationListVo map = modelMapper.map(myEnumeration, AdminMyEnumerationListVo.class);
                return map;
            }).collect(Collectors.toList());

            return JsonResponse.ok(collect);
        }

    }

    public JsonResponse createEnumeration(AdminMyEnumerationCreateRequest enumeration){

        MyEnumeration myEnumeration = modelMapper.map(enumeration, MyEnumeration.class);
        myEnumeration.setCreatedAt(LocalDateTime.now());
        myEnumeration.setUpdatedAt(LocalDateTime.now());
        myEnumerationRepository.saveAndFlush(myEnumeration);
        return JsonResponse.ok("新建成功");
    }

    public JsonResponse updataEnumeration(Integer id,AdminMyEnumerationUpdateRequest enumeration){

        MyEnumeration myEnumeration = myEnumerationRepository.findById(id).orElse(null);
        if (myEnumeration == null){
            return JsonResponse.error("数据不存在");
        }
        modelMapper.map(enumeration, myEnumeration);
        myEnumeration.setUpdatedAt(LocalDateTime.now());
        myEnumerationRepository.saveAndFlush(myEnumeration);
        return JsonResponse.ok("更新成功");
    }

    public JsonResponse deleteEnumeration(Integer id){
        MyEnumeration enumeration = myEnumerationRepository.findById(id).orElse(null);
        if (enumeration == null){
            return JsonResponse.error("数据不存在");
        }
        enumeration.setIsDelete(true);
        myEnumerationRepository.saveAndFlush(enumeration);
        return JsonResponse.ok("删除成功");
    }
}
