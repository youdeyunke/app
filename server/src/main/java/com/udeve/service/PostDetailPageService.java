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
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.udeve.entity.*;
import com.udeve.repository.*;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.*;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

// 构造小程序端楼盘详情页数据

@Service
@Slf4j
public class PostDetailPageService {
    @Autowired
    private MediaItemRepository mediaItemRepository;
    @Autowired
    private NewPostRepository newPostRepository;
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private PostPointRepository postPointRepository;
    @Autowired
    PostReviewRepository postReviewRepository;
    @Autowired
    ModelMapper modelMapper;

    @Autowired
    PostRepository postRepository;

    @Autowired
    PostBannerRepository postBannerRepository;
    @Autowired
    DetailContentRepository detailContentRepository;
    @Autowired
    MetaContentRepository metaContentRepository;
    @Autowired
    PostTypeRepository postTypeRepository;
    @Autowired
    MediaCatRepository mediaCatRepository;
    @Autowired
    MyEnumerationRepository myEnumerationRepository;
    @Autowired
    PostService postService;
    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    BrokerProfileService brokerProfileService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    NewCatRepository newCatRepository;

    public JsonResponse  getPostDetailPageData(Integer postId) {
        log.info("getPostDetailPageData {}", postId);
        Post post = postRepository.findById(postId).orElse(null);
        if(post == null){
            return JsonResponse.notFound();
        }
        List<PostBlockVo> blocks = new ArrayList<>();
        blocks.add(getBaseInfoBlock(post));
        blocks.add(getTypesBlock(post));
        blocks.add(getPointsBlock(post));
        blocks.add(getEventsBlock(post));
        blocks.add(getQasBlock(post));
        blocks.add(getBrokersBlock(post));
        blocks.add(getNewsBlock(post));
        blocks.add(getXiangceBlock(post));
        blocks.add(getReviewBlock(post));
        blocks.add(getRecomsBlock(post));
        // 过滤掉show=false的block
        blocks = blocks.stream().filter(item -> item.getShow()).collect(java.util.stream.Collectors.toList());
        return JsonResponse.ok(blocks);
    }

    public JsonResponse getPostBannerInfo(Integer postId){
        Post post = postRepository.findById(postId).orElse(null);
        List<PostBanner> banners = postBannerRepository.findAllByPostIdOrderByNumberAsc(postId);
        List<MyEnumeration> enumerationList = myEnumerationRepository.findByCatAndIsDeleteFalseOrderByNumberDesc("post_banner_cat");
        List<WeappPostBannerVo> bannerVoList = banners.stream().map(banner -> {
            WeappPostBannerVo map = modelMapper.map(banner, WeappPostBannerVo.class);
            return map;
        }).collect(Collectors.toList());

        List<WeappPostBannerCatVo> bannerCatVoList = enumerationList.stream().map(myEnumeration -> {
            WeappPostBannerCatVo map = modelMapper.map(myEnumeration, WeappPostBannerCatVo.class);
            return map;
        }).collect(Collectors.toList());

        WeappPostBannerVo Banner = new WeappPostBannerVo();
        Banner.setUrl(post.getCover());
        Banner.setImage(post.getCover());
        Banner.setCat(myEnumerationRepository.findByCatAndValueAndIsDeleteFalse("post_banner_cat","image").getValue());
        bannerVoList.add(0, Banner);

        List<WeappPostBannerCatVo> CatVoList = bannerCatVoList.stream()
                .filter(enumeration -> bannerVoList.stream().anyMatch(banner -> banner.getCat().equals(enumeration.getValue())))
                .collect(Collectors.toList());
        JSONObject value = new JSONObject();

        value.put("banners", bannerVoList);
        value.put("cats", CatVoList);

        return JsonResponse.ok(value);
    }

