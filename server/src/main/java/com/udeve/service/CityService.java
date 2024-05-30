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
import com.udeve.request.AdminCityCreateRequest;
import com.udeve.vo.AdminCityListVo;
import com.udeve.request.AdminCityUpdateRequest;
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
public class CityService {

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private DistrictRepository districtRepository;

    @Autowired
    ModelMapper modelMapper;

    public JsonResponse getCityList(){
        List<City> cityList = cityRepository.findAll();
        List<AdminCityListVo> collect = cityList.stream().map(city -> {
            AdminCityListVo map = modelMapper.map(city, AdminCityListVo.class);
            return map;
        }).collect(Collectors.toList());
        return JsonResponse.ok(collect);
    }

    public JsonResponse getCityDetail(Integer id){
        City city = cityRepository.findById(id).get();
        AdminCityListVo map = modelMapper.map(city, AdminCityListVo.class);
        return JsonResponse.ok(map);
    }

    public JsonResponse updateCity(Integer id,AdminCityUpdateRequest city){
        City map = cityRepository.findById(id).get();
        modelMapper.map(city, map);
        cityRepository.saveAndFlush(map);
        return JsonResponse.ok("更新成功");
    }

    public JsonResponse createCity(AdminCityCreateRequest city){
        City map = modelMapper.map(city, City.class);
        cityRepository.saveAndFlush(map);
        return JsonResponse.ok("新建成功");
    }

    public JsonResponse deleteCity(Integer id){
        Integer count = districtRepository.countByCityId(id);
        if(count > 0){
            return JsonResponse.error("该城市下有区域，不能删除");
        }
        cityRepository.deleteById(id);
        return JsonResponse.ok("删除成功");
    }

    public JsonResponse setDefaultCity(Integer id){
        cityRepository.updateDefaultById(id);
        return JsonResponse.ok("设置成功");
    }

    public JsonResponse getCityTree(){
        List<City> cityList = cityRepository.findAll();
        List<JSONObject> resList = cityList.stream().map( city -> {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("default",city.getDefaultValue());
            jsonObject.put("id",city.getId());
            jsonObject.put("is_public",city.getIsPublic());
            jsonObject.put("label",city.getName());
            jsonObject.put("level","city");
            jsonObject.put("text",city.getName());

            List<DistrictEntity> districtList = districtRepository.findByCityId(city.getId());

            List<JSONObject> disResList = districtList.stream().map( districtEntity -> {
                JSONObject disObject = new JSONObject();
                disObject.put("id",districtEntity.getId());
                disObject.put("is_public",districtEntity.getIsPublic());
                disObject.put("label",districtEntity.getName());
                disObject.put("level","district");
                disObject.put("text",districtEntity.getName());
                return disObject;
            } ).collect(Collectors.toList());

            jsonObject.put("children", disResList);

            return jsonObject;
        }).collect(Collectors.toList());
        return JsonResponse.ok(resList);
    }

    public JsonResponse getPublicCityTree(){
        List<City> cityList = cityRepository.findByIsPublicTrue();
        List<JSONObject> resList = cityList.stream()
                .map(this::createCityJSONObject)
                .collect(Collectors.toList());
        return JsonResponse.ok(resList);
    }

    private JSONObject createCityJSONObject(City city) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("default", city.getDefaultValue());
        jsonObject.put("id", city.getId());
        jsonObject.put("is_public", city.getIsPublic());
        jsonObject.put("label", city.getName());
        jsonObject.put("level", "city");
        jsonObject.put("text", city.getName());

        List<DistrictEntity> districtList = districtRepository.findByCityIdAndIsPublicTrue(city.getId());

        List<JSONObject> disResList = districtList.stream()
                .map(this::createDistrictJSONObject)
                .collect(Collectors.toList());

        jsonObject.put("children", disResList);

        return jsonObject;
    }

    private JSONObject createDistrictJSONObject(DistrictEntity districtEntity) {
        JSONObject disObject = new JSONObject();
        disObject.put("id", districtEntity.getId());
        disObject.put("is_public", districtEntity.getIsPublic());
        disObject.put("label", districtEntity.getName());
        disObject.put("level", "district");
        disObject.put("text", districtEntity.getName());
        return disObject;
    }

    public JsonResponse getWeappCityTree(){
        List<City> cityList = cityRepository.findByIsPublicTrue();
        List<JSONObject> resList = cityList.stream().map( city -> {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id",city.getId());
            jsonObject.put("adcode",city.getAdcode());
            jsonObject.put("label",city.getName());
            jsonObject.put("level","city");
            jsonObject.put("text",city.getName());

            List<DistrictEntity> districtList = districtRepository.findByCityIdAndIsPublicTrue(city.getId());

            List<JSONObject> disResList = districtList.stream().map( districtEntity -> {
                JSONObject disObject = new JSONObject();
                disObject.put("id",districtEntity.getId());
                disObject.put("label",districtEntity.getName());
                disObject.put("level","district");
                disObject.put("text",districtEntity.getName());
                return disObject;
            } ).collect(Collectors.toList());

            jsonObject.put("children", disResList);

            return jsonObject;
        }).collect(Collectors.toList());
        JSONObject first = new JSONObject();
        first.put("id",0);
        first.put("text","不限");
        resList.add(0, first);
        return JsonResponse.ok(resList);
    }

}
