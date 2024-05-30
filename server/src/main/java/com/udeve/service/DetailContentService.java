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

import com.udeve.request.AdminDetailContentUpdateRequest;
import com.udeve.vo.AdminDetailContentVo;
import com.udeve.entity.DetailContent;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.udeve.repository.DetailContentRepository;

import java.time.LocalDateTime;

@Service
@Slf4j
public class DetailContentService {

    @Autowired
    DetailContentRepository detailContentRepository;
    @Autowired
    ModelMapper modelMapper;

    public JsonResponse getDetailContent(Integer Id) {
        DetailContent detailContent = detailContentRepository.findById(Id).get();
        AdminDetailContentVo map = modelMapper.map(detailContent, AdminDetailContentVo.class);
        return JsonResponse.ok(map);
    }

    public JsonResponse updateDetailContent(Integer id, AdminDetailContentUpdateRequest detailContent) {
        DetailContent map = detailContentRepository.findById(id).get();
        modelMapper.map(detailContent, map);
        map.setUpdatedAt(LocalDateTime.now());
        detailContentRepository.saveAndFlush(map);
        return JsonResponse.ok("更新成功");
    }

}
