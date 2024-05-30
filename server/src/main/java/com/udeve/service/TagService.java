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
import com.udeve.request.AdminTagCreateRequest;
import com.udeve.vo.AdminTagListVo;
import com.udeve.request.AdminTagUpdateRequest;
import com.udeve.request.CommonRequest;
import com.udeve.vo.PageableInfoVo;
import com.udeve.entity.TagEntity;
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
import com.udeve.repository.TagsEntityRepository;

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
public class TagService {

    @Autowired
    private TagsEntityRepository tagsEntityRepository;

    @Autowired
    ModelMapper modelMapper;

    public Page<TagEntity> getListing(CommonRequest queryDto){
        Specification<TagEntity> specification = (Specification<TagEntity>)(Root<TagEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            //增加一个id大于0的默认条件
            predicates.add(criteriaBuilder.greaterThan(root.get("id"), 0));
            if(queryDto.getKw() != null){
                predicates.add(criteriaBuilder.like(root.get("name"), "%" + queryDto.getKw() + "%"));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };

        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        log.info(queryDto.toString());
        //getpage需要减一
        Pageable pageable = PageRequest.of(queryDto.getPage()-1,queryDto.getPerPage(), sort);
        Page<TagEntity> pageResult = tagsEntityRepository.findAll(specification, pageable);

        return pageResult;
    }

    public JsonResponse getTagList(CommonRequest queryDto){

        Page<TagEntity> pageResult = getListing(queryDto);
        List<AdminTagListVo> result = pageResult.getContent().stream().map(tagEntity -> modelMapper.map(tagEntity, AdminTagListVo.class)).collect(Collectors.toList());
        PageableInfoVo page = new PageableInfoVo(pageResult.getPageable(),  pageResult.getTotalPages(), pageResult.getTotalElements());
        JSONObject data = new JSONObject();
        data.put("result", result);
        data.put("page", page);
        data.put("total_count",pageResult.getTotalElements());

        return JsonResponse.ok(data);
    }

    public JsonResponse getTagDetail(Integer id){
        TagEntity tagEntity = tagsEntityRepository.findById(id).get();
        AdminTagListVo adminTagListVo = modelMapper.map(tagEntity, AdminTagListVo.class);
        return JsonResponse.ok(adminTagListVo);
    }

    public JsonResponse updateTag(Integer id, AdminTagUpdateRequest adminTagUpdate){

        TagEntity tag = tagsEntityRepository.findById(id).get();
        modelMapper.map(adminTagUpdate,tag);
        LocalDateTime time = LocalDateTime.now();
        tag.setUpdatedAt(time);

        tagsEntityRepository.saveAndFlush(tag);

        return JsonResponse.ok("保存成功");
    }

    public JsonResponse createTag(AdminTagCreateRequest adminTagUpdate){
        TagEntity tag = new TagEntity();
        LocalDateTime time = LocalDateTime.now();
        tag.setCreatedAt(time);
        tag.setUpdatedAt(time);
        modelMapper.map(adminTagUpdate, tag);

        tagsEntityRepository.saveAndFlush(tag);

        return JsonResponse.ok("新建成功");
    }

    public JsonResponse deleteTag(Integer id){

        tagsEntityRepository.deleteById(id);
        return JsonResponse.ok("删除成功");
    }
}
