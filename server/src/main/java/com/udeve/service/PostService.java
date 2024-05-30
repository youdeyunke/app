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
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.ObjectUtil;
import com.udeve.vo.FileInfo;
import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.context.AnalysisContext;
import com.alibaba.excel.event.AnalysisEventListener;
import com.alibaba.excel.exception.ExcelDataConvertException;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.udeve.request.*;
import com.udeve.entity.*;
import com.udeve.repository.*;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.*;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.common.error.WxErrorException;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.ss.usermodel.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.*;
import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.*;

import org.springframework.data.domain.Sort.Order;

import java.util.stream.Collectors;

@Service
@Slf4j
public class PostService {

    @Autowired
    StringRedisTemplate stringRedisTemplate;
    @Autowired
    PostRepository postRepository;
    @Autowired
    PostTypeRepository postTypeRepository;
    @Autowired
    PostCatRepository PostCatRepository;
    @Autowired
    PostTagRepository PostTagRepository;
    @Autowired
    DistrictRepository districtRepository;
    @Autowired
    FitmentRepository fitmentRepository;
    @Autowired
    MetaContentRepository metaContentRepository;
    @Autowired
    DetailContentRepository detailContentRepository;
    @Autowired
    SaleStatusItemRepository saleStatusItemRepository;
    @Autowired
    PermissionItemRepository permissionItemRepository;
    @Autowired
    CityRepository cityRepository;
    @Autowired
    UploadService uploadService;
    @Autowired
    WxMaService wxMaService;
    @Autowired
    AdminLogService adminLogService;
    @Autowired
    PostBrokerRepository postBrokerRepository;
    @Autowired
    BrokerProfileRepository brokerProfileRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    PostReviewService postReviewService;
    @Autowired
    MediaCatRepository mediaCatRepository;
    @Autowired
    MyconfigService myconfigService;
    @Autowired
    PostBannerRepository postBannerRepository;
    @Autowired
    AlbumRepository albumRepository;
    @Autowired
    AlbumPostRepository albumPostRepository;

    @Autowired
    TagsEntityRepository tagsEntityRepository;

    @Autowired
    PostCatRepository postCatRepository;

    @Autowired
    PostTagRepository postTagRepository;

    @Autowired
    PostReviewRepository postReviewRepository;

    @Autowired
    AdminBookingConfigRepository adminBookingConfigRepository;


