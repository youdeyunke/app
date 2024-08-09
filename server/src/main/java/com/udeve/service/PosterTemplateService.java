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

import com.udeve.entity.PosterTemplate;
import com.udeve.repository.PosterTemplateRepository;
import com.udeve.request.AdminPosterTemplateCreateRequest;
import com.udeve.request.AdminPosterTemplateUpdateRequest;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminPosterTemplateListVo;
import com.udeve.vo.WeappPosterTemplateVo;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PosterTemplateService {

    @Autowired
    private PosterTemplateRepository posterTemplateRepository;
    @Autowired
    ModelMapper modelMapper;

    public JsonResponse getPosterTemplateList(){
        Sort sort = Sort.by(Sort.Direction.ASC, "number");
        List<PosterTemplate> all = posterTemplateRepository.findAll(sort);
        List<AdminPosterTemplateListVo> list = all.stream().map(posterTemplate -> {
            AdminPosterTemplateListVo map = modelMapper.map(posterTemplate, AdminPosterTemplateListVo.class);
            return map;
        }).collect(Collectors.toList());
        return JsonResponse.ok(list);
    }

    public JsonResponse createPosterTemplate(AdminPosterTemplateCreateRequest createRequest) {
        PosterTemplate posterTemplate = modelMapper.map(createRequest, PosterTemplate.class);
        posterTemplate.setCreatedAt(LocalDateTime.now());
        posterTemplate.setUpdatedAt(LocalDateTime.now());
        posterTemplateRepository.saveAndFlush(posterTemplate);
        if (posterTemplate.getIsDefault()){
            posterTemplateRepository.updateDefaultById(posterTemplate.getId());
        }
        return JsonResponse.ok("创建成功");
    }

    public JsonResponse updatePosterTemplate(Integer id,AdminPosterTemplateUpdateRequest updateRequest) {
        PosterTemplate posterTemplate = posterTemplateRepository.findById(id).orElse(null);
        if (posterTemplate == null){
            return JsonResponse.error("数据不存在");
        }
        modelMapper.map(updateRequest, posterTemplate);
        posterTemplate.setUpdatedAt(LocalDateTime.now());
        posterTemplateRepository.saveAndFlush(posterTemplate);
        if (posterTemplate.getIsDefault()){
            posterTemplateRepository.updateDefaultById(posterTemplate.getId());
        }
        return JsonResponse.ok("更新成功");
    }

    public JsonResponse deletePosterTemplate(Integer id) {
        posterTemplateRepository.deleteById(id);
        return JsonResponse.ok("删除成功");
    }

    public JsonResponse updateOrder(List<Integer> ids){
        for (int i = 0; i < ids.size(); i++) {
            PosterTemplate posterTemplate = posterTemplateRepository.findById(ids.get(i)).orElse(null);
            if (posterTemplate == null){
                return JsonResponse.error("数据不存在");
            }
            posterTemplate.setNumber(i);
            posterTemplateRepository.saveAndFlush(posterTemplate);
        }
        return JsonResponse.ok("更新成功");
    }

    public JsonResponse weappGetPosterTemplateList(){
        Sort sort = Sort.by(Sort.Direction.ASC, "number");
        List<PosterTemplate> all = posterTemplateRepository.findAll(sort);
        List<WeappPosterTemplateVo> list = all.stream().map(posterTemplate -> {
            WeappPosterTemplateVo map = modelMapper.map(posterTemplate, WeappPosterTemplateVo.class);
            return map;
        }).collect(Collectors.toList());
        return JsonResponse.ok(list);
    }

}
