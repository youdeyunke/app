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

import cn.hutool.core.util.ObjectUtil;
import com.alibaba.fastjson.JSONObject;
import com.udeve.entity.FirstScreenAdd;
import com.udeve.repository.FirstScreenAddRepository;
import com.udeve.request.AdminFirstScreenAddCreateRequest;
import com.udeve.request.AdminFirstScreenAddUpdateRequest;
import com.udeve.request.CommonRequest;
import com.udeve.request.WeappUpdateFirstScreenAddRequest;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminFirstScreenAddListVo;
import com.udeve.vo.PageableInfoVo;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class FirstScreenAddService {

    @Autowired
    private FirstScreenAddRepository firstScreenAddRepository;
    @Autowired
    ModelMapper modelMapper;

    public Page<FirstScreenAdd> getListing(CommonRequest query){

        Specification<FirstScreenAdd> specification = (Specification<FirstScreenAdd>)(Root<FirstScreenAdd> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            //增加一个id大于0的默认条件
            predicates.add(criteriaBuilder.greaterThan(root.get("id"), 0));
            if(!ObjectUtil.equals(query.getKw(), null)){
                predicates.add(criteriaBuilder.or(criteriaBuilder.like(root.get("name"), "%" + query.getKw() + "%")));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };

        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(query.getPage()-1,query.getPerPage(), sort);
        Page<FirstScreenAdd> all = firstScreenAddRepository.findAll(specification, pageable);
        return all;
    }

    public JsonResponse getFlashList(CommonRequest query){

        Page<FirstScreenAdd> all = getListing(query);
        List<AdminFirstScreenAddListVo> list = all.getContent().stream().map(firstScreenAdd -> {
            AdminFirstScreenAddListVo vo = modelMapper.map(firstScreenAdd, AdminFirstScreenAddListVo.class);
            return vo;
        }).collect(Collectors.toList());
        JSONObject data = new JSONObject();
        PageableInfoVo page = new PageableInfoVo(all.getPageable(),  all.getTotalPages(), all.getTotalElements());
        data.put("result", list);
        data.put("page", page);
        return JsonResponse.ok(data);
    }

    public JsonResponse createFlash(AdminFirstScreenAddCreateRequest createRequest){
        FirstScreenAdd firstScreenAdd = modelMapper.map(createRequest, FirstScreenAdd.class);
        firstScreenAdd.setCreatedAt(LocalDateTime.now());
        firstScreenAdd.setUpdatedAt(LocalDateTime.now());
        firstScreenAddRepository.save(firstScreenAdd);
        return JsonResponse.ok("添加成功");
    }

    public JsonResponse updateFlash(Integer id,AdminFirstScreenAddUpdateRequest createRequest){
        FirstScreenAdd firstScreenAdd = firstScreenAddRepository.findById(id).get();
        modelMapper.map(createRequest, firstScreenAdd);
        firstScreenAdd.setUpdatedAt(LocalDateTime.now());
        firstScreenAddRepository.save(firstScreenAdd);
        return JsonResponse.ok("修改成功");
    }

    public JsonResponse deleteFlash(Integer id){
        firstScreenAddRepository.deleteById(id);
        return JsonResponse.ok("删除成功");
    }

    public JsonResponse getWeappFirstScreen(){
        Optional<FirstScreenAdd> firstScreenAdd = firstScreenAddRepository.findFirstByPublicValueTrue();

        if (firstScreenAdd.isEmpty()){
            return JsonResponse.ok("暂无数据");
        } else {
            AdminFirstScreenAddListVo map = modelMapper.map(firstScreenAdd.get(), AdminFirstScreenAddListVo.class);
            return JsonResponse.ok(map);
        }
    }

    public JsonResponse weappUpdateFirstScreenAdd(Integer id, WeappUpdateFirstScreenAddRequest request){
        FirstScreenAdd firstScreenAdd = firstScreenAddRepository.findById(id).get();
        if (firstScreenAdd == null){
            return JsonResponse.ok("暂无数据");
        }
        if (request.getClickNums() != null){
            firstScreenAdd.setClickNums(firstScreenAdd.getClickNums() + request.getClickNums());
        }
        if (request.getSkipNums() != null){
            firstScreenAdd.setSkipNums(firstScreenAdd.getSkipNums() + request.getSkipNums());
        }
        if (request.getViewNums() != null){
            firstScreenAdd.setViewNums(firstScreenAdd.getViewNums() + request.getViewNums());
        }
        firstScreenAddRepository.save(firstScreenAdd);
        return JsonResponse.ok("修改成功");
    }

}
