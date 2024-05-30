package com.udeve.controllers.admin;
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
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import cn.hutool.core.util.ObjectUtil;
import com.alibaba.fastjson.JSONObject;
import com.udeve.request.*;
import com.udeve.entity.NewCat;
import com.udeve.repository.NewCatRepository;
import com.udeve.service.NewCatService;
import com.udeve.service.NewService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminNewCatListVo;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@SaCheckLogin
@Api(tags = "文章管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminNewController extends BaseApiController {

    @Autowired
    NewService newService;
    @Autowired
    NewCatService newCatService;
    @Autowired
    private NewCatRepository newCatRepository;
    @Autowired
    ModelMapper modelMapper;

    @Operation(summary = "拉取文章列表", description = "用于拉取文章列表")
    @GetMapping(value = "/admin6/news")
    public JsonResponse getNewsList(@RequestParam Map<String, Object> query){
        JSONObject queryJson = new JSONObject(query);
        NewQueryRequest queryDto = JSONObject.parseObject(queryJson.toString(), NewQueryRequest.class);
        return newService.getNewsList(queryDto);
    }

    @Operation(summary = "更新文章", description = "用于更新文章")
    @PatchMapping(value = "/admin6/news/{id}")
    @SaCheckPermission("update_news")
    public JsonResponse updateNews(@Validated @RequestBody AdminNewUpdateRequest anew,@PathVariable("id") Integer id){
        LocalDate now = LocalDate.now();
        // 当 文章发布时间大于 当前时间 并且 发布状态为【公开】时
        if (now.isBefore(anew.getDate()) && anew.getIsPublic()) {
            return JsonResponse.error("发布日期不能选择未来时间！");
        }
        return newService.updateNews(id,anew);
    }

    @Operation(summary = "新建文章", description = "用于新建文章")
    @PostMapping(value = "/admin6/news/")
    @SaCheckPermission("create_news")
    public JsonResponse createNew(@Validated @RequestBody AdminNewCreateRequest anew){
        LocalDate now = LocalDate.now();
        // 当 文章发布时间大于 当前时间 并且 发布状态为【公开】时
        if (now.isBefore(anew.getDate()) && anew.getIsPublic()) {
            return JsonResponse.error("发布日期不能选择未来时间！");
        }
        return newService.createNews(anew);
    }

    @Operation(summary = "删除文章", description = "用于删除文章")
    @DeleteMapping(value = "/admin6/news/{id}")
    @SaCheckPermission("delete_news")
    public JsonResponse deleteNew(@PathVariable("id") Integer id){
        return newService.deleteNew(id);
    }

    @Operation(summary = "拉取文章分类列表", description = "用于拉取文章分类列表")
    @GetMapping(value = "/admin6/news_cats")
    public JsonResponse<List<AdminNewCatListVo>> getNewCatList(){
        return newCatService.getNewsCatList();
    }

    @Operation(summary = "更新文章分类", description = "用于更新文章分类")
    @PatchMapping(value = "/admin6/news_cats/{id}")
    @SaCheckPermission("news_cats")
    public JsonResponse updateNewCat(@Validated @RequestBody AdminNewCatUpdateRequest newCat, @PathVariable("id") Integer id){
        NewCat map = newCatRepository.findById(id).get();
        modelMapper.map(newCat, map);
        newCatRepository.saveAndFlush(map);
        return JsonResponse.ok("保存成功");
    }

    @Operation(summary = "新建文章分类", description = "用于新建文章分类")
    @PostMapping(value = "/admin6/news_cats/")
    @SaCheckPermission("news_cats")
    public JsonResponse createNewCat(@Validated @RequestBody AdminNewCatCreateRequest newCat){
        NewCat map = modelMapper.map(newCat, NewCat.class);
        newCatRepository.saveAndFlush(map);
        return JsonResponse.ok("新建成功");
    }

    @Operation(summary = "删除文章分类", description = "用于删除文章分类")
    @DeleteMapping(value = "/admin6/news_cats/{id}")
    @SaCheckPermission("news_cats")
    public JsonResponse deleteNewCat(@PathVariable("id") Integer id){
        return newCatService.deleteNewCat(id);
    }
}
