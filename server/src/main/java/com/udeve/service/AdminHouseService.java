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
import com.udeve.request.*;
import com.udeve.entity.*;
import com.udeve.repository.*;
import com.udeve.utils.JsonResponse;
import com.udeve.utils.lbs.LbsPlace;
import com.udeve.utils.lbs.LbsPoiRequest;
import com.udeve.utils.lbs.LbsPoiResponse;
import com.udeve.utils.lbs.LbsUtil;
import com.udeve.vo.HouseDetailVo;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.common.error.WxErrorException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.io.File;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
@Slf4j
public class AdminHouseService {
    @Autowired
    private DistrictRepository districtRepository;
    @Autowired
    AdminLogService adminLogService;
    @Autowired
    HouseRepository houseRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    HouseService houseService;
    @Autowired
    MyconfigService myconfigService;
    @Autowired
    WxMaService wxMaService;
    @Autowired
    UploadService uploadService;
    @Autowired
    PermissionItemRepository permissionItemRepository;


    // 管理员更新房源信息
    public JsonResponse update(AdminHouseUpdateRequest dto, Integer userId) {
        House house = houseRepository.findById(dto.getId()).orElseThrow(() -> new RuntimeException("房源ID未找到"));
        modelMapper.map(dto, house);
        house.setSubDistrictName(dto.getSubDistrictName());

        if (dto.getDistrictId() != null) {
            DistrictEntity district = districtRepository.findById(dto.getDistrictId()).orElse(null);
            if (district == null){
                return JsonResponse.error("区域未找到");
            }
            house.setDistrict(district);
            house.setCity(district.getCity());
        }

        house.setUpdatedAt(LocalDateTime.now());
        house.setIsPublic("已发布".equals(dto.getPublishStatus()));
        houseRepository.saveAndFlush(house);

        adminLogService.createAdminLog(userId, "二手房管理", "更新房源，名称：" + house.getTitle() + "，ID：" + house.getId());
        return JsonResponse.ok(house);
    }

    public JsonResponse updateInfo(Integer id, AdminHouseUpdateInfoRequest request,Integer userId){
        House house = houseRepository.findById(id).orElse(null);
        if (house == null){
            return JsonResponse.error("房源未找到");
        }
        modelMapper.map(request,house);
        house.setUpdatedAt(LocalDateTime.now());
        houseRepository.saveAndFlush(house);
        adminLogService.createAdminLog(userId, "二手房管理", "更新房源，名称：" + house.getTitle() + "，ID：" + house.getId());
        return JsonResponse.ok(house);

    }

    @Transactional
    public JsonResponse create(AdminHouseCreateRequest dto, Integer userId) {
        House house = modelMapper.map(dto, House.class);

        //根据传来的区域id查询到该区域，设置二手房的区域和城市
        DistrictEntity district = districtRepository.findById(dto.getDistrictId()).orElse(null);
        if (district == null){
            return JsonResponse.error("区域未找到");
        }
        house.setCity(district.getCity());
        house.setDistrict(district);
        house.setSubDistrictName(dto.getSubDistrictName());
        house.setPublishStatus("审核中");
        house.setIsPublic(false);
        house.setIsDelete(false);
        house.setIsTop(false);
        house.setViewNums(0);
        house.setFavNums(0);
        house.setCreatedAt(LocalDateTime.now());
        house.setUpdatedAt(LocalDateTime.now());
        //出售
        if (("出售").equals(house.getBusiness())) {
            house.setPriceLabel("总价");
            house.setPriceUnit("万元");
        } else {
            //出租
            house.setPriceLabel("租金");
            house.setPriceUnit("元/月");
        }
        houseRepository.saveAndFlush(house);

        //生成二维码
        try {
            genHouseQr(house.getId());
        } catch (WxErrorException e) {
            log.error("创建二手房：生成二维码失败");
        }

        adminLogService.createAdminLog(userId, "二手房管理", "创建房源，名称：" + house.getTitle() + "，ID：" + house.getId());
        HouseDetailVo map = modelMapper.map(house, HouseDetailVo.class);
        // 设置详情页url
        HouseDetailVo houseDetailVo = this.setDetailUrl(map, house.getId());
        return JsonResponse.ok(houseDetailVo);
    }

