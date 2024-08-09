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

import com.udeve.vo.AdminMetaContentDetailVo;
import com.udeve.request.AdminMetaContentUpdateRequest;
import com.udeve.entity.MetaContent;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.udeve.repository.MetaContentRepository;

import java.time.LocalDateTime;

@Service
@Slf4j
public class MetaContentService {

    @Autowired
    MetaContentRepository metaContentRepository;
    @Autowired
    ModelMapper modelMapper;

    public JsonResponse getMetaContent(Integer Id) {
        MetaContent metaContent = metaContentRepository.findById(Id).orElse(null);
        if (metaContent == null) {
            return JsonResponse.error("数据不存在");
        }
        AdminMetaContentDetailVo map = modelMapper.map(metaContent, AdminMetaContentDetailVo.class);
        return JsonResponse.ok(map);
    }

    public JsonResponse updateMetaContent(Integer id, AdminMetaContentUpdateRequest metaContent) {
        MetaContent map = metaContentRepository.findById(id).orElse(null);
        if (map == null) {
            return JsonResponse.error("数据不存在");
        }
        modelMapper.map(metaContent, map);
        map.setUpdatedAt(LocalDateTime.now());
        metaContentRepository.saveAndFlush(map);
        return JsonResponse.ok("更新成功");
    }

}
