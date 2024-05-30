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
import com.udeve.request.WeappNeedCreateRequest;
import com.udeve.vo.AdminNeedListVo;
import com.udeve.request.CommonRequest;
import com.udeve.vo.PageableInfoVo;
import com.udeve.entity.Need;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import com.udeve.repository.NeedRepository;

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
public class NeedService {

    @Autowired
    private NeedRepository needRepository;
    @Autowired
    ModelMapper modelMapper;

    public Page<Need> getListing(CommonRequest query){
        Specification<Need> specification = (Specification<Need>)(Root<Need> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            //增加一个id大于0的默认条件
            predicates.add(criteriaBuilder.greaterThan(root.get("id"), 0));
            if (!ObjectUtil.equals(query.getKw(), null)) {
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(root.get("name"), "%" + query.getKw() + "%"),
                        criteriaBuilder.like(root.get("mobile"), "%" + query.getKw() + "%")
                ));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(query.getPage()-1,query.getPerPage(), sort);
        return needRepository.findAll(specification, pageable);
    }

    public JsonResponse getNeedList(CommonRequest query){
        Page<Need> needs = getListing(query);
        JSONObject data = new JSONObject();
        PageableInfoVo page = new PageableInfoVo(needs.getPageable(),  needs.getTotalPages(), needs.getTotalElements());

        List<AdminNeedListVo> list = needs.getContent().stream().map(need -> {
            AdminNeedListVo vo = modelMapper.map(need, AdminNeedListVo.class);
            return vo;
        }).collect(Collectors.toList());

        data.put("result", list);
        data.put("page", page);
        return JsonResponse.ok(data);
    }

    public JsonResponse weappSubmitNeed(WeappNeedCreateRequest request){
        Need map = modelMapper.map(request, Need.class);
        map.setCreatedAt(LocalDateTime.now());
        map.setUpdatedAt(LocalDateTime.now());
        needRepository.save(map);
        return JsonResponse.ok("提交成功");
    }
}