    // 设置二手房创建后set详情页
    private HouseDetailVo setDetailUrl(HouseDetailVo map,Integer houseId){
        PermissionItem byComponentPath = permissionItemRepository.findByComponentPath("oldUpdate/index");
        PermissionItem permissionItem = permissionItemRepository.findById(byComponentPath.getFatherId()).orElse(null);
        if (permissionItem == null){
            log.error("二手房详情页设置异常");
            return map;
        }
        String url = permissionItem.getPath() + "/" + byComponentPath.getPath();
        url = url.replace(":id", "");
        String finalUrl = url;
        map.setUrl(finalUrl + houseId);
        return map;
    }


    public JsonResponse updateStatus(Integer id, String publishStatus, Integer userId) {
        House house = houseRepository.findById(id).orElse(null);
        if (house == null){
            return JsonResponse.error("房源未找到");
        }
        house.setPublishStatus(publishStatus);
        house.setIsPublic("已发布".equals(publishStatus));
        house.setUpdatedAt(LocalDateTime.now());
        houseRepository.saveAndFlush(house);
        adminLogService.createAdminLog(userId, "二手房管理", "更新房源状态，名称：" + house.getTitle() + "，ID：" + house.getId());
        return JsonResponse.ok(house);
    }


    // 管理后台编辑楼盘信息时候需要拉取的数据
    public JsonResponse show(Integer id) {
        House house = houseRepository.findById(id).orElse(null);
        if (house == null){
            return JsonResponse.error("房源未找到");
        }
        return JsonResponse.ok(house);
    }

    public JsonResponse index(HouseSearchRequest queryDto) {
        queryDto.setScope("all");
        return houseService.getHouseListAdmin(queryDto);
    }

    public JsonResponse destroy(Integer id, Integer userId) {
        Optional<House> optionalHouse = houseRepository.findById(id);
        if (optionalHouse.isEmpty()) {
            return JsonResponse.error("房源不存在！");
        }
        House house = optionalHouse.get();
        house.setIsDelete(true);
        house.setUpdatedAt(LocalDateTime.now());
        houseRepository.save(house);
        adminLogService.createAdminLog(userId, "二手房管理", "删除房源，名称：" + house.getTitle() + "，ID：" + house.getId());
        return JsonResponse.ok("ok");
    }

    public JsonResponse getPoi(AdminPoiRequest adminPoiRequest) {
        String lbsKey = myconfigService.getLbsKey();
        if (lbsKey == null || lbsKey.isEmpty()) {
            return JsonResponse.error("请先配置腾讯地图key");
        }
        LbsUtil lbsUtil = new LbsUtil(lbsKey);
        LbsPoiRequest lbsPoiRequest = new LbsPoiRequest();
        lbsPoiRequest.setKeyword(adminPoiRequest.getKeyword());
        lbsPoiRequest.setFilter(adminPoiRequest.getFilter());
        lbsPoiRequest.setAddress_format(adminPoiRequest.getAddress_format());
        LbsPoiResponse poi = lbsUtil.poi(lbsPoiRequest);
        if (poi.getStatus() != 0) {
            log.error("invoke api fail！reason:{}",poi.getMessage());
            return JsonResponse.ok(poi.getMessage());
        }
        List<LbsPlace> result = poi.getResult();
        return JsonResponse.ok(result);
    }

    @Async
    public void genHouseQr(Integer houseId) throws WxErrorException {
        House house = houseRepository.findById(houseId).orElse(null);
        if (house == null ) {
            return;
        }
        WxMaQrcodeService qrcodeService = wxMaService.getQrcodeService();
        File wxaCode = qrcodeService.createWxaCode("/pkgErshou/pages/show?id=" + houseId, 430);
        FileInfo upload = uploadService.Upload(wxaCode);
        house.setQr(upload.getUrl());
        houseRepository.saveAndFlush(house);
    }


    public JsonResponse refreshQrCode(Integer houseId){
        try {
            String appId = myconfigService.getAppId();
            String appSecret = myconfigService.getAppSecret();
            if(appId == null || appId.isEmpty() || appSecret == null || appSecret.isEmpty()){
                throw new RuntimeException("未配置小程序ID和秘钥：请在【界面设计器】左上角【设置】处填写相关信息");
            }

            genHouseQr(houseId);
            Optional<House> byId = houseRepository.findById(houseId);
            if (byId.isEmpty()) {
                return JsonResponse.error("房源不存在");
            }
            return JsonResponse.ok(byId.get().getQr());
        } catch (WxErrorException e) {
            log.error("生成二维码失败：{}",e.getMessage());
            return JsonResponse.error("生成二维码失败，请重试！");
        }
    }
}
