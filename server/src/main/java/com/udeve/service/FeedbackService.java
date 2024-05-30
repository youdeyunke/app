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
import com.udeve.entity.Feedback;
import com.udeve.repository.FeedbackRepository;
import com.udeve.request.AdminFeedbackQueryRequest;
import com.udeve.request.FeedbackCreateRequest;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.FeedbackListVo;
import com.udeve.vo.PageableInfoVo;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import javax.persistence.criteria.Predicate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class FeedbackService {

    @Autowired
    FeedbackRepository feedbackRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    AdminLogService adminLogService;

    public Page<Feedback> getListing(AdminFeedbackQueryRequest queryRequest){
        Specification<Feedback> specification = (root,query,criteriaBuilder)->{
            List<Predicate> predicates = new ArrayList<>();
            //默认条件
            predicates.add(criteriaBuilder.greaterThan(root.get("id"),0));
            predicates.add(criteriaBuilder.equal(root.get("isDelete"),false));//查询没有被删除的

            if (queryRequest.getKw() != null && !queryRequest.getKw().isEmpty()) {
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(root.get("feedbackType"), "%" + queryRequest.getKw() + "%"),
                        criteriaBuilder.like(root.get("content"), "%" + queryRequest.getKw() + "%"),
                        criteriaBuilder.like(root.get("contact"), "%" + queryRequest.getKw() + "%")));
            }

            if (queryRequest.getCreatedAt()!=null){
                predicates.add(criteriaBuilder.equal(root.get("createdAt"),queryRequest.getCreatedAt()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));

        };

        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(queryRequest.getPage()-1, queryRequest.getPerPage(), sort);
        return feedbackRepository.findAll(specification, pageable);
    }

    public JsonResponse getFeedbackList(AdminFeedbackQueryRequest queryRequest){
        Page<Feedback> listing = getListing(queryRequest);
        PageableInfoVo page = new PageableInfoVo(listing.getPageable(),listing.getTotalPages(),listing.getTotalElements());
        List<FeedbackListVo> collect = listing.getContent().stream().map(feedback -> {
            FeedbackListVo map = modelMapper.map(feedback, FeedbackListVo.class);
            return map;
        }).collect(Collectors.toList());
        JSONObject jsonObject = new JSONObject();

        jsonObject.put("page",page);
        jsonObject.put("result",collect);
        return JsonResponse.ok(jsonObject);
    }


    public JsonResponse deleteFeedbackById(Integer adminUserId,Integer id){
        Optional<Feedback> feedbackOptional = feedbackRepository.findById(id);
        boolean present = feedbackOptional.isPresent();
        if(!present){
            return JsonResponse.error("数据不存在！");
        }
        Feedback feedback = feedbackOptional.get();
        if (feedback.getIsDelete()) {
            return JsonResponse.ok("已被删除");
        }
        feedback.setIsDelete(true);
        feedback.setUpdatedAt(LocalDateTime.now());
        adminLogService.createAdminLog(adminUserId,"用户反馈管理","删除反馈："+feedback.getFeedbackType()+"--"+feedback.getContent());
        feedbackRepository.saveAndFlush(feedback);
        return JsonResponse.ok("删除成功！");
    }

    //小程序
    public JsonResponse weappCreateFeedbackInfo(FeedbackCreateRequest createRequest){
        Feedback feedback = modelMapper.map(createRequest, Feedback.class);
        feedback.setCreatedAt(LocalDateTime.now());
        feedback.setUpdatedAt(LocalDateTime.now());
        feedbackRepository.saveAndFlush(feedback);
        return JsonResponse.ok("提交成功");
    }
}
