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
import com.alibaba.fastjson.JSONObject;
import com.udeve.entity.*;
import com.udeve.repository.*;
import com.udeve.request.*;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminEventCatListVo;
import com.udeve.vo.AdminEventListVo;
import com.udeve.vo.EventCatVo;
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
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class EventService {

    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private EventCatRepository eventCatRepository;
    @Autowired
    AdminLogService adminLogService;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    BrokerProfileRepository brokerProfileRepository;
    @Autowired
    SysMessageService sysMessageService;

    @Autowired
    AsyncService asyncService;

    public Page<Event> getListing(EventQueryRequest query){
        Specification<Event> specification = (Specification<Event>)(Root<Event> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            //增加一个id大于0的默认条件
            predicates.add(criteriaBuilder.greaterThan(root.get("id"), 0));
            if(!ObjectUtil.equals(query.getKw(), null)){
                predicates.add(criteriaBuilder.or(criteriaBuilder.like(root.get("title"), "%" + query.getKw() + "%"),
                        criteriaBuilder.like(root.get("content"), "%" + query.getKw() + "%")));
            }
            if(ObjectUtil.equals(query.getScope(),"public")){
                predicates.add(criteriaBuilder.equal(root.get("isPublic"), true));
            }
            if (query.getPostId() != null){
                predicates.add(criteriaBuilder.equal(root.get("postId"), query.getPostId()));
            }
            if (query.getCatId() != null){
                predicates.add(criteriaBuilder.equal(root.get("catId"), query.getCatId()));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(query.getPage()-1,query.getPerPage(), sort);
        Page<Event> all = eventRepository.findAll(specification, pageable);
        return all;
    }

    public JsonResponse getEventList(EventQueryRequest query) {

        Page<Event> all = getListing(query);
        JSONObject data = new JSONObject();
        PageableInfoVo page = new PageableInfoVo(all.getPageable(),  all.getTotalPages(), all.getTotalElements());
        List<AdminEventListVo> list = all.getContent().stream().map(event -> {
            AdminEventListVo map = modelMapper.map(event, AdminEventListVo.class);
            return map;
        }).collect(Collectors.toList());
        List<EventCat> cats = eventCatRepository.findAll();
        List<AdminEventCatListVo> catlist = cats.stream().map(cat -> {
            AdminEventCatListVo map = modelMapper.map(cat, AdminEventCatListVo.class);
            return map;
        }).collect(Collectors.toList());
        data.put("cats", catlist);
        data.put("result", list);
        data.put("page", page);
        return JsonResponse.ok(data);
    }

    public JsonResponse updateEvent(Integer id, AdminEventUpdateRequest event, Integer userId){
        Event map = eventRepository.findById(id).orElse(null);
        if (map == null){
            return JsonResponse.error("未找到此动态");
        }
        modelMapper.map(event, map);
        Post post = postRepository.findById(event.getPostId()).orElse(null);
        if (post == null) {
            return JsonResponse.error("未找到此楼盘");
        }
        map.setPost(post);
        if(event.getStatus().equals(Event.STATUS_PUBLISHED)){//发布上线
            map.setIsPublic(true);
        }
        Event eventSaved = eventRepository.saveAndFlush(map);
        adminLogService.createAdminLog(userId, "楼盘动态管理", "更新楼盘动态：" + map.getTitle() + "，ID：" + map.getId());
        //发送系统消息给订阅此楼盘的用户
        //调用异步任务执行耗时操作
        if (!eventSaved.getPushDone() && map.getIsPublic()) {
            asyncService.sendSysMsgToUsers(
                    post.getId(),
                    "post_event",
                    post.getTitle()+"有新动态",
                    map.getContent(),"/pkgPost/pages/show/index?id="+post.getId()
            );
            eventSaved.setPushDone(true);
            eventRepository.saveAndFlush(eventSaved);
        }
        return JsonResponse.ok("更新成功");
    }

    public JsonResponse createEvent(AdminEventCreateRequest event, Integer userId){
        Event map = modelMapper.map(event, Event.class);
        map.setCreatedAt(LocalDateTime.now());
        map.setUpdatedAt(LocalDateTime.now());
        Post post = postRepository.findById(event.getPostId()).orElse(null);
        if (post == null){
            return JsonResponse.error("未找到此楼盘");
        }
        map.setPost(post);
        if(event.getStatus().equals(Event.STATUS_PUBLISHED)){//发布上线
            map.setIsPublic(true);
        }
        Event eventSaved = eventRepository.saveAndFlush(map);
        adminLogService.createAdminLog(userId, "楼盘动态管理", "创建楼盘动态：" + map.getTitle() + "，ID：" + map.getId());

        //发送系统消息给订阅此楼盘的用户
        //调用异步任务执行耗时操作
        if (!eventSaved.getPushDone() && map.getIsPublic()) {
            asyncService.sendSysMsgToUsers(
                    post.getId(),
                    "post_event",
                    post.getTitle()+"有新动态",map.getContent(),
                    "/pkgPost/pages/show/index?id="+post.getId()
            );
            eventSaved.setPushDone(true);
            eventRepository.saveAndFlush(eventSaved);
        }
        return JsonResponse.ok("创建成功");
    }

    public JsonResponse deleteEvent(Integer id, Integer userId){
        eventRepository.deleteById(id);
        adminLogService.createAdminLog(userId, "楼盘动态管理", "删除楼盘动态，ID：" + id);
        return JsonResponse.ok("删除成功");
    }

    public JsonResponse getWeappEventList(Integer postId, Integer catId){
        EventQueryRequest query = new EventQueryRequest();
        query.setPostId(postId);
        query.setCatId(catId);
        query.setScope("public");
        Page<Event> all = getListing(query);

        List<AdminEventListVo> list = all.getContent().stream().map(event -> {
            AdminEventListVo map = modelMapper.map(event, AdminEventListVo.class);
            return map;
        }).collect(Collectors.toList());
        List<EventCat> cats = eventCatRepository.findAll();

//        List<EventCat> resCats = cats.stream()
//                .filter(cat -> list.stream().anyMatch(event -> event.getCatId().equals(cat.getId())))
//                .collect(Collectors.toList());

        List<JSONObject> resCatList = cats.stream().map(cat -> {
            JSONObject map = new JSONObject();
            map.put("id", cat.getId());
            map.put("name", cat.getName());
            map.put("value", cat.getValue());
            map.put("count", eventRepository.countByPostIdAndCatIdAndIsPublicTrue(postId, cat.getId()) );
            return map;
        }).collect(Collectors.toList());

        JSONObject allEventCat = new JSONObject();
        allEventCat.put("name","全部动态");
        allEventCat.put("id", "");
        allEventCat.put("count", eventRepository.countByPostIdAndIsPublicTrue(postId));
        resCatList.add(0, allEventCat);

        JSONObject data = new JSONObject();
        data.put("cats", resCatList);
        data.put("items", list);
        return JsonResponse.ok(data);
    }

    /**
     * 小程序获取楼盘动态分类列表
     * @return
     */
    public JsonResponse getEventCatsList(){
        List<EventCat> eventCats = eventCatRepository.findAll();
        if(eventCats.isEmpty()){
            return JsonResponse.error("楼盘动态分类列表为空");
        }
        List<EventCatVo> eventCatVos = eventCats.stream().map(eventCat -> {
            return modelMapper.map(eventCat, EventCatVo.class);
        }).collect(Collectors.toList());
        return JsonResponse.ok(eventCatVos);
    }

    /**
     * 小程序发布楼盘动态
     * @param userId 用于获取用户id
     * @param createEventsRequest 用于接收前端传来的参数
     * @return
     */
    public JsonResponse weappCreateEvent(Integer userId,CreateEventsRequest createEventsRequest){
        if(createEventsRequest==null){
            return JsonResponse.error("所传参数不能为空");
        }
        BrokerProfile brokerProfileByUserId = brokerProfileRepository.findByUserId(userId);
        if(brokerProfileByUserId==null){
            return JsonResponse.error("当前用户不是置业顾问");
        }
        if (brokerProfileByUserId.getStatus()!=2){
            return JsonResponse.error("当前用户的置业顾问状态异常");
        }
        if(brokerProfileByUserId.getPostId()==null){
            return JsonResponse.error("该置业顾问没有主营楼盘");
        }
        Integer postId = brokerProfileByUserId.getPostId();
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null){
            return JsonResponse.error("未找到此楼盘");
        }
        Event map = modelMapper.map(createEventsRequest, Event.class);
        map.setCreatedAt(LocalDateTime.now());
        map.setUpdatedAt(LocalDateTime.now());
        map.setPostId(postId);
        map.setPost(post);
        map.setStatus(0);
        map.setPubFrom("小程序");
        Event event = eventRepository.saveAndFlush(map);
        return JsonResponse.ok("发布成功");
    }

    /**
     * 小程序删除楼盘动态
     * @param userId 用于获取当前登录用户id
     * @param id 用于删除楼盘动态
     * @return
     */
    public JsonResponse deleteEventById(Integer userId,Integer id){
        if(id==null){
            return JsonResponse.error("楼盘动态id不能为空");
        }
        Optional<Event> eventOptional = eventRepository.findById(id);
        if (eventOptional.isEmpty()){
            return JsonResponse.error("动态不存在");
        }
        Integer postIdByEvent = eventOptional.get().getPostId();
        BrokerProfile brokerProfile = brokerProfileRepository.findByUserId(userId);
        if (brokerProfile.getStatus()!=2) {
            return JsonResponse.error("当前置业顾问状态异常");
        }
        Integer postIdByBrokerProfile = brokerProfile.getPostId();
        if(!postIdByEvent.equals(postIdByBrokerProfile)){
            return JsonResponse.error("删除错误，请重试");
        }
        eventRepository.deleteById(id);
        return JsonResponse.ok("删除成功");

    }

}