    public JsonResponse getPostDetail(Integer postId){
        Post post = postRepository.findById(postId).orElse(null);
        PostItemForListingVo postItemVo = modelMapper.map(post, PostItemForListingVo.class);
        JSONObject value = new JSONObject();
        value.put("address", post.getAddress());
        value.put("title", post.getTitle());
        value.put("longitude", post.getLongitude());
        value.put("latitude", post.getLatitude());
        value.put("area_info", postItemVo.getAreaInfo());
        value.put("average_price_info", postItemVo.getAveragePriceInfo());
        value.put("total_price_info", postItemVo.getTotalPriceInfo());
        value.put("phone", post.getPhone());
        value.put("sub_phone", post.getSubPhone());
        value.put("cover", post.getCover());
        value.put("content", detailContentRepository.findById(post.getDetailContentId()).get().getValue());
        value.put("meta", metaContentRepository.findById(post.getMetaContentId()).get().getValue());
        List<PostType> types = postTypeRepository.findAllByPostIdOrderByNumber(post.getId());
        value.put("types", types);
        return JsonResponse.ok(value);
    }

    public JsonResponse getTypeListById(Integer id){
        List<PostType> postTypeList = postTypeRepository.findAllByPostIdOrderByNumber(id);
        List<PostTypesVo> list = postTypeList.stream().map(postType -> {
            PostTypesVo map = modelMapper.map(postType, PostTypesVo.class);
            map.setImagesList(Arrays.asList(map.getImages().split(",")));
            return map;
        }).collect(Collectors.toList());
        return JsonResponse.ok(list);
    }

    private PostBlockVo getXiangceBlock(Post post) {
        PostBlockVo block = new PostBlockVo();
        block.setName("xiangce");
        block.setLabel("楼盘相册");
        block.setLabelShort("相册");
        JSONObject value = new JSONObject();
        List<PostMediaCatVo> items = mediaCatRepository.findByTargetTypeAndTargetIdOrderByNumberAsc("post", post.getId()).stream().map(item -> {
            PostMediaCatVo vo = modelMapper.map(item, PostMediaCatVo.class);
            // 查询封面图片的url
            MediaItem cover = null;
            if(item.getCoverId() == null){
                // 如果没有封面，就取第一张图片
                cover = mediaItemRepository.findFirstByMediaCatIdAndFiletypeOrderByNumberAsc(item.getId(), "image");
            }else{
                cover = mediaItemRepository.findById(item.getCoverId()).orElse(null);
            }
            if(cover == null){
                return null;
            }
            vo.setCover(cover.getUrl());
            return vo;
        }).collect(Collectors.toList());
        List<PostMediaCatVo> newItems = items.stream().filter(Objects::nonNull).collect(Collectors.toList());
        if(newItems.size()==0){
            block.setShow(false);
            return block;
        }
        value.put("items", newItems);
        block.setValue(value);
        return block;
    }

    private PostBlockVo getNewsBlock(Post post) {
        PostBlockVo block = new PostBlockVo();
        block.setName("news");
        block.setLabel("楼盘资讯");
        block.setLabelShort("资讯");
        JSONObject value = new JSONObject();
        List<NewPost> relations = newPostRepository.findByPostId(post.getId());
        List<NewsListingVo> items = relations.stream().map(item -> {
            New news = item.getNews();
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
            NewsListingVo vo = modelMapper.map(news, NewsListingVo.class);
            vo.setNewsCat(newCat.getName());
            return vo;
        }).filter(Objects::nonNull).collect(Collectors.toList());
        value.put("items", items);

        if(items.isEmpty()){
            block.setShow(false);
            return block;
        }
        value.put("items", items);
        value.put("more_url", "/pkgNews/pages/news/PostNews/index?post_id=" + post.getId().toString());
        value.put("post_id", post.getId());
        value.put("more_title", "查看全部资讯");
        block.setValue(value);
        return block;
    }


