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

import com.udeve.entity.SysConfig;
import com.udeve.repository.SysConfigRepository;
import com.udeve.request.AdminSysConfigCreateRequest;
import com.udeve.request.AdminSysConfigUpdateRequest;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminSysConfigListVo;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class SysConfigService {

    @Autowired
    private SysConfigRepository sysConfigRepository;
    @Autowired
    ModelMapper modelMapper;

    public JsonResponse getSysCofnigList(){
        List<SysConfig> all = sysConfigRepository.findAll();
        List<AdminSysConfigListVo> list = all.stream().map(sysConfig -> {
            AdminSysConfigListVo vo = modelMapper.map(sysConfig, AdminSysConfigListVo.class);
            return vo;
        }).collect(Collectors.toList());
        return JsonResponse.ok(list);
    }

    public JsonResponse updateSysConfig(Integer id, AdminSysConfigUpdateRequest updateRequest){
        SysConfig sysConfig = sysConfigRepository.findById(id).get();
        modelMapper.map(updateRequest, sysConfig);
        sysConfig.setKey(updateRequest.getKey().toUpperCase());
        sysConfig.setUpdatedAt(LocalDateTime.now());
        sysConfigRepository.save(sysConfig);
        return JsonResponse.ok("更新成功");
    }

    public JsonResponse createSysConfig(AdminSysConfigCreateRequest createRequest){
        SysConfig sysConfig = modelMapper.map(createRequest, SysConfig.class);
        sysConfig.setCreatedAt(LocalDateTime.now());
        sysConfig.setUpdatedAt(LocalDateTime.now());
        sysConfig.setKey(createRequest.getKey().toUpperCase());
        sysConfigRepository.save(sysConfig);
        return JsonResponse.ok("创建成功");
    }

    public JsonResponse deleteSysConfig(Integer id){
        sysConfigRepository.deleteById(id);
        return JsonResponse.ok("删除成功");
    }

}
