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
import com.udeve.request.BrokerQueryRequest;
import com.udeve.entity.BrokerProfile;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import com.udeve.repository.BrokerProfileRepository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
public class BrokerService {
    @Autowired
    BrokerProfileRepository brokerProfileRepository;

    public Page<BrokerProfile> getListing(BrokerQueryRequest queryDto) {
        // 根据参数进行动态查询
        log.info("house service dto {}", queryDto.toString());
        log.info("aaaaaaaaaa");
        Specification<BrokerProfile> specification = (Specification<BrokerProfile>) (Root<BrokerProfile> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            log.info("bbbbbbbbbbb");
            // 增加一个默认的id >0的查询条件，防止predicates为空
            predicates.add(criteriaBuilder.greaterThan(root.get("id"), 0));

            if (queryDto.getIdList() != null) {
                predicates.add(root.get("id").in(queryDto.getIdList()));
            }
            log.info("cccccc");

            if (queryDto.getStatus() != null) {
                predicates.add(root.get("status").in(queryDto.getStatusList()));
            }
            log.info("dddddd");
            log.info("d11111");
            if (queryDto.getPostIdList() != null) {
                predicates.add(root.get("postId").in(queryDto.getPostIdList()));
            }

            log.info("eeeee");
            if (queryDto.getKw() != null) {
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(root.get("name"), "%" + queryDto.getKw() + "%"),
                        criteriaBuilder.like(root.get("mobile"), "%" + queryDto.getKw() + "%"),
                        //criteriaBuilder.like(root.get("xiaoqu"), "%" + queryDto.getKw() + "%"),
                        criteriaBuilder.like(root.get("postTitle"), "%" + queryDto.getKw() + "%")));
            }

            log.info("ffff");
            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };

        log.info("gggg");
        Sort sort = Sort.by(queryDto.getOrderDirection(), queryDto.getOrderField());
        log.info("hhhhhh");
        Pageable pageable = PageRequest.of(queryDto.getPage(), queryDto.getPageSize(), sort);
        log.info("iiiii");
        Page<BrokerProfile> pageResult = brokerProfileRepository.findAll(specification, pageable);
        log.info("jjjj");
        return pageResult;

    }

    public JSONObject getStatus(String mobile) {
        Integer joinStatus = 0;
        JSONObject resp = new JSONObject();
        if (mobile == null) {
            resp.put("join_status", joinStatus);
            resp.put("info", "未入驻");
            resp.put("msg", "mobile为空");
            return resp;
        }

        BrokerProfile broker = brokerProfileRepository.findByMobile(mobile);
        if (broker == null) {
            resp.put("join_status", joinStatus);
            resp.put("info", "未入驻");
            resp.put("msg", "未查询到信息");
            return resp;
        }

        resp.put("join_status", broker.status);
        resp.put("info", broker.rejectReason);
        return resp;
    }


    private Integer getBrokerId(String mobile) {
        BrokerProfile broker = brokerProfileRepository.findByMobile(mobile);
        if (broker == null) {
            return null;
        }
        return broker.id;
    }

    public Map<String, Object> applyJoin(String mobile, String name, Integer sex, Integer postId) {
        Map<String, Object> result = new HashMap<>();

        // 检查手机号
        if (mobile == null || mobile.length() != 11) {
            result.put("ok", false);
            result.put("message", "手机号格式错误");
            return result;
        }
        BrokerProfile oldItem = brokerProfileRepository.findByMobile(mobile);
        if (oldItem != null) {
            result.put("ok", false);
            result.put("message", "手机号已被占用");
            return result;
        }

        // TODO 检查postid是否存在
        if (postId == null) {
            result.put("ok", false);
            result.put("message", "请选择所属项目");
            return result;
        }

        // 检查通过
        BrokerProfile broker = new BrokerProfile();
        broker.sex = sex;
        broker.mobile = mobile;
        broker.name = name;
        broker.setPostId(postId);
        broker.setStatus(0);
        broker.setUpdatedAt(LocalDateTime.now());
        broker.setCreatedAt(LocalDateTime.now());
        broker.setStatus(1);
        brokerProfileRepository.saveAndFlush(broker);
        result.put("ok", true);
        result.put("message", "success");
        result.put("id", broker.id);
        return result;
    }

}