    private PostBlockVo getBrokersBlock(Post post) {
        PostBlockVo block = new PostBlockVo();
        List<BrokerProfile> brokers = postService.getBrokers(post.getId());
        if(brokers.size() == 0){
            block.setShow(false);
            return block;
        }
        block.setName("brokers");
        block.setLabel("置业顾问");
        block.setLabelShort("顾问");
        JSONObject value = new JSONObject();
        // 转换成vo，防止泄露敏感信息
        List<BrokerProfileListingVo> collect = brokers.stream().map(item -> {
            return modelMapper.map(item, BrokerProfileListingVo.class);
        }).collect(Collectors.toList());
        value.put("items", collect);
        value.put("post_id",post.getId());

        if(brokers.size() > 3){
            value.put("more_url", "/pkgBroker/pages/broker/index?post_id=" + post.getId().toString());
            value.put("post_id", post.getId());
            value.put("more_title", "查看全部置业顾问");
        }
        block.setValue(value);
        return block;
    }

    private PostBlockVo getEventsBlock(Post post) {
        PostBlockVo block = new PostBlockVo();
        List<Event> events = eventRepository.findByPostIdAndIsPublicTrue(post.getId());
        if(events.size() == 0){
            block.setShow(false);
            return block;
        }
        block.setName("events");
        block.setLabel("楼盘动态");
        block.setLabelShort("动态");
        JSONObject value = new JSONObject();
        value.put("more_url", "/pkgEvent/pages/event/index?id=" + post.getId().toString());
        value.put("more_title", "查看全部动态");

        value.put("items", events.stream().map(item -> {
            return modelMapper.map(item, EventListingItemVo.class);
        }).collect(java.util.stream.Collectors.toList()));
        block.setValue(value);
        return block;
    }

    // 项目亮点
    private PostBlockVo getPointsBlock(Post post){
        PostBlockVo block = new PostBlockVo();
        block.setName("points");
        block.setLabel("项目亮点");
        block.setLabelShort("亮点");
        JSONObject value = new JSONObject();
        List<PostPoint> points = postPointRepository.findAllByPostIdOrderById(post.getId());
        if(points.size() == 0){
            block.setShow(false);
            return block;
        }

        value.put("items", points);
        block.setValue(value);
        return block;

    }

    // 基本信息
    private PostBlockVo getBaseInfoBlock(Post post) {
        PostItemForListingVo postItemVo = modelMapper.map(post, PostItemForListingVo.class);
        PostBlockVo block = new PostBlockVo();
        JSONArray cats = new JSONArray();
        post.getCats().forEach(item -> {
            cats.add(item.getName());
        });

        block.setName("info");
        block.setLabel("基本信息");
        block.setLabelShort("信息");
        JSONObject value = new JSONObject();
        value.put("address", post.getAddress());
        value.put("post_title", post.getTitle());
        value.put("post_id", post.getId());
        value.put("longitude", post.getLongitude());
        value.put("latitude", post.getLatitude());
        value.put("area_info", postItemVo.getAreaInfo());
        value.put("average_price_info", postItemVo.getAveragePriceInfo());
        value.put("total_price_info", postItemVo.getTotalPriceInfo());
        value.put("cats", cats);
        value.put("more_url", "/pkgPost/pages/desc/index?post_id=" + post.getId());
        value.put("point_title",post.getPointTitle());

        block.setValue(value);
        return block;
    }

    // 户型列表
    private PostBlockVo getTypesBlock(Post post){
        PostBlockVo block = new PostBlockVo();
        List<PostType> types = postTypeRepository.findAllByPostIdOrderByNumber(post.getId());
        if(types.size() == 0){
            block.setShow(false);
            return block;
        }

        block.setName("types");
        block.setLabel("户型介绍");
        block.setLabelShort("户型");
        JSONObject value = new JSONObject();
        value.put("more_url", "/pkgPost/pages/type/index?id=" + post.getId());
        value.put("more_title", "查看全部户型");
        value.put("post_id", post.getId());
        value.put("items", types);
        block.setValue(value);
        return block;
    }

