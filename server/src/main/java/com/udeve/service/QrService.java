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
import com.udeve.vo.FileInfo;
import com.alibaba.fastjson.JSONObject;
import com.udeve.entity.Qr;
import com.udeve.repository.QrRepository;
import com.udeve.request.AdminQrCreateRequest;
import com.udeve.request.AdminQrUpdateRequest;
import com.udeve.request.WeappQrCreateRequest;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminQrListVo;
import com.udeve.vo.WeappQrDetailVo;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.common.error.WxErrorException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.File;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class QrService {

    @Autowired
    private QrRepository qrRepository;
    @Autowired
    WxMaService wxMaService;
    @Autowired
    UploadService uploadService;
    @Autowired
    ModelMapper modelMapper;

    public JsonResponse getQrList() {
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        List<Qr> all = qrRepository.findAll(sort);
        List<AdminQrListVo> list = all.stream().map(qr -> {
            AdminQrListVo adminQrVo = modelMapper.map(qr, AdminQrListVo.class);
            return adminQrVo;
        }).collect(Collectors.toList());
        return JsonResponse.ok(list);
    }

    public JsonResponse updateQr(Integer id,AdminQrUpdateRequest updateRequest){
        Qr qr = qrRepository.findById(id).orElse(null);
        if (qr == null){
            return JsonResponse.error("数据不存在");
        }
        modelMapper.map(updateRequest,qr);
        qr.setUpdatedAt(LocalDateTime.now());
        qrRepository.saveAndFlush(qr);
        return JsonResponse.ok("更新成功");
    }

    public JsonResponse createQr(AdminQrCreateRequest createRequest){
        Qr qr = modelMapper.map(createRequest, Qr.class);

        qr.setCreatedAt(LocalDateTime.now());
        qr.setUpdatedAt(LocalDateTime.now());
        qrRepository.saveAndFlush(qr);
        genQrUrl(qr);
        return JsonResponse.ok("创建成功");
    }

    @Async
    public void  genQrUrl(Qr qr){
        WxMaQrcodeService qrcodeService = wxMaService.getQrcodeService();
        File qrcode = null;
        try {
            qrcode = qrcodeService.createWxaCode(qr.getPath(), 430);
        } catch (WxErrorException e) {
            throw new RuntimeException(e);
        }
        FileInfo upload = uploadService.Upload(qrcode);
        qr.setUrl(upload.getUrl());
        qr.setUpdatedAt(LocalDateTime.now());
        qrRepository.saveAndFlush(qr);
    }

    public JsonResponse deleteQr(Integer id){
        qrRepository.deleteById(id);
        return JsonResponse.ok("删除成功");
    }

    public JsonResponse weappGetQrDetail(Integer id){
        Qr qr = qrRepository.findById(id).orElse(null);
        if (qr == null){
            return JsonResponse.error("数据不存在");
        }
        WeappQrDetailVo map = modelMapper.map(qr, WeappQrDetailVo.class);
        map.setData(JSONObject.parseObject(qr.getData()));

        return JsonResponse.ok(map);
    }

    public JsonResponse weappCreateQr(WeappQrCreateRequest request){
        Qr qr = modelMapper.map(request, Qr.class);
        qr.setCreatedAt(LocalDateTime.now());
        qr.setUpdatedAt(LocalDateTime.now());
        qr.setData(request.getQrData());
        qr.setTitle("未知");
        qr.setViewNums(0);
        qrRepository.saveAndFlush(qr);
        qr.setPath("/pages/qr/show?id=" + qr.getId());
        genQrUrl(qr);
        qr.setPath(request.getPath());
        qrRepository.saveAndFlush(qr);
        return JsonResponse.ok(qr);
    }

}
