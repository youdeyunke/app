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

import com.udeve.utils.file.UploadFileUtil;
import com.udeve.vo.FileInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;

@Service
@Slf4j
public class UploadService {


    //获得存储平台 List


    public FileInfo Upload(MultipartFile file){
        //没域名，传空字符串，方法内不拼接，返回与IP拼接的url
        return UploadFileUtil.uploadLocal(file,"");

    }
    public FileInfo Upload(File file){
        MockMultipartFile mockMultipartFile;
        try {
            mockMultipartFile = new MockMultipartFile(file.getName(),file.getName(),Files.probeContentType(file.toPath()), new FileInputStream(file.getAbsolutePath()));
        } catch (IOException e) {
            throw new RuntimeException(e.getMessage());
        }
        //没域名，传空字符串，方法内不拼接，返回与IP拼接的url
        return UploadFileUtil.uploadLocal(mockMultipartFile,"");

    }

}