    private PostBlockVo getReviewBlock(Post post){
        PostBlockVo block = new PostBlockVo();
        if (!post.getReviewEnable()) {
            block.setShow(false);
            return block;
        }
        block.setName("pingce");
        block.setLabel("楼盘评分");
        block.setLabelShort("评分");
        JSONObject value = new JSONObject();
        value.put("postId",post.getId());
        List<PostReview> postIdOrderById = postReviewRepository.findAllByPostIdOrderById(post.getId());
        if (postIdOrderById.size() == 0){
            block.setShow(false);
            return block;
        }
        List<AdminPostReviewListVo> list = postIdOrderById.stream().map(postReview -> {
            AdminPostReviewListVo map = modelMapper.map(postReview, AdminPostReviewListVo.class);
            return map;
        }).collect(Collectors.toList());
        value.put("pingceList",list);
//        value.put()
        block.setValue(value);
        return block;
    }

    //获取推荐房源模块
    private PostBlockVo getRecomsBlock(Post post){
        PostBlockVo block = new PostBlockVo();
        block.setName("recoms");
        block.setLabel("推荐房源");
        block.setLabelShort("推荐");
        JSONObject value = new JSONObject();
        List<Post> recomPostList = postService.getRecomPostList(post.getId());
        if (recomPostList.size() == 0){
            block.setShow(false);
            return block;
        }
        value.put("items", recomPostList.stream().map(item -> {
            PostItemForListingVo map = modelMapper.map(item, PostItemForListingVo.class);
            //判断楼盘是否有视频或vr，用于小程显示icon
            List<PostBanner> postBannerList = postBannerRepository.findAllByPostIdOrderByNumberAsc(item.getId());
            postBannerList.stream().forEach(postBanner -> {
                String cat = postBanner.getCat();
                if(("video").equals(cat)){
                    map.setHasVideo(true);
                }
                if(("vr").equals(cat)) {
                    map.setHasVr(true);
                }
            });
            return map;
        }).collect(java.util.stream.Collectors.toList()));
        value.put("title", "推荐房源");
        block.setValue(value);
        return block;
    }

    private PostBlockVo getQasBlock(Post post){
        PostBlockVo block = new PostBlockVo();
        block.setName("qas");
        block.setLabel("楼盘问答");
        block.setLabelShort("问答");
        JSONObject value = new JSONObject();
        List<Question> questionList = questionRepository.findByTargetIdAndTargetTypeAndIsPublicIsTrue(post.getId(), "post");

        value.put("title","买房问大家("+questionList.size()+")");

        List<Question> shortQuestionList;
        if(questionList.size()>2){
            shortQuestionList = questionList.subList(0, 2);
        } else {
            shortQuestionList = questionList;
        }

        List<PostQasListingVo> collect = shortQuestionList.stream().map(question -> {
            PostQasListingVo map = modelMapper.map(question, PostQasListingVo.class);
            //此处要判断用户是置业顾问还是普通用户
            List<Answer> collect1 = map.getAnswers().stream().map(answer -> {
                BrokerProfile byUserId = brokerProfileService.isBrokerOrNo(answer.getUserId());
                if (byUserId != null) {// 置业顾问
                    User map1 = modelMapper.map(byUserId, User.class);
                    answer.setUser(map1);
                }
                return answer;
            }).collect(Collectors.toList());
            map.setAnswers(collect1);
            return map;
        }).collect(Collectors.toList());
        value.put("items",collect);
        value.put("max_count",shortQuestionList.size());
        value.put("more_title","查看全部");
        value.put("more_url","/pkgQa/pages/qa/index?target_id="+post.getId()+"&target_type=post");
        value.put("post_id",post.getId());
        value.put("total_count",questionList.size());
        block.setValue(value);
        return block;
    }
}
