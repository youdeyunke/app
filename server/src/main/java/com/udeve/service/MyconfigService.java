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
import cn.binarywang.wx.miniapp.config.impl.WxMaDefaultConfigImpl;
import cn.hutool.core.util.ObjectUtil;
import com.udeve.vo.FileInfo;
import com.udeve.request.*;
import com.udeve.vo.MyconfigForWeappVo;
import com.udeve.entity.MyEnumeration;
import com.udeve.entity.Myconfig;
import com.udeve.repository.*;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.common.error.WxErrorException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import com.alibaba.fastjson.JSONObject;
import org.springframework.web.client.RestTemplate;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@Slf4j
public class MyconfigService {

    @Value("${sa-token.jwt-secret-key}")
    private String saTokenJwtSecretKey;

    @Autowired
    MyconfigRepository myconfigRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    MyEnumerationRepository myEnumerationRepository;

    @Autowired
    UserRepository userRepository;

    @Lazy
    @Autowired
    AsyncService asyncService;

    @Autowired
    AdminLogService adminLogService;

    @Autowired
    StringRedisTemplate stringRedisTemplate;

    @Autowired
    RestTemplate restTemplate;

    @Lazy
    @Autowired
    WxMaService wxMaService;

    @Autowired
    UploadService uploadService;

    public List<MyEnumeration> getEnumList(String cat){
        return  myEnumerationRepository.findByCatAndIsDeleteFalseOrderByNumberDesc(cat);
    }

    public Myconfig get(){
        return  myconfigRepository.findFirstByOrderByIdDesc();
    }

    public String  getAppId(){
        if (this.get() == null) {
            return "";
        }
        return this.get().getXcxAppId().trim();
    }

    public String getMsgTplId(){
        if(this.get() == null) {
            return "";
        }
        return this.get().getMsgTplId();
    }

    public String getAppSecret(){
        if (this.get() == null) {
            return "";
        }
        return this.get().getXcxSecret();
    }



    public String getSecret() {
        if (this.get() == null) {
            return "";
        }
        return this.get().getXcxSecret();
    }

    public MyconfigForWeappVo getWeappConfig(){
        Myconfig config = this.get();
        MyconfigForWeappVo data = modelMapper.map(config, MyconfigForWeappVo.class);
        data.setTextBanner(this.getTextBanner());
        JSONObject colorJo = new JSONObject();
        colorJo.put("primary_btn","#1d5de2");
        colorJo.put("primary","#ff8c00");
        data.setColor(colorJo);
        return data;
    }

