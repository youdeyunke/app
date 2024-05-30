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
import com.udeve.repository.*;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class WeappPathService {

    @Autowired
    private AlbumRepository albumRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private NewRepository newRepository;
    @Autowired
    private NewCatRepository newCatRepository;
    @Autowired
    private VideoRepository videoRepository;
    @Autowired
    private HouseRepository houseRepository;
    @Autowired
    ModelMapper modelMapper;


    public JsonResponse getPathList(){

        List<JSONObject> list = getIndexPaths();
        list.addAll(getAlbumPaths());
        list.addAll(getPostPaths());
        list.addAll(getNewPaths());
        list.addAll(getVideoPaths());
        list.addAll(getHousePaths());
        return JsonResponse.ok(list);

    }


    private List<JSONObject> getHousePaths(){
        List<JSONObject> list = new ArrayList<>();
        list.add(new JSONObject(){{
            put("value","/pkgErshou/pages/index");
            put("name","二手房源列表");
            put("opentype","navigateTo");
        }});
        houseRepository.findAllByIsDeleteFalseAndIsPublicTrue().forEach(house -> {
            list.add(new JSONObject(){{
                put("value","pkgErshou/pages/show?id="+house.getId());
                put("name","二手房源："+house.getTitle());
                put("opentype","navigateTo");
            }});
        });
        return list;
    }


    private List<JSONObject> getVideoPaths(){
        List<JSONObject> list = new ArrayList<>();
        list.add(new JSONObject(){{
            put("value","/pkgVideo/pages/video/index");
            put("name","视频列表");
            put("opentype","navigateTo");
        }});
        videoRepository.findAll().forEach(video -> {
            list.add(new JSONObject(){{
                put("value","/pkgVideo/pages/show/index?id="+video.getId());
                put("name","视频："+video.getTitle());
                put("opentype","navigateTo");
            }});
        });
        return list;
    }

    private List<JSONObject> getAlbumPaths(){
        List<JSONObject> list = new ArrayList<>();
        albumRepository.findAll().forEach(album -> {
            list.add(new JSONObject() {{
                put("value", "/pkgPost/pages/index/index?album_id=" + album.getId());
                put("name", album.getName());
                put("opentype", "navigateTo");
            }});
        });
        return list;
    }

    private List<JSONObject> getPostPaths(){
        List<JSONObject> list = new ArrayList<>();
        postRepository.findAll().forEach(post -> {
            list.add(new JSONObject() {{
                put("value", "/pkgPost/pages/show/index?id=" + post.getId());
                put("name", post.getTitle());
                put("opentype", "navigateTo");
            }});
        });
        return list;
    }

    private List<JSONObject> getNewPaths(){
        List<JSONObject> list = new ArrayList<>();
        newRepository.findAll().forEach(news -> {
            list.add(new JSONObject() {{
                put("value", "/pkgNews/pages/news/show?id=" + news.getId());
                put("name", news.getTitle());
                put("opentype", "navigateTo");
            }});
        });
        newCatRepository.findAll().forEach(newCat -> {
            String name = "分类" + newCat.getName() + "下的资讯列表";
            list.add(new JSONObject() {{
                put("value", "/pkgNews/pages/news/index?cat_id=" + newCat.getId());
                put("name", name);
                put("opentype", "navigateTo");
            }});
        });
        return list;
    }

    private List<JSONObject> getIndexPaths(){
        List<JSONObject> list = new ArrayList<>();
        list.add(new JSONObject() {{
            put("value", "/pkgPost/pages/index/index");
            put("name", "全部楼盘列表");
            put("opentype", "navigateTo");
        }});

        list.add(new JSONObject() {{
            put("value", "/pkgMyself/pages/favposts/index");
            put("name", "我的收藏");
            put("opentype", "navigateTo");
        }});
        list.add(new JSONObject() {{
            put("value", "/pkgMyself/pages/qa/index");
            put("name", "我的问答");
            put("opentype", "navigateTo");
        }});
        list.add(new JSONObject() {{
            put("value", "/pkgMyself/pages/booking/index");
            put("name", "我的预约");
            put("opentype", "navigateTo");
        }});
        list.add(new JSONObject(){{
            put("value","/pkgMyself/pages/eventposts/index");
            put("name", "我的订阅");
            put("opentype", "navigateTo");
        }});
        list.add(new JSONObject() {{
            put("value", "/pkgMyself/pages/history/index");
            put("name", "浏览历史");
            put("opentype", "navigateTo");
        }});
        list.add(new JSONObject() {{
            put("value", "/pkgBroker/pages/broker/join?group_value=broker");
            put("name", "顾问入驻");
            put("opentype", "navigateTo");
        }});
        list.add(new JSONObject() {{
            put("value", "/pkgBroker/pages/broker/index");
            put("name", "顾问列表页");
            put("opentype", "navigateTo");
        }});
        list.add(new JSONObject() {{
            put("value", "/pkgNews/pages/news/index");
            put("name", "头条列表");
            put("opentype", "navigateTo");
        }});
        list.add(new JSONObject() {{
            put("value", "/pkgJisuanqi/pages/daikuan/index");
            put("name", "房贷计算器");
            put("opentype", "navigateTo");
        }});
        list.add(new JSONObject() {{
            put("value", "/pkgMap/pages/map/index");
            put("name", "地图找房页面");
            put("opentype", "navigateTo");
        }});
        list.add(new JSONObject() {{
            put("value", "/pkgSearch/pages/search/index");
            put("name", "搜索页面");
            put("opentype", "navigateTo");
        }});
        list.add(new JSONObject() {{
            put("value", "/pkgAbout/pages/about/index");
            put("name", "关于我们");
            put("opentype", "navigateTo");
        }});
        list.add(new JSONObject() {{
            put("value", "/pages/want/index");
            put("name", "帮我找房");
            put("opentype", "navigateTo");
        }});

        list.add(new JSONObject(){{
            put("value","/pkgErshou/pages/create");
            put("name", "我要卖房");
            put("opentype", "navigateTo");
        }});

        list.add(new JSONObject(){{
            put("value","/pkgErshou/pages/index?business=出租");
            put("name", "二手房出租");
            put("opentype", "navigateTo");
        }});

        list.add(new JSONObject(){{
            put("value","/pkgErshou/pages/index?business=出售");
            put("name", "二手房出售");
            put("opentype", "navigateTo");
        }});

        list.add(new JSONObject(){{
            put("value","/pkgMap/pages/ershouMap/index");
            put("name", "二手房地图找房");
            put("opentype", "navigateTo");
        }});



        return list;
    }
}
