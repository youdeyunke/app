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
import com.udeve.entity.City;
import com.udeve.entity.DistrictEntity;
import com.udeve.entity.House;
import com.udeve.entity.Post;
import com.udeve.repository.CityRepository;
import com.udeve.repository.DistrictRepository;
import com.udeve.repository.HouseRepository;
import com.udeve.repository.PostRepository;
import com.udeve.request.HouseSearchRequest;
import com.udeve.request.PostQueryRequest;
import com.udeve.request.WeappMapMarketQueryRequest;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Slf4j
public class MapMarkerService {

    @Autowired
    private CityRepository cityRepository;
    @Autowired
    private DistrictRepository districtRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    HouseRepository houseRepository;
    @Autowired
    PostService postService;
    @Autowired
    HouseService houseService;

    public JsonResponse getMapMarkerList(WeappMapMarketQueryRequest request){
        if (request.getLevel().equals("city")) {
            List<JSONObject> cityMarkerList = getCityMarkerList();
            return JsonResponse.ok(cityMarkerList);
        }
        if (request.getLevel().equals("district")) {
            List<JSONObject> districtMarkerList = getDistrictMarkerList(request.getCityId());
            return JsonResponse.ok(districtMarkerList);
        }
        if (request.getLevel().equals("post")) {
            List<JSONObject> postMarkerList = getPostMarkerList(request.getDistrictId());
            return JsonResponse.ok(postMarkerList);
        }
        return JsonResponse.ok("请求参数错误");
    }

    public List<JSONObject> getCityMarkerList(){
        List<City> byIsPublicTrue = cityRepository.findByIsPublicTrue();
        List<JSONObject> collect = byIsPublicTrue.stream().map(city -> {
            Integer cityPost = postRepository.countByCity_IdAndIsPublicTrueAndIsDeleteFalse(city.getId());
            if (cityPost == 0) {
                return null;
            }
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id", city.getId());
            jsonObject.put("name", city.getName());
            jsonObject.put("level", "city");
            Post citypost = postRepository.findFirstByCity_IdAndIsPublicTrueAndIsDeleteFalse(city.getId());
            if (citypost.getLatitude() == null || citypost.getLongitude() == null) {
                return null;
            }
            jsonObject.put("latitude", citypost.getLatitude());
            jsonObject.put("longitude", citypost.getLongitude());
            return jsonObject;
        }).collect(Collectors.toList());
        List<JSONObject> res = collect.stream().filter(Objects::nonNull).collect(Collectors.toList());
        return res;
    }

    public List<JSONObject> getDistrictMarkerList(Integer cityId){
        if( cityId == null ){
            cityId = cityRepository.findByIsPublicTrue().get(0).getId();
        }
        List<DistrictEntity> districtEntityList = districtRepository.findByCityIdAndIsPublicTrue(cityId);
        List<JSONObject> collect = districtEntityList.stream().map(districtEntity -> {
            Integer districtPost = postRepository.countByDistrict_IdAndIsPublicTrueAndIsDeleteFalse(districtEntity.getId());
            if (districtPost == 0) {
                return null;
            }
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id", districtEntity.getId());
            jsonObject.put("name", districtEntity.getName());
            jsonObject.put("level", "district");
            Post districtpost = postRepository.findFirstByDistrict_IdAndIsPublicTrueAndIsDeleteFalse(districtEntity.getId());
            if (districtpost.getLatitude() == null || districtpost.getLongitude() == null) {
                return null;
            }
            jsonObject.put("latitude", districtpost.getLatitude());
            jsonObject.put("longitude", districtpost.getLongitude());
            return jsonObject;
        }).collect(Collectors.toList());
        List<JSONObject> res = collect.stream().filter(Objects::nonNull).collect(Collectors.toList());
        return res;
    }

    public List<JSONObject> getPostMarkerList(Integer districtId){
        if( districtId == null ){
            districtId = districtRepository.findByCityIdAndIsPublicTrue(cityRepository.findByIsPublicTrue().get(0).getId()).get(0).getId();
        }
        PostQueryRequest postQueryRequest = new PostQueryRequest();
        postQueryRequest.setDistrictId(districtId);
        postQueryRequest.setPage(1);
        postQueryRequest.setPerPage(100);
        Page<Post> listing = postService.getListing(postQueryRequest);
        List<JSONObject> collect = listing.getContent().stream().map(post -> {
            JSONObject jsonObject = new JSONObject();
            if (post.getLatitude() == null || post.getLongitude() == null) {
                return null;
            }
            jsonObject.put("id", post.getId());
            jsonObject.put("name", post.getTitle());
            jsonObject.put("sub_name", (String) post.getAveragePriceInfo().get("text") + (String)  post.getAveragePriceInfo().get("px"));
            jsonObject.put("level", "post");
            jsonObject.put("latitude", post.getLatitude());
            jsonObject.put("longitude", post.getLongitude());
            return jsonObject;
        }).collect(Collectors.toList());
        List<JSONObject> res = collect.stream().filter(Objects::nonNull).collect(Collectors.toList());
        return res;
    }