    public String getTextBanner() {
        InputStream inputStream = getClass().getResourceAsStream("/banner.txt");
        return new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8)).lines().collect(Collectors.joining("\n"));
    }

    public String getJwtSecretKey() {
        if (this.saTokenJwtSecretKey==null) {
            return "A1B2C3D4E5F6G7H8";
        }
        return this.saTokenJwtSecretKey;
    }

    // 腾讯地图key
    public String getLbsKey() {
        Myconfig config = this.get();
        return config == null ? "" : config.getQqMapKey();
    }

    //新
    public JsonResponse updateContactInfo(AdminMyconfigUpdateContactInfoRequest request){
        Myconfig myconfig = myconfigRepository.findFirstByOrderByIdDesc();
        modelMapper.map(request,myconfig);
        myconfigRepository.saveAndFlush(myconfig);
        return JsonResponse.ok("保存成功");
    }

    public JsonResponse updateAdminServerInfo(AdminMyconfigUpdateServerInfoRequest configServerInfo){
        if(("").equals(configServerInfo.getUploadAllowedExtension()) || configServerInfo.getUploadAllowedExtension()==null){
            return JsonResponse.error("允许上传文件类型不能为空");
        }
        Myconfig myconfig = myconfigRepository.findFirstByOrderByIdDesc();
        //防止中文逗号导致程序错误，以及全部转为小写
        String replaceAll = configServerInfo.getUploadAllowedExtension().replaceAll("，", ",");
        String lowerCase = replaceAll.toLowerCase();
        configServerInfo.setUploadAllowedExtension(lowerCase);
        modelMapper.map(configServerInfo,myconfig);
        myconfigRepository.saveAndFlush(myconfig);
        return JsonResponse.ok("保存成功");
    }


    public JsonResponse weappConfig(AdminWeappConfigRequest request){

        Myconfig myconfig = myconfigRepository.findFirstByOrderByIdDesc();
        if (myconfig==null){
            return JsonResponse.error("未找到配置信息");
        }

        if (ObjectUtil.isNotEmpty(request.getXcxAppId()) && ObjectUtil.isNotEmpty(request.getXcxSecret())){
            // 修改了appid和secret
            // 重新初始化微信小程序服务
            WxMaDefaultConfigImpl oldConfig = (WxMaDefaultConfigImpl) wxMaService.getWxMaConfig();
            wxMaService.removeConfig(oldConfig.getAppid());
            WxMaDefaultConfigImpl config = new WxMaDefaultConfigImpl();
            config.setAppid(request.getXcxAppId());
            config.setSecret(request.getXcxSecret());
            wxMaService.setWxMaConfig(config);
            log.info("重新初始化小程序服务完成。appid:{}", request.getXcxAppId());
        }

        //调用微信接口生成二维码
        WxMaQrcodeService qrcodeService = wxMaService.getQrcodeService();
        File wxaCode;
        try {
             wxaCode = qrcodeService.createWxaCode("/pages/home/home", 430);
        } catch (WxErrorException e) {
            log.warn("小程序二维码生成失败，请检查小程序配置参数是否正确：{}", e.getMessage());
            // 以下是获取微信返回的错误码
            int startIndex = e.getMessage().indexOf("{");
            int endIndex = e.getMessage().indexOf("}");
            JSONObject jsonObject = JSONObject.parseObject(e.getMessage().substring(startIndex,endIndex+1));
            Object errCode = jsonObject.get("errcode");
            return JsonResponse.error("("+errCode+")，小程序appId或appSecret错误，请检查！");
        }

        //上传小程序二维码
        FileInfo upload;
        try {
             upload = uploadService.Upload(wxaCode);
        }catch (Exception e){
            log.warn("小程序二维码上传失败，存储设置是否正确：{}", e.getMessage());
            return JsonResponse.error("小程序二维码上传失败，请检查存储设置是否正确！");
        }

        // 成功 保存信息
        myconfig.setXcxName(request.getXcxName());
        myconfig.setXcxAppId(request.getXcxAppId());
        myconfig.setXcxSecret(request.getXcxSecret());
        myconfig.setXcxQr(upload.getUrl());
        myconfig.setWeappInit(true);
        myconfig.setMsgTplId(request.getMsgTplId());
        myconfigRepository.saveAndFlush(myconfig);

        return JsonResponse.ok("保存成功！");
    }

    public JsonResponse updateMapInfo(AdminMyconfigUpdateMapRequest configMapInfo){
        Myconfig myconfig = myconfigRepository.findFirstByOrderByIdDesc();
        modelMapper.map(configMapInfo,myconfig);
        myconfigRepository.saveAndFlush(myconfig);
        return JsonResponse.ok("保存成功");
    }

    public JsonResponse updateCopyright(AdminMyconfigUpdateCopyrightRequest copyrightRequest){
        Myconfig myconfig = myconfigRepository.findFirstByOrderByIdDesc();
        modelMapper.map(copyrightRequest,myconfig);
        myconfig.setUpdatedAt(LocalDateTime.now());
        if(myconfig.getCompanyName()==null || myconfig.getCompanyName().isEmpty()){
            return JsonResponse.error("更新版权文字失败");
        }
        if(myconfig.getLogo()==null || myconfig.getLogo().isEmpty()){
            return JsonResponse.error("更新logo失败");
        }
        myconfigRepository.saveAndFlush(myconfig);
        JSONObject res = new JSONObject();
        res.put("company_name",myconfig.getCompanyName());
        res.put("logo",myconfig.getLogo());
        return JsonResponse.ok(res,"更新成功");

    }

}
