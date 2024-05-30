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


import cn.dev33.satoken.annotation.SaCheckLogin;
import com.udeve.vo.FileInfo;
import com.udeve.service.UploadService;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.udeve.BaseApiController;

@RestController
@SaCheckLogin
@Slf4j
public class UploadController extends BaseApiController {
    @Autowired
    UploadService uploadService;


    @PostMapping(value="/v6/upload")
    public JsonResponse Upload(MultipartFile file){
        FileInfo upload = uploadService.Upload(file);
        if (upload == null){
            return JsonResponse.error("请先设置存储平台");
        }
        return JsonResponse.ok(upload);
    }
}
