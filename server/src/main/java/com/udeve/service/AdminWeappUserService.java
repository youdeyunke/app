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
import com.alibaba.excel.EasyExcel;
import com.alibaba.fastjson.JSONObject;
import com.udeve.entity.BrokerProfile;
import com.udeve.entity.User;
import com.udeve.repository.UserRepository;
import com.udeve.request.CommonRequest;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.*;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AdminWeappUserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    BrokerProfileService brokerProfileService;

    @Autowired
    AdminLogService adminLogService;

    public Page<User> getWeappUserListing(CommonRequest query){
        Specification<User> specification = (Root<User> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(criteriaBuilder.greaterThan(root.get("id"), 0));

            if (ObjectUtil.isNotEmpty(query.getScope())){
                switch (query.getScope()){
                    case "all":
                        // 全部
                        break;
                    case "online":
                        // 在线
                        predicates.add(criteriaBuilder.equal(root.get("isOnline"), true));
                        break;
                    case "blacklist":
                        // 拉黑
                        predicates.add(criteriaBuilder.equal(root.get("ban"), true));
                        break;
                }
            }

            if(ObjectUtil.isNotEmpty(query.getKw())){
                predicates.add(
                        criteriaBuilder.or(
                                criteriaBuilder.like(root.get("name"), "%" + query.getKw() + "%"),
                                criteriaBuilder.like(root.get("mobile"), "%" + query.getKw() + "%"),
                                criteriaBuilder.like(root.get("ip"), "%" + query.getKw() + "%"),
                                criteriaBuilder.like(root.get("ipRegion"), "%" + query.getKw() + "%"),
                                criteriaBuilder.like(root.get("remark"), "%" + query.getKw() + "%")
                                )
                );
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };

        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(query.getPage()-1,query.getPerPage(), sort);

        return userRepository.findAll(specification, pageable);

    }

    public JsonResponse getWeappUserList(CommonRequest query){
        Page<User> weappUserListing = getWeappUserListing(query);
        List<AdminWeappUserListVo> list = weappUserListing.getContent().stream().map(userProfile -> {
            return modelMapper.map(userProfile, AdminWeappUserListVo.class);
        }).collect(Collectors.toList());

        PageableInfoVo page = new PageableInfoVo(weappUserListing.getPageable(),  weappUserListing.getTotalPages(), weappUserListing.getTotalElements());
        JSONObject data = new JSONObject();

        data.put("result", list);
        data.put("page", page);

        return JsonResponse.ok(data);
    }

    public JsonResponse banUser(Integer id){
        User user = userRepository.findById(id).orElse(null);
        if (user == null){
            return JsonResponse.error("用户不存在");
        }
        user.setBan(!user.getBan());
        userRepository.saveAndFlush(user);
        String msg = user.getBan() ? "拉黑成功" : "取消拉黑成功";
        return JsonResponse.ok(msg);
    }

    public JsonResponse getWeappUserDetail(Integer userId){
        BrokerProfile byUserId = brokerProfileService.isBrokerOrNo(userId);
        if (byUserId == null) {//普通用户
            User user = userRepository.findById(userId).orElse(null);
            if (user == null){
                return JsonResponse.error("用户不存在");
            }
            WeappUserDetailVo map = modelMapper.map(user, WeappUserDetailVo.class);
            return JsonResponse.ok(map);
        }
        //置业顾问
        WeappUserDetailVo map = modelMapper.map(byUserId, WeappUserDetailVo.class);
        return JsonResponse.ok(map);
    }

    public JsonResponse updateWeappUserRemark(Integer id,String remark){
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            return JsonResponse.error("用户不存在");
        }
        User user = userOptional.get();
        user.setRemark(remark);
        userRepository.saveAndFlush(user);
        return JsonResponse.ok("备注添加成功");
    }

    //导出客户账号列表
    public void exportUserProfile(Map userMap, CommonRequest commonRequest, HttpServletResponse response){
        commonRequest.setPerPage(99999);
        Page<User> weappUserListing = getWeappUserListing(commonRequest);
        List<UserProfileExcelVo> collect = weappUserListing.getContent().stream().map(user -> {
            UserProfileExcelVo map = modelMapper.map(user, UserProfileExcelVo.class);
            return map;
        }).collect(Collectors.toList());

        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setCharacterEncoding("utf-8");
        // 这里URLEncoder.encode可以防止中文乱码 当然和easyexcel没有关系
        String fileName = "userprofile";
        response.setHeader("Content-disposition", "attachment;filename*=utf-8''" + fileName + ".xlsx");

        try {
            adminLogService.createAdminLog((Integer) userMap.get("user_id"),"导出客户账号",userMap.get("user_name")+"导出了客户账号列表");
            EasyExcel.write(response.getOutputStream(), UserProfileExcelVo.class).sheet("客户账号").doWrite(collect);
        } catch (IOException e) {
            throw new RuntimeException("导出失败");
        }
    }

}
