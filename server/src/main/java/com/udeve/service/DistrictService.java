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

import com.udeve.request.AdminDistrictCreateRequest;
import com.udeve.vo.AdminDistrictListVo;
import com.udeve.request.AdminDistrictUpdateRequest;
import com.udeve.entity.City;
import com.udeve.entity.DistrictEntity;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.udeve.repository.CityRepository;
import com.udeve.repository.DistrictRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class DistrictService {

    @Autowired
    private DistrictRepository districtRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    ModelMapper modelMapper;

    public JsonResponse getDistrictList(Integer cityId) {


        List<DistrictEntity> list = districtRepository.findByCityId(cityId);
        List<AdminDistrictListVo> result = list.stream().map(districtEntity -> {
            AdminDistrictListVo dto = modelMapper.map(districtEntity, AdminDistrictListVo.class);
            dto.setCityId(districtEntity.getCity().getId());
            dto.setFullname(districtEntity.getCity().getName() + "-" + districtEntity.getName());
            return dto;
        }).collect(Collectors.toList());
        return JsonResponse.ok(result);
    }

    public JsonResponse getDistrict(Integer id) {
        DistrictEntity districtEntity = districtRepository.findById(id).orElse(null);
        if (districtEntity == null) {
            return JsonResponse.error("未找到该区域");
        }
        AdminDistrictListVo res = modelMapper.map(districtEntity, AdminDistrictListVo.class);
        res.setCityId(districtEntity.getCity().getId());
        res.setFullname(districtEntity.getCity().getName() + "-" + districtEntity.getName());
        return JsonResponse.ok(res);
    }

    public JsonResponse updateDistrict(Integer id,AdminDistrictUpdateRequest district){
        DistrictEntity districtEntity = districtRepository.findById(id).orElse(null);
        if (districtEntity == null) {
            return JsonResponse.error("未找到该区域");
        }
        modelMapper.map(district, districtEntity);
        City city = cityRepository.findById(district.getCityId()).orElse(null);
        if (city == null){
            return JsonResponse.error("未找到该城市");
        }
        districtEntity.setCity(city);
        districtRepository.saveAndFlush(districtEntity);
        return JsonResponse.ok("更新成功");
    }

    public JsonResponse createDistrict(AdminDistrictCreateRequest district){
        DistrictEntity districtEntity = modelMapper.map(district, DistrictEntity.class);
        City city = cityRepository.findById(district.getCityId()).orElse(null);
        if (city == null){
            return JsonResponse.error("未找到该城市");
        }
        districtEntity.setCity(city);
        districtEntity.setIsPublic(true);
        districtEntity.setNumber(0);
        districtRepository.saveAndFlush(districtEntity);
        return JsonResponse.ok("新建成功");
    }

    public JsonResponse deleteDistrict(Integer id){
        districtRepository.deleteById(id);
        return JsonResponse.ok("删除成功");
    }
}
