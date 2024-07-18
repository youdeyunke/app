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

import cn.binarywang.wx.miniapp.api.WxMaQrcodeService;
import cn.binarywang.wx.miniapp.api.WxMaService;
import cn.hutool.core.util.ObjectUtil;
import com.udeve.vo.FileInfo;
import com.alibaba.fastjson.JSONObject;
import com.udeve.entity.*;
import com.udeve.repository.*;
import com.udeve.request.*;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.*;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.common.error.WxErrorException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.io.File;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class BrokerProfileService {

    @Autowired
    private BrokerProfileRepository brokerProfileRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    AdminLogService adminLogService;
    @Autowired
    AdminUserRepository adminUserRepository;
    @Autowired
    UserService userService;
    @Autowired
    WxMaService wxMaService;
    @Autowired
    UploadService uploadService;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    SysMessageRepository sysMessageRepository;
    @Autowired
    SysMessageService sysMessageService;
    @Autowired
    UserRepository userRepository;

    public Page<BrokerProfile> getListing(BrokerQueryRequest queryDto) {
        // 根据参数进行动态查询
        Specification<BrokerProfile> specification = (Specification<BrokerProfile>) (Root<BrokerProfile> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            // 增加一个默认的id >0的查询条件，防止predicates为空
            predicates.add(criteriaBuilder.greaterThan(root.get("id"), 0));

            if (queryDto.getIdList() != null) {
                predicates.add(root.get("id").in(queryDto.getIdList()));
            }

            if (queryDto.getStatus() != null) {
                predicates.add(root.get("status").in(queryDto.getStatusList()));
            }
            if (queryDto.getPostIdList() != null) {
                predicates.add(root.get("postId").in(queryDto.getPostIdList()));
            }
            if (ObjectUtil.equals(queryDto.getScope(), "pending")) {
//                predicates.add(criteriaBuilder.equal(root.get("status"), BrokerProfile.STATUS_PENDING));
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.equal(root.get("status"), BrokerProfile.STATUS_PENDING),
                        criteriaBuilder.equal(root.get("status"), BrokerProfile.STATUS_DISABLE),
                        criteriaBuilder.equal(root.get("status"), BrokerProfile.STATUS_REFUSE)
                ));
            }
            if (ObjectUtil.equals(queryDto.getScope(), "validate_brokers")) {
                predicates.add(criteriaBuilder.equal(root.get("status"), BrokerProfile.STATUS_SUCCESS));
            }

            if (queryDto.getKw() != null) {
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(root.get("name"), "%" + queryDto.getKw() + "%"),
                        criteriaBuilder.like(root.get("mobile"), "%" + queryDto.getKw() + "%"),
                        criteriaBuilder.like(root.get("postTitle"), "%" + queryDto.getKw() + "%")));
            }

            if (ObjectUtil.isNotEmpty(queryDto.getLevel())){
                predicates.add(criteriaBuilder.equal(root.get("level"), queryDto.getLevel()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };

        Sort sort = Sort.by(queryDto.getOrderDirection(), queryDto.getOrderField());
        Pageable pageable = PageRequest.of(queryDto.getPage(), queryDto.getPageSize(), sort);
        Page<BrokerProfile> pageResult = brokerProfileRepository.findAll(specification, pageable);
        return pageResult;

    }


    public JsonResponse getBrokerOrderByIds(BrokerQueryRequest queryRequest){
        Pageable pageable = PageRequest.of(queryRequest.getPage(), queryRequest.getPageSize());
        Page<BrokerProfile> byOrderByIdList = brokerProfileRepository.findAllByOrderByIdList(queryRequest.getIdList(), pageable);
        List<BrokerProfileListingVo> collect = byOrderByIdList.getContent().stream().map(brokerProfile -> {
            return modelMapper.map(brokerProfile, BrokerProfileListingVo.class);
        }).collect(Collectors.toList());
        JSONObject res = new JSONObject();
        PageableInfoVo pageableInfoVo = new PageableInfoVo(pageable, byOrderByIdList.getTotalPages(), byOrderByIdList.getTotalElements());
        res.put("page",pageableInfoVo);
        res.put("result",collect);
        return JsonResponse.ok(res);

    }


    public JsonResponse getBrokerProfileList(BrokerQueryRequest query){
        Page<BrokerProfile> all = getListing(query);
        List<AdminBrokerProfileListVo> list = all.getContent().stream().map(brokerProfile -> {
            AdminBrokerProfileListVo map = modelMapper.map(brokerProfile, AdminBrokerProfileListVo.class);
            return map;
        }).collect(Collectors.toList());

        PageableInfoVo page = new PageableInfoVo(all.getPageable(),  all.getTotalPages(), all.getTotalElements());
        JSONObject data = new JSONObject();

        data.put("result", list);
        data.put("page", page);
        return JsonResponse.ok(data);
    }

    public JsonResponse getBrokerProfile(Integer id) {
        BrokerProfile brokerProfile = brokerProfileRepository.findById(id).get();
        AdminBrokerProfileDetailVo map = modelMapper.map(brokerProfile, AdminBrokerProfileDetailVo.class);
        return JsonResponse.ok(map);
    }

    @Transactional
    public JsonResponse updateBrokerProfile(Integer id, AdminBrokerProfileUpdateRequest updateRequest, Integer userId){
        BrokerProfile brokerProfile = brokerProfileRepository.findById(id).get();
        boolean flag = false;
        if (updateRequest.getStatus().equals(brokerProfile.getStatus())) {
            flag = true;
        }
        modelMapper.map(updateRequest, brokerProfile);
        brokerProfile.setPostTitle(postRepository.findById(updateRequest.getPostId()).get().getTitle());
        brokerProfile.setUpdatedAt(LocalDateTime.now());
        //如果要审核通过该置业顾问，则检查是否有二维码
        if(BrokerProfile.STATUS_SUCCESS == updateRequest.getStatus() || BrokerProfile.STATUS_SUCCESS.equals(updateRequest.getStatus())){
            if (brokerProfile.getQr()==null || ("").equals(brokerProfile.getQr())) {
                try {
                    genQr(brokerProfile);
                } catch (WxErrorException e) {
                    log.error("置业顾问生成二维码失败，置业顾问：{}",brokerProfile);
                    throw new RuntimeException(e);
                }
            }
            //发送系统消息
            sysMessageService.sendSysMessage("broker",
                    "入驻审核通过",
                    "您提交的置业顾问入驻申请已经由管理员审核通过了。",
                    brokerProfile.getUserId(),
                    "/pkgBroker/pages/broker/profile?id="+brokerProfile.getUserId());
        }
        //如果要拒绝该置业顾问的审核提交，也发送消息
        if(BrokerProfile.STATUS_REFUSE == updateRequest.getStatus() || BrokerProfile.STATUS_REFUSE.equals(updateRequest.getStatus())){
            //发送系统消息
            sysMessageService.sendSysMessage("broker",
                    "入驻审核未通过",
                    "您提交的置业顾问入驻申请未通过，原因：{"+updateRequest.getRejectReason()+"}。",
                    brokerProfile.getUserId(),
                    "/pkgBroker/pages/broker/join?group_value=broker");
        }

        //状态未发生变化时，直接保存即可
        if(flag){
            brokerProfileRepository.save(brokerProfile);
            adminLogService.createAdminLog(userId, "置业顾问", "更新置业顾问信息，名称：【" + brokerProfile.getName() + "】，ID：【" + brokerProfile.getId()+"】");
            return JsonResponse.ok("更新成功");
        }

        //状态发生变化，记录详细日志
        //管理员${email}审核了置业顾问${name}${mobile}的资料，审核状态为：${status}
        //使用try catch 防止此处异常导致更新置业顾问失败
        String adminName;
        try {
            Optional<AdminUser> adminUserOptional = adminUserRepository.findById(userId);
            if (adminUserOptional.isPresent()) {
                adminName = adminUserOptional.get().getEmail();
            } else {
                adminName = "" + userId;
            }
        } catch (NoSuchElementException e) {
            adminName = "未知账号，ID："+userId;
        } catch (Exception e) {
            adminName = "未知账号，ID："+userId;
        }
        brokerProfileRepository.save(brokerProfile);
        adminLogService.createAdminLog(userId, "置业顾问", "管理员：【"+adminName+"】审核了置业顾问：【"+brokerProfile.getName()+"】-【"+brokerProfile.getMobile()+"】的资料，审核状态为：【"+BrokerProfile.getStatusToString(updateRequest.getStatus())+"】");
        return JsonResponse.ok("更新成功");
    }

    public JsonResponse deleteBrokerProfile(Integer id, Integer userId){
        brokerProfileRepository.deleteById(id);
        adminLogService.createAdminLog(userId, "置业顾问", "删除置业顾问，ID：" + id);
        return JsonResponse.ok("删除成功");
    }

    @Transactional
    public JsonResponse createBrokerProfile(AdminBrokerProfileCreateRequest create, Integer userId){
        BrokerProfile byMobile = brokerProfileRepository.findByMobile(create.getMobile());
        if (byMobile == null){
            BrokerProfile map = modelMapper.map(create, BrokerProfile.class);
            User user = userService.ensureMobile(create.getMobile());
            map.setUserId(user.id);
            map.setLikeNums(create.getLikeNums() == null || create.getLikeNums() <= 0 ?1:create.getLikeNums());
            map.setViewNums(create.getViewNums() == null || create.getLikeNums() <= 0 ?1:create.getViewNums());
            postRepository.findById(create.getPostId()).ifPresent(post -> {
                map.setPostTitle(post.getTitle());
            });
            map.setCreatedAt(LocalDateTime.now());
            map.setUpdatedAt(LocalDateTime.now());
            brokerProfileRepository.saveAndFlush(map);
            adminLogService.createAdminLog(userId, "置业顾问", "创建置业顾问，名称：【" + map.getName() + "】，ID：【" + map.getId()+"】");
            try {
                genQr(map);
            } catch (WxErrorException e) {
                log.error("置业顾问生成二维码失败，置业顾问：{}",map);
                throw new RuntimeException(e);
            }
            return JsonResponse.ok("创建成功");
        } else {
            String title = postRepository.findById(byMobile.getPostId()).get().getTitle();
            return JsonResponse.error("该置业顾问已经绑定在了楼盘:" + title + "下，无法重复绑定。若需要绑定到此楼盘，请先从" + title + "解绑后再次绑定，或者用一个新的手机号进行绑定");
        }
    }

    @Async
    public void genQr(BrokerProfile brokerProfile) throws WxErrorException {
        WxMaQrcodeService qrcodeService = wxMaService.getQrcodeService();
        File qrcode = qrcodeService.createWxaCode("/pkgBroker/pages/broker/profile?id=" + brokerProfile.getUserId(), 430);
        FileInfo upload = uploadService.Upload(qrcode);
        brokerProfile.setQr(upload.getUrl());
        brokerProfileRepository.save(brokerProfile);
    }

    public JsonResponse getWeappBrokerDetail(Integer userId){
        BrokerProfile brokerProfile = this.isBrokerOrNo(userId);
        if (brokerProfile==null) {
            log.error("没有找到userId为:{}的置业顾问",userId);
            return JsonResponse.error("未找到置业顾问");
        }
        BrokerProfileListingVo map = modelMapper.map(brokerProfile, BrokerProfileListingVo.class);
        return JsonResponse.ok(map);
    }

    public JsonResponse getBrokerShowDetail(Integer userId){
        BrokerProfile brokerProfile = this.isBrokerOrNo(userId);
        if (brokerProfile==null) {
            log.error("没有找到userId为:{}的置业顾问或该置业顾问未审核通过",userId);
            return JsonResponse.error("未找到置业顾问");
        }
        WeappBrokerShowVo map = modelMapper.map(brokerProfile, WeappBrokerShowVo.class);
        return JsonResponse.ok(map);
    }

    public JsonResponse updateBrokerViewsCount(Integer userId){
        BrokerProfile brokerProfile = this.isBrokerOrNo(userId);
        if (brokerProfile==null) {
            log.error("没有找到userId为:{}的置业顾问或该置业顾问未审核通过",userId);
            return JsonResponse.error("未找到置业顾问");
        }
        brokerProfile.setViewNums((brokerProfile.getViewNums() == null || brokerProfile.getViewNums() <= 0 ?1:brokerProfile.getViewNums()) + 1);
        brokerProfileRepository.saveAndFlush(brokerProfile);
        return JsonResponse.ok("更新成功");
    }

    public JsonResponse likeBroker(Integer userId,Integer sendMessageUserId){
        BrokerProfile brokerProfile = this.isBrokerOrNo(userId);
        if (brokerProfile==null) {
            log.error("没有找到userId为:{}的置业顾问或该置业顾问未审核通过",userId);
            return JsonResponse.error("未找到置业顾问");
        }
        brokerProfile.setLikeNums((brokerProfile.getLikeNums() == null || brokerProfile.getLikeNums() <= 0 ?1:brokerProfile.getLikeNums()) + 1);
        brokerProfileRepository.saveAndFlush(brokerProfile);


        Integer currentLoginUserId = sendMessageUserId;

        //当前登录用户的id和点赞的用户id不相等时，才发系统消息
        if (!currentLoginUserId.equals(userId)) {
            String userName;
            Optional<User> user = userRepository.findById(sendMessageUserId);
            if (user.isPresent()) {
                userName = user.get().getName();
            }else{
                userName = "用户";
            }
            sysMessageService.sendSysMessage(SysMessage.CAT_LIKE,"您的主页有新的点赞",userName+"点赞了您的个人主页",brokerProfile.getUserId(),"/pkgBroker/pages/broker/profile?id="+brokerProfile.getUserId());
        }
        return JsonResponse.ok(brokerProfile.getLikeNums());
    }


    public JsonResponse getAdminBrokerProfiles(Map<String,Object> params) {
        Specification<BrokerProfile> specification = (Root<BrokerProfile> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (params.get("kw") != null) {
                predicates.add(criteriaBuilder.or(criteriaBuilder.like(root.get("name"), "%" + params.get("kw") + "%"),
                        criteriaBuilder.like(root.get("mobile"), "%" + params.get("kw") + "%")));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };
        Pageable pageable = PageRequest.of(0, 999999);
        Page<BrokerProfile> pageResult = brokerProfileRepository.findAll(specification,pageable);
        List<BrokerProfile> result = pageResult.getContent().stream().map(brokerProfile -> modelMapper.map(brokerProfile, BrokerProfile.class)).collect(Collectors.toList());
        return JsonResponse.ok(result);
    }

    public JsonResponse JoinApply(BrokerJoinRequest brokerJoinRequest,Integer userId){
        BrokerProfile byUserId = brokerProfileRepository.findByUserId(userId);
        if (byUserId!=null) {
            if(Objects.equals(byUserId.getStatus(), BrokerProfile.STATUS_PENDING)){
                return JsonResponse.ok("已提交审核，请勿重复提交！");
            }else if(Objects.equals(byUserId.getStatus(), BrokerProfile.STATUS_SUCCESS)){
                return JsonResponse.ok("审核通过，账号已开通");
            }else{
                //被拒绝后再次提交审核
                byUserId.setStatus(BrokerProfile.STATUS_PENDING);
                byUserId.setUpdatedAt(LocalDateTime.now());
                Integer postId = brokerJoinRequest.getPostId();
                postRepository.findById(postId).ifPresent(post -> {
                    byUserId.setPostTitle(post.getTitle());
                });
                modelMapper.map(brokerJoinRequest,byUserId);
                brokerProfileRepository.saveAndFlush(byUserId);
                return JsonResponse.ok("申请提交成功");
            }
        }
        BrokerProfile map = modelMapper.map(brokerJoinRequest, BrokerProfile.class);
        map.setStatus(BrokerProfile.STATUS_PENDING);
        map.setCreatedAt(LocalDateTime.now());
        map.setUpdatedAt(LocalDateTime.now());
        map.setUserId(userId);
        Integer postId = brokerJoinRequest.getPostId();
        postRepository.findById(postId).ifPresent(post -> {
            map.setPostTitle(post.getTitle());
        });
        brokerProfileRepository.saveAndFlush(map);
        return JsonResponse.ok("申请提交成功");
    }

    public JsonResponse CheckStatus(Integer userId){
        BrokerProfile byUserId = brokerProfileRepository.findByUserId(userId);
        if(byUserId==null){
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("join_status",0);
            return JsonResponse.ok(jsonObject);
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("join_status",byUserId.getStatus());
        jsonObject.put("reject_reason",byUserId.getRejectReason());
        return JsonResponse.ok(jsonObject);
    }

    public BrokerProfile isBrokerOrNo(Integer userId){
        BrokerProfile byUserId = brokerProfileRepository.findByUserId(userId);
        if (byUserId==null){
            return null;
        }
        if (byUserId.getStatus()!=2) {
            return null;
        }
        return byUserId;
    }

}