    public JsonResponse getMapMarkerListForHouse(WeappMapMarketQueryRequest request){
        if (request.getLevel().equals("city")) {
            List<JSONObject> cityMarkerList = getCityMarkerListForHouse();
            return JsonResponse.ok(cityMarkerList);
        }
        if (request.getLevel().equals("district")) {
            List<JSONObject> districtMarkerList = getDistrictMarkerListForHouse(request.getCityId());
            return JsonResponse.ok(districtMarkerList);
        }
        if (request.getLevel().equals("post")) {
            List<JSONObject> postMarkerList = getHouseMarkerListForHouse(request.getDistrictId());
            return JsonResponse.ok(postMarkerList);
        }
        return JsonResponse.ok("请求参数错误");
    }

    public List<JSONObject> getCityMarkerListForHouse(){
        List<City> cityList = cityRepository.findByIsPublicTrue();
        List<JSONObject> collect = cityList.stream().map(city -> {
            Integer count = houseRepository.countByCity_IdAndIsPublicTrueAndIsDeleteFalse(city.getId());
            if (count == 0) {
                return null;
            }
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id", city.getId());
            jsonObject.put("name",city.getName());
            jsonObject.put("level","city");
            House houseFirst = houseRepository.findFirstByCity_IdAndIsPublicTrueAndIsDeleteFalse(city.getId());
            if (houseFirst.getLatitude()==null || houseFirst.getLongitude()==null) {
                return null;
            }
            jsonObject.put("latitude",houseFirst.getLatitude());
            jsonObject.put("longitude",houseFirst.getLongitude());
            return jsonObject;
        }).collect(Collectors.toList());
        List<JSONObject> res = collect.stream().filter(Objects::nonNull).collect(Collectors.toList());
        return res;
    }

    public List<JSONObject> getDistrictMarkerListForHouse(Integer cityId){
        if (cityId==null){
            cityId = cityRepository.findByIsPublicTrue().get(0).getId();
        }
        List<DistrictEntity> districtEntityList = districtRepository.findByCityIdAndIsPublicTrue(cityId);
        List<JSONObject> collect = districtEntityList.stream().map(districtEntity -> {
            Integer count = houseRepository.countByDistrict_IdAndIsPublicTrueAndIsDeleteFalse(districtEntity.getId());
            if (count == 0) {
                return null;
            }
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id", districtEntity.getId());
            jsonObject.put("name", districtEntity.getName());
            jsonObject.put("level", "district");
            House houseFirst = houseRepository.findFirstByDistrict_IdAndIsPublicTrueAndIsDeleteFalse(districtEntity.getId());
            if (houseFirst.getLatitude() == null || houseFirst.getLongitude() == null) {
                return null;
            }
            jsonObject.put("latitude", houseFirst.getLatitude());
            jsonObject.put("longitude", houseFirst.getLongitude());
            return jsonObject;
        }).collect(Collectors.toList());
        List<JSONObject> res = collect.stream().filter(Objects::nonNull).collect(Collectors.toList());
        return res;
    }

    public List<JSONObject> getHouseMarkerListForHouse(Integer districtId){
        if (districtId==null){
            districtId=districtRepository.findByCityIdAndIsPublicTrue(cityRepository.findByIsPublicTrue().get(0).getId()).get(0).getId();
        }
        HouseSearchRequest houseSearchRequest = new HouseSearchRequest();
        houseSearchRequest.setDistrictId(String.valueOf(districtId));
        houseSearchRequest.setPage(1);
        houseSearchRequest.setPerPage(100);
        Page<House> listing = houseService.getListing(houseSearchRequest);
        List<JSONObject> collect = listing.getContent().stream().map(house -> {
            if (house.getLatitude() == null || house.getLongitude() == null) {
                return null;
            }
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id", house.getId());
            jsonObject.put("name", house.getTitle());
            jsonObject.put("sub_name", house.getPriceLabel() + ":" + house.getPriceValue() + " " + house.getPriceUnit());
            jsonObject.put("level", "house");
            jsonObject.put("latitude", house.getLatitude());
            jsonObject.put("longitude", house.getLongitude());
            return jsonObject;
        }).collect(Collectors.toList());
        List<JSONObject> res = collect.stream().filter(Objects::nonNull).collect(Collectors.toList());
        return res;
    }

}
