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

import com.udeve.vo.FitmentListVo;
import com.udeve.entity.Fitment;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.udeve.repository.FitmentRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class FitmentService {

    @Autowired
    private FitmentRepository fitmentRepository;
    @Autowired
    ModelMapper modelMapper;

    public JsonResponse getFitmentList() {
        List<Fitment> all = fitmentRepository.findAll();
        List<FitmentListVo> list = all.stream().map(fitment -> {
            FitmentListVo map = modelMapper.map(fitment, FitmentListVo.class);
            return map;
        }).collect(Collectors.toList());
        return JsonResponse.ok(list);
    }

}
