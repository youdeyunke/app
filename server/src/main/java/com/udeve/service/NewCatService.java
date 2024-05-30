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

import com.udeve.entity.New;
import com.udeve.vo.AdminNewCatListVo;
import com.udeve.entity.NewCat;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.WeappNewCatVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.udeve.repository.NewCatRepository;
import com.udeve.repository.NewRepository;
import org.modelmapper.ModelMapper;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Slf4j
public class NewCatService {

    @Autowired
    private NewCatRepository newCatRepository;
    @Autowired
    private NewRepository newRepository;
    @Autowired
    ModelMapper modelMapper;

    public JsonResponse getNewsCatList(){
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        List<NewCat> catList = newCatRepository.findAll(sort);
        List<AdminNewCatListVo> list = catList.stream().map(newCat -> {
            AdminNewCatListVo vo = modelMapper.map(newCat, AdminNewCatListVo.class);
            return vo;
        }).collect(Collectors.toList());
        return JsonResponse.ok(list);
    }

    public JsonResponse deleteNewCat(Integer id){
        Integer count = newRepository.countByNewsCatId(id);
        if (count == 0){
            newCatRepository.deleteById(id);
            return JsonResponse.ok("删除成功");
        }else {
            return JsonResponse.error("该标签有文章使用，无法删除");
        }
    }

    public JsonResponse getWeappNewCatList(){
        List<NewCat> newCatList = newCatRepository.findByIsPublicTrue();
        List<WeappNewCatVo> collect = newCatList.stream().map(newCat -> {
            Integer newCatId = newCat.getId();
            List<New> newsByCatIdList = newRepository.findByNewsCatIdAndIsPublicTrue(newCatId);
            if (newsByCatIdList.isEmpty()) {
                return null;
            }
            WeappNewCatVo map = modelMapper.map(newCat, WeappNewCatVo.class);
            return map;
        }).collect(Collectors.toList());
        List<WeappNewCatVo> weappNewCatVos = collect.stream().filter(Objects::nonNull).collect(Collectors.toList());
        return JsonResponse.ok(weappNewCatVos);
    }

}
