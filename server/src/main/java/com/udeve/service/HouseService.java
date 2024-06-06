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
import com.udeve.repository.*;
import com.udeve.request.*;
import com.udeve.entity.*;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.HouseDetailVo;
import com.udeve.vo.HouseListingVo;
import com.udeve.vo.PageableInfoVo;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Slf4j
public class HouseService {
    @Autowired
    HouseRepository houseRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    MyconfigService myconfigService;
    @Autowired
    DistrictRepository districtRepository;
    @Autowired
    PermissionItemRepository permissionItemRepository;
    @Autowired
    CityRepository cityRepository;

    // 用户接口返回数据
    public JsonResponse getListingForApi(HouseSearchRequest queryDto){
        Page<House> pageResult = getListing(queryDto);
        List<HouseListingVo> result = pageResult.getContent().stream().map(houseEntity ->{
            HouseListingVo map = modelMapper.map(houseEntity, HouseListingVo.class);
            if(map.getCover()==null || ("").equals(map.getCover())){
                //TODO 改为素材图
                map.setCover(map.getImageList().size()==0?"https://qiniucdn.udeve.cn/udyk/659e5134e4b04bdf00a71575.png":map.getImageList().get(0));
            }
            return map;
        }).collect(Collectors.toList());
        PageableInfoVo page = new PageableInfoVo(pageResult.getPageable(),  pageResult.getTotalPages(), pageResult.getTotalElements());
        log.info("total pages --------" + pageResult.getTotalPages());
        log.info("total items " + pageResult.getTotalElements());
        log.info("total sizze " +pageResult.getContent().size());
        JSONObject data = new JSONObject();
        data.put("result", result);
        data.put("page", page);
        return JsonResponse.success(data);
    }

    public JsonResponse getHouseListAdmin(HouseSearchRequest queryDto){
        Page<House> pageResult = getListing(queryDto);
        PermissionItem byComponentPath = permissionItemRepository.findByComponentPath("oldUpdate/index");
        PermissionItem permissionItem = permissionItemRepository.findById(byComponentPath.getFatherId()).get();
        String url = permissionItem.getPath() + "/" + byComponentPath.getPath();
        url = url.replace(":id", "");
        String finalUrl = url;
        List<HouseListingVo> result = pageResult.getContent().stream().map(houseEntity ->{
            HouseListingVo map = modelMapper.map(houseEntity, HouseListingVo.class);
            map.setUrl(finalUrl+houseEntity.getId());
            if(map.getCover()==null || ("").equals(map.getCover())){
                //TODO 改为素材图
                map.setCover(map.getImageList().size()==0?"https://qiniucdn.udeve.cn/udyk/659e5134e4b04bdf00a71575.png":map.getImageList().get(0));
            }
            return map;
        }).collect(Collectors.toList());
        PageableInfoVo page = new PageableInfoVo(pageResult.getPageable(),  pageResult.getTotalPages(), pageResult.getTotalElements());
        JSONObject data = new JSONObject();
        data.put("result", result);
        data.put("page", page);
        return JsonResponse.success(data);
    }

    public Page<House> getListing(HouseSearchRequest queryDto){
        // 根据参数进行动态查询
        log.info("house service dto {}", queryDto.toString());
        Specification<House> specification = (Specification<House>)(Root<House> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            //增加一个id大于0的默认条件
            predicates.add(criteriaBuilder.greaterThan(root.get("id"), 0));
            // 删除的房源不要展示
            predicates.add(criteriaBuilder.notEqual(root.get("isDelete"), true));
            switch (queryDto.getScope()){
                case "all":
                    // 全部（不区分是否上架的)
                    break;
                case "public":
                    // 已上架的
                    predicates.add(criteriaBuilder.equal(root.get("publishStatus"), "已发布"));
                    break;
                case "unpublic":
                    // 未上架的
                    predicates.add(criteriaBuilder.notEqual(root.get("publishStatus"), "已发布"));
                    break;
            }

            if (queryDto.getCityId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("city"), queryDto.getCityId()));
            }

            if (queryDto.getBusiness() != null) {
                predicates.add(root.get("business").in(queryDto.getBusiness()));
            }

            if (queryDto.getIds() != null) {
                predicates.add(root.get("id").in(queryDto.getIds()));
            }

            if (queryDto.getDistrictId() != null) {
                predicates.add(root.get("district").get("id").in(queryDto.getDistrictId()));
            }

            if (queryDto.getFitment() != null) {
                predicates.add(root.get("fitment").in(queryDto.getFitment()));
            }

            if (queryDto.getPosition() != null) {
                predicates.add(root.get("position").in(queryDto.getPosition()));
            }

            if (queryDto.getCategory() != null) {
                predicates.add(root.get("category").in(queryDto.getCategory()));
            }

            if (queryDto.getKw() != null) {
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(root.get("subDistrictName"), "%" + queryDto.getKw() + "%"),
                        criteriaBuilder.like(root.get("title"), "%" + queryDto.getKw() + "%"),
                        criteriaBuilder.like(root.get("address"), "%" + queryDto.getKw() + "%")));
            }

            if(queryDto.getPublishStatus()!=null && !("").equals(queryDto.getPublishStatus())){
                predicates.add(criteriaBuilder.equal(root.get("publishStatus"),queryDto.getPublishStatus()));
            }


            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };

        List<Order> orders = new ArrayList<>();
        if(queryDto.getOrder() != null){
            String[] split = queryDto.getOrder().split(" ");
            if(("id").equals(split[0])){
                if(("desc").equals(split[1])){
                    orders.add(new Order(Sort.Direction.DESC,"id"));
                }else{
                    orders.add(new Order(Sort.Direction.ASC,"id"));
                }
            }
        }
        Pageable pageable = PageRequest.of(queryDto.getPage(),queryDto.getPageSize(), Sort.by(orders));
        Page<House> pageResult =  houseRepository.findAll(specification, pageable);
        return pageResult;
    }

    public JsonResponse getHouseDetail(Integer id) {
        House house = houseRepository.findById(id).get();
        HouseDetailVo data = modelMapper.map(house, HouseDetailVo.class);
        return JsonResponse.ok(data);
    }

    public JsonResponse getHouseFilters(String business) {
        // TODO 返回小程序端用于筛选的数据
        JSONObject data = new JSONObject();
        data.put("category", myconfigService.getEnumList("house_category"));
        data.put("fitment", myconfigService.getEnumList("house_fitment"));
        data.put("position", myconfigService.getEnumList("house_position"));
        return JsonResponse.ok(data);
    }

    public JsonResponse create(CreateHouseRequest dto) {
        log.info(" ======================================== 发布房源 ========================================");
        log.info(dto.toString());

        // 根据行政区设置城市信息
        DistrictEntity dist = districtRepository.findById(dto.getDistrictId()).get();
        City city = dist.getCity();

        // 入库
        House house = modelMapper.map(dto, House.class);
        house.setCity(city);
        house.setDistrict(dist);
        house.setSubDistrictName(dto.getSubDistrictName());
        house.setCreatedAt(LocalDateTime.now());
        house.setUpdatedAt(LocalDateTime.now());
        house.setPublishStatus("审核中");
        house.setIsPublic(false);
        house.setIsDelete(false);
        house.setIsTop(false);
        house.setViewNums(0);
        house.setFavNums(0);
        houseRepository.saveAndFlush(house);
        log.info("发布房源成功，id:{}", house.getId());
        return JsonResponse.ok(house);
    }
}