    public Page<Post> getListing(PostQueryRequest query) {

        // 根据参数进行动态查询
        Specification<Post> specification = (Specification<Post>) (Root<Post> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            // 删除的房源不要展示
            predicates.add(criteriaBuilder.notEqual(root.get("isDelete"), true));

            switch (query.getScope()) {
                case "all":
                    // 全部（不区分是否上架的)
                    break;
                case "public":
                    // 已上架的
                    predicates.add(criteriaBuilder.equal(root.get("isPublic"), true));
                    break;
                case "unpublic":
                    // 未上架的
                    predicates.add(criteriaBuilder.equal(root.get("isPublic"), false));
                    break;
            }

            if (query.getCityId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("city").get("id"), query.getCityId()));
            }
            if (query.getIdList() != null) {
                predicates.add(root.get("id").in(query.getIdList()));
            }
            if (query.getDistrictId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("district").get("id"), query.getDistrictId()));
            }
            if (query.getCatId() != null) {
                Join<Post, PostCat> postCatJoin = root.join("cats", JoinType.INNER);
                predicates.add(criteriaBuilder.equal(postCatJoin.get("id"), query.getCatId()));
            }
            if (query.getAlbumId() != null) {
                Join<Post, AlbumPost> albumPostJoin = root.join("albums", JoinType.INNER);
                predicates.add(criteriaBuilder.equal(albumPostJoin.get("id"), query.getAlbumId()));
            }
            if (query.getFitmentId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("fitment").get("id"), query.getFitmentId()));
            }
            if (query.getMinMaxArea() != null) {
                if (query.getMinMaxArea()[0] != null) {
                    predicates.add(criteriaBuilder.greaterThan(root.get("areaMax"), query.getMinMaxArea()[0]));
                }
                if (query.getMinMaxArea()[1] != null && Integer.parseInt(query.getMinMaxArea()[1]) != 0) {
                    predicates.add(criteriaBuilder.lessThan(root.get("areaMin"), query.getMinMaxArea()[1]));
                }
            }
            if (query.getAveragePrice() != null) {
                if (query.getAveragePrice()[0] != null) {
                    predicates.add(criteriaBuilder.greaterThan(root.get("averagePrice"), query.getAveragePrice()[0]));
                }
                if (query.getAveragePrice()[1] != null) {
                    predicates.add(criteriaBuilder.lessThan(root.get("averagePrice"), query.getAveragePrice()[1]));
                }
            }
            if (query.getTotalPrice() != null) {
                if (query.getTotalPrice()[0] != null) {
                    predicates.add(criteriaBuilder.greaterThan(root.get("totalPriceMax"), query.getTotalPrice()[0]));
                }
                if (query.getTotalPrice()[1] != null) {
                    predicates.add(criteriaBuilder.lessThan(root.get("totalPriceMin"), query.getTotalPrice()[1]));
                }
            }

            if (query.getKw() != null) {
                predicates.add(criteriaBuilder.or(criteriaBuilder.like(root.get("title"), "%" + query.getKw() + "%"),
                        criteriaBuilder.like(root.get("street"), "%" + query.getKw() + "%")));
            }
            criteriaQuery.distinct(true); // 添加distinct关键字，只返回不同的记录
            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };

        List<Order> orders = new ArrayList<>();
        orders.add(new Order(Sort.Direction.DESC, "isTop"));

        if (query.getOrder() != null) {
            String[] split = query.getOrder().split(" ");
            if (split[0].equals("id")) {
                if (split[1].equals("asc")) {
                    orders.add(new Order(Sort.Direction.ASC, "id"));
                } else {
                    orders.add(new Order(Sort.Direction.DESC, "id"));
                }
            }
            if (split[0].equals("average_price")) {
                if (split[1].equals("asc")) {
                    orders.add(new Order(Sort.Direction.ASC, "averagePrice"));
                } else {
                    orders.add(new Order(Sort.Direction.DESC, "averagePrice"));
                }
            }
            if (split[0].equals("sale_status_item_id")) {
                if (split[1].equals("asc")) {
                    orders.add(new Order(Sort.Direction.ASC, "saleStatusItemId"));
                } else {
                    orders.add(new Order(Sort.Direction.DESC, "saleStatusItemId"));
                }
            }
            if (split[0].equals("like_nums")) {
                if (split[1].equals("asc")) {
                    orders.add(new Order(Sort.Direction.ASC, "likeNums"));
                } else {
                    orders.add(new Order(Sort.Direction.DESC, "likeNums"));
                }
            }
            if (split[0].equals("custom_average_price")) {
                if (split[1].equals("asc")) {
                    orders.add(new Order(Sort.Direction.ASC, "averagePrice"));
                } else {
                    orders.add(new Order(Sort.Direction.DESC, "averagePrice"));
                }
            }
        }
        Pageable pageable = PageRequest.of(query.getPage() - 1, query.getPageSize(), Sort.by(orders));
        Page<Post> pageResult = postRepository.findAll(specification, pageable);
        return pageResult;
    }

    public JsonResponse getListingForApi(PostQueryRequest queryDto) {
        Page<Post> pageResult = getListing(queryDto);
        List<PostItemForListingVo> result = pageResult.getContent().stream().map(post -> {
            PostItemForListingVo map = modelMapper.map(post, PostItemForListingVo.class);
            //判断楼盘是否有视频或vr，用于小程显示icon
            List<PostBanner> postBannerList = postBannerRepository.findAllByPostIdOrderByNumberAsc(post.getId());
            postBannerList.stream().forEach(postBanner -> {
                String cat = postBanner.getCat();
                if (("video").equals(cat)) {
                    map.setHasVideo(true);
                }
                if (("vr").equals(cat)) {
                    map.setHasVr(true);
                }
            });
            map.setViews(post.getViewNums());
            return map;
        }).collect(Collectors.toList());
        PageableInfoVo page = new PageableInfoVo(pageResult.getPageable(), pageResult.getTotalPages(), pageResult.getTotalElements());
        JSONObject data = new JSONObject();
        data.put("result", result);
        data.put("page", page);
        return JsonResponse.success(data);
    }

    public JsonResponse getPostList(PostQueryRequest queryDto) {
        Page<Post> pageResult = getListing(queryDto);

        //预约看房url
        PermissionItem byComponentPathBooking = permissionItemRepository.findByComponentPath("bookings/index");
        PermissionItem permissionItemBooking = permissionItemRepository.findById(byComponentPathBooking.getFatherId()).get();
        String bookingsUrl = permissionItemBooking.getPath() + "/" + byComponentPathBooking.getPath();
        String replaceBookingsUrl = bookingsUrl.replace(":id", "");


        //楼盘详情url
        PermissionItem byComponentPath = permissionItemRepository.findByComponentPath("xinfangUpdate/index");
        PermissionItem permissionItem = permissionItemRepository.findById(byComponentPath.getFatherId()).get();
        String url = permissionItem.getPath() + "/" + byComponentPath.getPath();
        url = url.replace(":id", "");
        String finalUrl = url;
        List<AdminPostListVo> list = pageResult.getContent().stream().map(post -> {
            AdminPostListVo map = modelMapper.map(post, AdminPostListVo.class);
            map.setUrl(finalUrl + post.getId());
            map.setBookingsUrl(replaceBookingsUrl + post.getId());
            return map;
        }).collect(Collectors.toList());
        JSONObject data = new JSONObject();
        PageableInfoVo page = new PageableInfoVo(pageResult.getPageable(), pageResult.getTotalPages(), pageResult.getTotalElements());
        data.put("result", list);
        data.put("page", page);
        return JsonResponse.ok(data);
    }

    public JsonResponse getPostSimpleList() {
        PostQueryRequest queryDto = new PostQueryRequest();
        queryDto.setScope("all");
        queryDto.setPerPage(99999);
        queryDto.setPage(1);
        Page<Post> pageResult = getListing(queryDto);
        List<AdminSimplePostListVo> list = pageResult.getContent().stream().map(post -> {
            AdminSimplePostListVo map = modelMapper.map(post, AdminSimplePostListVo.class);
            return map;
        }).collect(Collectors.toList());

        return JsonResponse.ok(list);
    }

    @Transactional
    public JsonResponse createPost(AdminPostCreateRequest post, Integer adminUserId) {
        Post newPostEntity = modelMapper.map(post, Post.class);

        DistrictEntity districtEntity = districtRepository.findById(post.getDistrictId()).get();
        SaleStatusItem saleStatusItem = saleStatusItemRepository.findById(post.getSaleStatusItemId()).get();

        // 创建默认的详情数据
        DetailContent detailContent = new DetailContent();
        detailContent.setCreatedAt(LocalDateTime.now());
        detailContent.setUpdatedAt(LocalDateTime.now());
        detailContentRepository.saveAndFlush(detailContent);

        MetaContent metaContent = new MetaContent();
        metaContent.setCreatedAt(LocalDateTime.now());
        metaContent.setUpdatedAt(LocalDateTime.now());
        metaContentRepository.saveAndFlush(metaContent);
        Fitment fitment = fitmentRepository.findById(post.getFitmentId()).get();
        City cityEntity = districtEntity.getCity();

        newPostEntity.setCreatedAt(LocalDateTime.now());
        newPostEntity.setUpdatedAt(LocalDateTime.now());
        newPostEntity.setDetailContentId(detailContent.getId());
        newPostEntity.setMetaContentId(metaContent.getId());
        newPostEntity.setDistrict(districtEntity);
        newPostEntity.setCity(cityEntity);
        newPostEntity.setSaleStatusItem(saleStatusItem);
        newPostEntity.setFitment(fitment);
        newPostEntity.setAdminUserId(adminUserId);
        newPostEntity.setReviewEnable(false);

        postRepository.saveAndFlush(newPostEntity);


        Integer[] weeks = {1, 2, 3, 4, 5, 6, 7};
        ArrayList<BookingConfig> bookingConfigs = new ArrayList<>();
        List<BookingConfig> byPostId = adminBookingConfigRepository.findByPostId(newPostEntity.getId());
        if (byPostId.isEmpty()) {
            for (Integer week : weeks) {
                BookingConfig bookingConfig = new BookingConfig();
                LocalDateTime now = LocalDateTime.now();
                bookingConfig.setPostId(newPostEntity.getId());
                bookingConfig.setWeek(week);
                bookingConfig.setHours(Arrays.asList("9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"));
                bookingConfig.setCreatedAt(now);
                bookingConfig.setUpdatedAt(now);
                bookingConfigs.add(bookingConfig);
            }
        }
        adminBookingConfigRepository.saveAllAndFlush(bookingConfigs);


        MediaCat mediaCat = new MediaCat();
        mediaCat.setName("效果图");
        mediaCat.setTargetType("post");
        mediaCat.setTargetId(newPostEntity.getId());
        mediaCat.setCreatedAt(LocalDateTime.now());
        mediaCat.setUpdatedAt(LocalDateTime.now());
        mediaCatRepository.saveAndFlush(mediaCat);
        postReviewService.initDataOfPostReview(newPostEntity.getId());
        post.getCatIds().forEach(catId -> {
            if (catId == null) return;
            PostCat postCat = new PostCat();
            postCat.setPostId(newPostEntity.getId());
            postCat.setCatId(catId);
            postCat.setCreatedAt(LocalDateTime.now());
            postCat.setUpdatedAt(LocalDateTime.now());
            PostCatRepository.saveAndFlush(postCat);
        });
        post.getTagIds().forEach(tagId -> {
            if (tagId == null) return;
            PostTag postTag = new PostTag();
            postTag.setPostId(newPostEntity.getId());
            postTag.setTagId(tagId);
            postTag.setCreatedAt(LocalDateTime.now());
            postTag.setUpdatedAt(LocalDateTime.now());
            PostTagRepository.saveAndFlush(postTag);
        });
        JSONObject data = new JSONObject();
        data.put("id", newPostEntity.getId());
        adminLogService.createAdminLog(adminUserId, "楼盘管理", "新建楼盘：" + newPostEntity.getTitle() + "，ID：" + newPostEntity.getId());

        try {
            genQrCode(newPostEntity.getId());
        } catch (WxErrorException e) {
            log.error("创建楼盘：生成二维码失败");
        }
        return JsonResponse.ok(data);
    }

    @Async
    public void genQrCode(Integer postId) throws WxErrorException {
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) {
            return;
        }
        WxMaQrcodeService qrcodeService = wxMaService.getQrcodeService();
        File qrcode = qrcodeService.createWxaCode("pkgPost/pages/show/index?id=" + postId, 430);
        FileInfo upload = uploadService.Upload(qrcode);
        post.setQr(upload.getUrl());
        postRepository.saveAndFlush(post);
    }

    public JsonResponse getPostDetail(Integer postId) {
        Post post = postRepository.findById(postId).get();

        AdminPostDetailVo postDetailDto = modelMapper.map(post, AdminPostDetailVo.class);
        postDetailDto.setCityId(post.getCity().getId());
        postDetailDto.setDistrictId(post.getDistrict().getId());
        postDetailDto.setFitmentId(post.getFitment().getId());
        postDetailDto.setSaleStatusItemId(post.getSaleStatusItem().getId());
        List<Integer> cats = new ArrayList<>();
        post.getCats().forEach(postCat -> {
            cats.add(postCat.getId());
        });
        postDetailDto.setCatIds(cats);
        List<Integer> tags = new ArrayList<>();
        post.getTags().forEach(postTag -> {
            tags.add(postTag.getId());
        });
        postDetailDto.setTagIds(tags);

        return JsonResponse.ok(postDetailDto);
    }

    @Transactional
    public JsonResponse updatePost(Integer id, AdminPostUpdateRequest postUpdateDto, Integer adminUserId) {
        Post post = postRepository.findById(id).get();

        modelMapper.map(postUpdateDto, post);
        post.setUpdatedAt(LocalDateTime.now());

        if (postUpdateDto.getDistrictId() == null && postUpdateDto.getFitmentId() == null && postUpdateDto.getSaleStatusItemId() == null) {
            postRepository.saveAndFlush(post);
            return JsonResponse.ok("保存成功");
        }
        DistrictEntity districtEntity = districtRepository.findById(postUpdateDto.getDistrictId()).get();
        City cityEntity = districtEntity.getCity();
        Fitment fitment = fitmentRepository.findById(postUpdateDto.getFitmentId()).get();
        SaleStatusItem saleStatusItem = saleStatusItemRepository.findById(postUpdateDto.getSaleStatusItemId()).get();

        post.setDistrict(districtEntity);
        post.setCity(cityEntity);
        post.setFitment(fitment);
        post.setSaleStatusItem(saleStatusItem);

        PostCatRepository.deleteAllByPostId(id);
        postUpdateDto.getCatIds().forEach(catId -> {
            if (catId == null) return;
            PostCat postCat = new PostCat();
            postCat.setPostId(id);
            postCat.setCatId(catId);
            postCat.setCreatedAt(LocalDateTime.now());
            postCat.setUpdatedAt(LocalDateTime.now());
            PostCatRepository.saveAndFlush(postCat);
        });
        PostTagRepository.deleteAllByPostId(id);
        postUpdateDto.getTagIds().forEach(tagId -> {
            if (tagId == null) return;
            PostTag postTag = new PostTag();
            postTag.setPostId(id);
            postTag.setTagId(tagId);
            postTag.setCreatedAt(LocalDateTime.now());
            postTag.setUpdatedAt(LocalDateTime.now());
            PostTagRepository.saveAndFlush(postTag);
        });
        postRepository.saveAndFlush(post);

        adminLogService.createAdminLog(adminUserId, "楼盘管理", "更新楼盘：" + post.getTitle() + "，ID：" + post.getId());
        return JsonResponse.ok("保存成功");
    }

    public JsonResponse isPublicPost(Integer pid, String state, Integer adminUserId) {
        Post post = postRepository.findById(pid).get();
        if (state.equals("public")) {
            post.setIsPublic(true);
            try {
                genQrCode(post.getId());
            } catch (WxErrorException e) {
                throw new RuntimeException("二维码生成失败，请重试！");
            }
            adminLogService.createAdminLog(adminUserId, "楼盘管理", "上架楼盘：" + post.getTitle() + "，ID：" + post.getId());
        } else if (state.equals("unpublic")) {
            post.setIsPublic(false);
            adminLogService.createAdminLog(adminUserId, "楼盘管理", "下架楼盘：" + post.getTitle() + "，ID：" + post.getId());
        }
        postRepository.saveAndFlush(post);
        return JsonResponse.ok("更新成功");
    }

    public JsonResponse isTopPost(Integer pid, String state, Integer adminUserId) {
        Post post = postRepository.findById(pid).get();
        if (state.equals("is_top")) {
            post.setIsTop(true);
            adminLogService.createAdminLog(adminUserId, "楼盘管理", "置顶楼盘：" + post.getTitle() + "，ID：" + post.getId());
        } else if (state.equals("not_top")) {
            post.setIsTop(false);
            adminLogService.createAdminLog(adminUserId, "楼盘管理", "取消置顶楼盘：" + post.getTitle() + "，ID：" + post.getId());
        }
        postRepository.saveAndFlush(post);
        return JsonResponse.ok("更新成功");
    }

    @Transactional
    public JsonResponse deletePost(Integer pid, String state, Integer adminUserId) {
        Post post = postRepository.findById(pid).get();
        if (state.equals(("delete"))) {
            post.setIsDelete(true);
            adminLogService.createAdminLog(adminUserId, "楼盘管理", "删除楼盘：" + post.getTitle() + "，ID：" + post.getId());
        }
        postRepository.saveAndFlush(post);
        //删除此楼盘的预约看房的数据
        adminBookingConfigRepository.deleteByPostId(pid);
        return JsonResponse.ok("更新成功");
    }



    public JsonResponse getPostTypeList(Integer postId) {
        List<PostType> typeList = postTypeRepository.findAllByPostId(postId);
        List<AdminPostTypeListVo> list = typeList.stream().map(postType -> {
            AdminPostTypeListVo map = modelMapper.map(postType, AdminPostTypeListVo.class);
            return map;
        }).collect(Collectors.toList());
        for (AdminPostTypeListVo adminPostTypeListVo : list) {
            adminPostTypeListVo.setImagesList(TypeImagesList(adminPostTypeListVo.images));
        }
        return JsonResponse.ok(list);
    }


    public JsonResponse updatePostReviewEnable(Integer id) {
        Post post = postRepository.findById(id).get();
        post.setReviewEnable(!post.getReviewEnable());
        postRepository.saveAndFlush(post);
        return JsonResponse.ok(post.getReviewEnable());
    }

    // 显示推荐房源
    public List<Post> getRecomPostList(Integer postid) {
        Specification<Post> specification = (Specification<Post>) (Root<Post> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            // 删除的房源不要展示getb
            predicates.add(criteriaBuilder.notEqual(root.get("isDelete"), true));
            // 未上架房源不能显示
            predicates.add(criteriaBuilder.notEqual(root.get("isPublic"), false));
            // 随机升序排序
            criteriaQuery.orderBy(criteriaBuilder.asc(criteriaBuilder.function("RAND", Double.class)));

            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };
        Pageable pageable = PageRequest.of(0, 4);
        Page<Post> pageResult = postRepository.findAll(specification, pageable);
        return pageResult.getContent();
    }


    public List<String> TypeImagesList(String images) {
        List<String> imagesList = Arrays.asList(images.split(","));
        return imagesList;
    }

    // 拉取楼盘绑定的置业顾问列表
    public List<BrokerProfile> getBrokers(Integer postId) {
        //查询审核通过(status = 2)的置业顾问
        return brokerProfileRepository.findFirst5ByPostIdAndStatus(postId, 2);
    }

    public JsonResponse refreshQrCode(Integer postId) {
        try {
            String appId = myconfigService.getAppId();
            String appSecret = myconfigService.getAppSecret();
            if (appId == null || ("").equals(appId) || appSecret == null || ("").equals(appSecret)) {
                throw new RuntimeException("未配置小程序ID和秘钥：请在【界面设计器】左上角【设置】处填写相关信息");
            } else {
                genQrCode(postId);
                Optional<Post> postOptional = postRepository.findById(postId);
                if (postOptional.isEmpty()) {
                    return JsonResponse.error("未找到ID为：（"+postId+"）的楼盘");
                }
                return JsonResponse.ok(postOptional.get().getQr());
            }
        } catch (WxErrorException e) {
            throw new RuntimeException("生成二维码失败，请重试！");
        }
    }
}
