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
import com.udeve.entity.Video;
import com.udeve.repository.VideoRepository;
import com.udeve.request.*;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.PageableInfoVo;
import com.udeve.vo.VideoListVo;
import com.udeve.vo.WeappVideoListVo;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class VideoSerivce {

    @Autowired
    VideoRepository videoRepository;

    @Autowired
    AdminLogService adminLogService;

    @Autowired
    ModelMapper modelMapper;

    public Page<Video> getListing(AdminVideoQueryRequest queryRequest){
        Specification<Video> specification = (Specification<Video>)(Root<Video> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder)->{
            List<Predicate> predicates = new ArrayList<>();
            //默认条件
            predicates.add(criteriaBuilder.greaterThan(root.get("id"),0));

            if(queryRequest.getKw()!=null && !queryRequest.getKw().isEmpty()){
                predicates.add(
                        criteriaBuilder.or(
                                criteriaBuilder.like(root.get("title"),"%"+queryRequest.getKw()+"%"),
                                criteriaBuilder.like(root.get("authorName"),"%"+queryRequest.getKw()+"%")
                        )
                );
            }

            if (queryRequest.getCreatedAt()!=null){
                predicates.add(criteriaBuilder.equal(root.get("createdAt"),queryRequest.getCreatedAt()));
            }

            if (queryRequest.getIsPublic()!=null){
                predicates.add(criteriaBuilder.equal(root.get("isPublic"),queryRequest.getIsPublic()));
            }

            if (queryRequest.getIsWxvideo()!=null){
                predicates.add(criteriaBuilder.equal(root.get("isWxvideo"),queryRequest.getIsWxvideo()));
            }

            if (queryRequest.getIds()!=null && !queryRequest.getIds().isEmpty()){
                predicates.add(root.get("id").in(queryRequest.getIds()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };

        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(queryRequest.getPage() - 1, queryRequest.getPerPage(), sort);

        return videoRepository.findAll(specification,pageable);
    }

    //用于小程序
    public Page<Video> getWeappListing(VideoQueryRequest queryRequest){
        Specification<Video> specification = (root,query,criteriaBuilder)->{
            List<Predicate> predicates = new ArrayList<>();
            //默认条件
            predicates.add(criteriaBuilder.greaterThan(root.get("id"),0));
            //小程序默认拉取公开的数据
            predicates.add(criteriaBuilder.equal(root.get("isPublic"),true));

            if(queryRequest.getKw()!=null && !queryRequest.getKw().isEmpty()){
                predicates.add(
                        criteriaBuilder.or(
                                criteriaBuilder.like(root.get("title"),"%"+queryRequest.getKw()+"%"),
                                criteriaBuilder.like(root.get("authorName"),"%"+queryRequest.getKw()+"%")
                        )
                );
            }

            if (queryRequest.getIds()!=null && !queryRequest.getIds().isEmpty()){
                predicates.add(root.get("id").in(queryRequest.getIds()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };

        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(queryRequest.getPage() - 1, queryRequest.getPerPage(), sort);

        return videoRepository.findAll(specification,pageable);
    }

    public JsonResponse getVideoList(AdminVideoQueryRequest queryRequest){
        Page<Video> listing = getListing(queryRequest);
        PageableInfoVo page = new PageableInfoVo(listing.getPageable(),listing.getTotalPages(),listing.getTotalElements());
        List<VideoListVo> collect = listing.getContent().stream().map(video -> {
            VideoListVo map = modelMapper.map(video, VideoListVo.class);
            return map;
        }).collect(Collectors.toList());
        JSONObject jsonObject = new JSONObject();

        jsonObject.put("page",page);
        jsonObject.put("result",collect);
        return JsonResponse.ok(jsonObject);
    }

    //小程序拉取
    public JsonResponse getWeappVideoList(VideoQueryRequest queryRequest){
        /*if (ObjectUtil.isEmpty(queryRequest.getIds())){
            return JsonResponse.ok(new ArrayList<WeappVideoListVo>());
        }*/
        Page<Video> weappListing = getWeappListing(queryRequest);
        List<WeappVideoListVo> collect = weappListing.getContent().stream().map(video -> {
            WeappVideoListVo map = modelMapper.map(video, WeappVideoListVo.class);
            return map;
        }).collect(Collectors.toList());
        return JsonResponse.ok(collect);
    }
    //小程序增加浏览量
    public JsonResponse increaseViewNums(Integer id){
        Optional<Video> videoOptional = videoRepository.findById(id);
        boolean present = videoOptional.isPresent();
        if(!present){
            return JsonResponse.error("数据不存在！");
        }
        Video video = videoOptional.get();
        int viewNums = video.getViewNums() == null || video.getViewNums()<0 ? 0 : video.getViewNums();
        video.setViewNums(viewNums+1);
        video.setUpdatedAt(LocalDateTime.now());
        videoRepository.saveAndFlush(video);
        return JsonResponse.ok();
    }


    public JsonResponse deleteVideoById(Integer adminUserId,Integer id){
        Optional<Video> videoOptional = videoRepository.findById(id);
        boolean present = videoOptional.isPresent();
        if(!present){
            return JsonResponse.error("数据不存在！");
        }
        adminLogService.createAdminLog(adminUserId,"视频管理","删除视频："+videoOptional.get().getTitle());
        videoRepository.deleteById(id);
        return JsonResponse.ok("删除成功！");
    }

    public JsonResponse createVideoInfo(Integer adminUserId,AdminVideoCreateRequest adminVideoCreateRequest){
        Video map = modelMapper.map(adminVideoCreateRequest, Video.class);
        map.setCreatedAt(LocalDateTime.now());
        map.setUpdatedAt(LocalDateTime.now());
        videoRepository.saveAndFlush(map);
        adminLogService.createAdminLog(adminUserId,"视频管理","创建视频："+map.getTitle());
        return JsonResponse.ok("创建成功！");
    }

    public JsonResponse updateVideoInfo(Integer adminUserId,Integer id, AdminVideoUpdateRequest videoUpdateRequest){
        Optional<Video> videoOptional = videoRepository.findById(id);
        boolean present = videoOptional.isPresent();
        if(!present){
            return JsonResponse.error("数据不存在");
        }

        Video video = videoOptional.get();
        modelMapper.map(videoUpdateRequest,video);
        video.setUpdatedAt(LocalDateTime.now());
        videoRepository.saveAndFlush(video);
        adminLogService.createAdminLog(adminUserId,"视频管理","修改视频："+video.getTitle());
        return JsonResponse.ok("修改成功！");
    }

}
