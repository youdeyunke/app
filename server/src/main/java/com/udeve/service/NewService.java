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
import com.udeve.repository.NewCatRepository;
import com.udeve.request.*;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminNewListVo;
import com.udeve.vo.NewDetailVo;
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
import org.springframework.transaction.annotation.Transactional;
import com.udeve.repository.DetailContentRepository;
import com.udeve.repository.NewRepository;
import javax.persistence.criteria.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class NewService {

    @Autowired
    private NewRepository newRepository;
    @Autowired
    private NewCatRepository newCatRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    DetailContentRepository detailContentRepository;

    public Page<New> getListing(NewQueryRequest query){
        Specification<New> specification = (Specification<New>)(Root<New> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            //增加一个id大于0的默认条件
            predicates.add(criteriaBuilder.greaterThan(root.get("id"), 0));

            if(ObjectUtil.isNotEmpty(query.getKw())){
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(root.get("title"), "%" + query.getKw() + "%"),
                        criteriaBuilder.like(root.get("content"), "%" + query.getKw() + "%"),
                        criteriaBuilder.like(root.get("author"), "%" + query.getKw() + "%")));
            }

            if (ObjectUtil.isNotEmpty(query.getPostId())) {
                // 该部分为连表查询
                Join<New, NewPost> NewJoin = root.join("newPosts", JoinType.LEFT);
                predicates.add(criteriaBuilder.equal(NewJoin.get("postId"), query.getPostId()));
            }

            if (ObjectUtil.isNotEmpty(query.getCatId())) {
                predicates.add(criteriaBuilder.equal(root.get("newsCatId"), query.getCatId()));
            }

            if (ObjectUtil.isNotEmpty(query.getIsTop())) {
                predicates.add(criteriaBuilder.equal(root.get("isTop"), query.getIsTop()));
            }

            if(ObjectUtil.equal(query.getScope(), "public")){
                predicates.add(criteriaBuilder.equal(root.get("isPublic"), true));
            }

            if (ObjectUtil.isNotEmpty(query.getIds())) {
                predicates.add(root.get("id").in(query.getIdList()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(query.getPage()-1,query.getPerPage(), sort);
        return newRepository.findAll(specification, pageable);
    }

    public JsonResponse getNewsList(NewQueryRequest query){
        Page<New> news = getListing(query);
        JSONObject data = new JSONObject();
        PageableInfoVo page = new PageableInfoVo(news.getPageable(),  news.getTotalPages(), news.getTotalElements());

        List<AdminNewListVo> list = news.getContent().stream().map(aNew -> {
            AdminNewListVo map = modelMapper.map(aNew, AdminNewListVo.class);
            if (ObjectUtil.isNotEmpty(aNew.getNewsCatId())) {
                Optional<NewCat> optionalNewCat = newCatRepository.findById(aNew.getNewsCatId());
                if (optionalNewCat.isPresent()) {
                    map.setNewsCat(optionalNewCat.get().getName());
                }else {
                    map.setNewsCat("未知类型");
                }
            }
            return map;
        }).collect(Collectors.toList());

        data.put("result", list);
        data.put("page", page);
        return JsonResponse.ok(data);
    }

    public JsonResponse updateNews(Integer id,AdminNewUpdateRequest upnew){
        New aNew = newRepository.findById(id).get();
        DetailContent detailContent = detailContentRepository.findById(upnew.getDetailContentId()).get();
        if (upnew.getContentType().equals("html")){
            detailContent.setValue(upnew.getContent());
            detailContent.setUpdatedAt(LocalDateTime.now());
            detailContentRepository.save(detailContent);
        }
        modelMapper.map(upnew, aNew);
        aNew.setUpdatedAt(LocalDateTime.now());
        newRepository.saveAndFlush(aNew);

        return JsonResponse.ok("更新成功");
    }

    public JsonResponse createNews(AdminNewCreateRequest create){

        New aNew = modelMapper.map(create, New.class);
        DetailContent detailContent = new DetailContent();
        if (create.getContentType().equals("html")){
            detailContent.setValue(create.getContent());
        } else {
            detailContent.setValue("");
        }
        detailContent.setCreatedAt(LocalDateTime.now());
        detailContent.setUpdatedAt(LocalDateTime.now());
        DetailContent content = detailContentRepository.saveAndFlush(detailContent);
        aNew.setCreatedAt(LocalDateTime.now());
        aNew.setUpdatedAt(LocalDateTime.now());
        aNew.setDetailContentId(content.getId());
        newRepository.saveAndFlush(aNew);

        return JsonResponse.ok("新建成功");
    }

    @Transactional
    public JsonResponse deleteNew(Integer id){
        New aNew = newRepository.findById(id).get();
        newRepository.deleteById(id);
        return JsonResponse.ok("删除成功");
    }

    public JsonResponse getWeappNewsList(NewQueryRequest query){
        Page<New> listing = getListing(query);
        List<AdminNewListVo> list = listing.getContent().stream().map(news -> {
            if (ObjectUtil.isEmpty(news.getNewsCatId())){
                return null;
            }
            Optional<NewCat> optionalNewCat = newCatRepository.findById(news.getNewsCatId());
            if (optionalNewCat.isEmpty()) {
                return null;
            }
            NewCat newCat = optionalNewCat.get();
            if (!newCat.getIsPublic()){
                return null;
            }
            AdminNewListVo map = modelMapper.map(news, AdminNewListVo.class);
            map.setNewsCat(newCat.getName());
            return map;


        }).toList();
        List<AdminNewListVo> adminNewListVos = list.stream().filter(Objects::nonNull).toList();
        return JsonResponse.ok(adminNewListVos);
    }

    public JsonResponse getWeappNewsById(Integer id){
        Optional<New> optionalNew = newRepository.findById(id);
        if (optionalNew.isEmpty()) {
            return JsonResponse.error("文章不存在");
        }
        New aNew = optionalNew.get();
        if (!aNew.getIsPublic()) {
            return JsonResponse.error("文章不存在");
        }
        Optional<DetailContent> detailContentRepositoryById = detailContentRepository.findById(aNew.getDetailContentId());
        aNew.setContent(detailContentRepositoryById.get().getValue());
        NewDetailVo map = modelMapper.map(aNew, NewDetailVo.class);
        return JsonResponse.ok(map);
    }

    public JsonResponse getWeappNewsSummary(){
        List<NewCat> byIsPublicTrue = newCatRepository.findByIsPublicTrue();
        List<JSONObject> collect1 = byIsPublicTrue.stream().map(newCat -> {
            List<New> newList = newRepository.findTop5ByNewsCatIdAndIsPublicTrue(newCat.getId());
            if (newList.size() == 0) {
                return null;
            }
            List<NewDetailVo> collect = newList.stream().map(aNew -> {
                Optional<DetailContent> detailContentRepositoryById = detailContentRepository.findById(aNew.getDetailContentId());
                aNew.setContent(detailContentRepositoryById.get().getValue());
                NewDetailVo map = modelMapper.map(aNew, NewDetailVo.class);
                return map;
            }).collect(Collectors.toList());
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id", newCat.getId());
            jsonObject.put("name", newCat.getName());
            jsonObject.put("items", collect);
            return jsonObject;
        }).collect(Collectors.toList());
        List<JSONObject> res = collect1.stream().filter(Objects::nonNull).collect(Collectors.toList());

        JSONObject zuixin = new JSONObject();
        zuixin.put("name", "最新");
        List<New> newList = newRepository.findTop5ByIsPublicTrueOrderByCreatedAt();
        List<NewDetailVo> zuixlist = newList.stream().map(aNew -> {
            Optional<DetailContent> detailContentRepositoryById = detailContentRepository.findById(aNew.getDetailContentId());
            aNew.setContent(detailContentRepositoryById.get().getValue());
            NewDetailVo map = modelMapper.map(aNew, NewDetailVo.class);
            return map;
        }).collect(Collectors.toList());
        zuixin.put("items", zuixlist);

        JSONObject zuire = new JSONObject();
        zuire.put("name", "最热");
        List<New> newList2 = newRepository.findTop5ByIsPublicTrueAndIsTopTrueOrderByCreatedAt();
        List<NewDetailVo> zuirelist = newList2.stream().map(aNew -> {
            Optional<DetailContent> detailContentRepositoryById = detailContentRepository.findById(aNew.getDetailContentId());
            aNew.setContent(detailContentRepositoryById.get().getValue());
            NewDetailVo map = modelMapper.map(aNew, NewDetailVo.class);
            return map;
        }).collect(Collectors.toList());
        zuire.put("items", zuirelist);

        res.add(0, zuire);
        res.add(0, zuixin);

        return JsonResponse.ok(res);
    }

}
