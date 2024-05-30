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

import com.udeve.vo.AdminSaleStatusItemListVo;
import com.udeve.entity.SaleStatusItem;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.udeve.repository.SaleStatusItemRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class SaleStatusItemService {

    @Autowired
    private SaleStatusItemRepository saleStatusItemRepository;
    @Autowired
    ModelMapper modelMapper;

    public JsonResponse getSaleStatusItemList(String moduleKey) {
        List<SaleStatusItem> byModuleKey = saleStatusItemRepository.findByModuleKey(moduleKey);
        List<AdminSaleStatusItemListVo> list = byModuleKey.stream().map(saleStatusItem -> {
            AdminSaleStatusItemListVo map = modelMapper.map(saleStatusItem, AdminSaleStatusItemListVo.class);
            return map;
        }).collect(Collectors.toList());
        return JsonResponse.ok(list);
    }

}
