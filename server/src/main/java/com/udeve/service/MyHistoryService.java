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
import com.udeve.entity.MyHistory;
import com.udeve.repository.MyHistoryRepository;
import com.udeve.repository.PostRepository;
import com.udeve.request.CommonRequest;
import com.udeve.request.HistoryCreateRequest;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Slf4j
public class MyHistoryService {

    @Autowired
    private MyHistoryRepository myHistoryRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    PostRepository postRepository;

    public JsonResponse createHistory(HistoryCreateRequest request){

        if (myHistoryRepository.existsByTargetTypeAndTargetIdAndUserId(request.getTargetType(), request.getTargetId(), request.getUserId())) {
            MyHistory myHistory = myHistoryRepository.findByTargetTypeAndTargetIdAndUserId(request.getTargetType(), request.getTargetId(), request.getUserId());
            myHistory.setUpdatedAt(LocalDateTime.now());
            myHistoryRepository.saveAndFlush(myHistory);
            return JsonResponse.ok("更新成功");
        }

        MyHistory map = modelMapper.map(request, MyHistory.class);
        map.setCreatedAt(LocalDateTime.now());
        map.setUpdatedAt(LocalDateTime.now());
        myHistoryRepository.saveAndFlush(map);

        return JsonResponse.ok("创建成功");
    }

    public JsonResponse getHistoryList(CommonRequest query, Integer userId){
        Sort sort = Sort.by(Sort.Direction.DESC, "updatedAt");
        Pageable pageable = PageRequest.of(query.getPage()-1,query.getPerPage(), sort);
        Page<MyHistory> histories = myHistoryRepository.findByTargetTypeAndUserId(query.getScope(), userId, pageable);
        List<MyHistory> collect = histories.getContent()
                .stream()
                .filter(myHistory -> postRepository.existsById(myHistory.getTargetId()))
                .collect(Collectors.toList());
        JSONObject result = new JSONObject();
        result.put("items", collect);
        result.put("total", collect.size());
        return JsonResponse.ok(result);
    }

}
