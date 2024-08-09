package com.udeve.controllers.api;
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
import com.udeve.entity.Album;
import com.udeve.entity.Post;
import com.udeve.entity.PostBanner;
import com.udeve.repository.AlbumPostRepository;
import com.udeve.repository.AlbumRepository;
import com.udeve.repository.PostBannerRepository;
import com.udeve.repository.PostRepository;
import com.udeve.request.PostQueryRequest;
import com.udeve.service.PostDetailPageService;
import com.udeve.service.PostService;
import com.udeve.service.PosterTemplateService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.PostItemForListingVo;
import com.udeve.vo.WeappAlbumDetailVo;
import io.swagger.v3.oas.annotations.Operation;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.udeve.BaseApiController;
import java.util.List;
import java.util.Map;

@RestController
public class PostController extends BaseApiController {
    @Autowired
    PostService postService;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    PostDetailPageService postDetailPageService;
    @Autowired
    AlbumRepository albumRepository;
    @Autowired
    AlbumPostRepository albumPostRepository;
    @Autowired
    PosterTemplateService posterTemplateService;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    PostBannerRepository postBannerRepository;

    // 楼盘列表接口
    @GetMapping(value = "/v6/posts")
    public JsonResponse Index(@RequestParam Map<String, Object> query) {
        JSONObject queryJson = new JSONObject(query);
        PostQueryRequest queryDto = JSONObject.parseObject(queryJson.toString(), PostQueryRequest.class);
        queryDto.setScope("public"); // 注意这里，对小程序端只需要拉取上架的房源
        return postService.getListingForApi(queryDto);
    }

    // 查询楼盘详情接口
    @GetMapping(value = "/v6/posts/{postId}")
    public JsonResponse show(@PathVariable("postId") Integer postId) {
        return postDetailPageService.getPostDetailPageData(postId);
    }

    @GetMapping(value = "/v6/post_banner_info/{postId}")
    public JsonResponse getPostBannerInfo(@PathVariable("postId") Integer postId) {
        return postDetailPageService.getPostBannerInfo(postId);
    }

    @GetMapping(value = "/v6/post_detail/{postId}")
    public JsonResponse getPostDetail(@PathVariable("postId") Integer postId) {
        return postDetailPageService.getPostDetail(postId);
    }

    //楼盘基本信息接口
    @GetMapping(value = "/v6/post_base_info/{postId}")
    public JsonResponse showBaseInfo(@PathVariable("postId") Integer postId) {
        Post post = postRepository.findById(postId).orElse(null);
        if(post==null){
            return JsonResponse.error("楼盘不存在");
        }
        PostItemForListingVo info = modelMapper.map(post, PostItemForListingVo.class);

        //判断楼盘是否有视频或vr，用于小程显示icon
        List<PostBanner> postBannerList = postBannerRepository.findAllByPostIdOrderByNumberAsc(post.getId());
        postBannerList.forEach(postBanner -> {
            String cat = postBanner.getCat();
            if(("video").equals(cat)){
                info.setHasVideo(true);
            }
            if (("vr").equals(cat)) {
                info.setHasVr(true);
            }
        });

        info.setViews(post.getViewNums());
        return JsonResponse.ok(info);
    }

    @GetMapping(value = "/v6/albums/{id}")
    public JsonResponse getAlbumDetail(@PathVariable("id") Integer id){
        Album album = albumRepository.findById(id).orElse(null);
        if(album==null){
            return JsonResponse.error("数据不存在");
        }
        WeappAlbumDetailVo map = modelMapper.map(album, WeappAlbumDetailVo.class);
        map.setPostCount(albumPostRepository.countByAlbumId(id));
        return JsonResponse.ok(map);
    }

    @Operation(summary = "获取海报背景模板图片列表")
    @GetMapping(value = "/v6/poster_templates")
    public JsonResponse gettPosterList(){
        return posterTemplateService.getPosterTemplateList();
    }
}
