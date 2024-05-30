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
import cn.dev33.satoken.annotation.SaCheckPermission;
import com.alibaba.fastjson.JSONObject;
import com.udeve.request.*;
import com.udeve.entity.House;
import com.udeve.repository.HouseRepository;
import com.udeve.service.AdminHouseService;
import com.udeve.service.HouseService;
import com.udeve.utils.JsonResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;
import javax.validation.Valid;
import java.util.Map;

@RestController
@SaCheckLogin
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
@Api(tags = "二手房源管理")
public class AdminHouseController extends BaseApiController {
    @Autowired
    HouseService houseService;
    @Autowired
    AdminHouseService adminHouseService;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    private HouseRepository houseRepository;

    @Operation(summary = "获取房源列表")
    @GetMapping(value = "/admin6/houses")
    public JsonResponse Index(@RequestParam  Map<String, Object> query) {
        JSONObject queryJson = new JSONObject(query);
        // 这一步是为了将下划线转为驼峰
        HouseSearchRequest queryDto = JSONObject.parseObject(queryJson.toString(), HouseSearchRequest.class);
        return adminHouseService.index(queryDto);
    }

    @ApiOperation(value = "获取房源详情")
    @Operation(summary = "获取房源详情")
    @GetMapping(value = "/admin6/houses/{id}")
    public JsonResponse Show(@PathVariable("id") Integer id) {
        House house = houseRepository.findById(id).orElse(null);
        return JsonResponse.ok(house);
    }

    @ApiOperation(value = "创建房源信息")
    @PostMapping(value = "/admin6/houses/")
    @SaCheckPermission("create_house")
    public JsonResponse Create(@Valid @RequestBody AdminHouseCreateRequest houseDto) {
        return adminHouseService.create(houseDto, (Integer) getUser().get("user_id"));
    }

    @ApiOperation(value = "修改房源信息")
    @PatchMapping(value = "/admin6/houses/{id}")
    @SaCheckPermission("update_house")
    public JsonResponse Update(@PathVariable("id") Integer id, @Validated @RequestBody AdminHouseUpdateRequest houseDto) {
        houseDto.setId(id);
        houseDto.setAdminUserId((Integer) getUser().get("user_id"));
        return adminHouseService.update(houseDto,(Integer) getUser().get("user_id"));
    }
    @Operation(summary = "修改房源介绍、相册、视频、VR")
    @PatchMapping("/admin6/houses/info/{id}")
    @SaCheckPermission("update_house")
    public JsonResponse updateInfo(@PathVariable("id") Integer id, @Validated @RequestBody AdminHouseUpdateInfoRequest houseDto){
        return adminHouseService.updateInfo(id, houseDto, (Integer) getUser().get("user_id"));
    }

    @PatchMapping(value = "/admin6/houses/state")
    @SaCheckPermission("update_house")
    public JsonResponse updateStatus(@RequestBody JSONObject request){
        Integer id = (Integer) request.get("id");
        String publisStatus = (String) request.get("publish_status");
        return adminHouseService.updateStatus(id, publisStatus, (Integer) getUser().get("user_id"));
    }

    @ApiOperation(value = "删除房源")
    @DeleteMapping(value = "/admin6/houses/{id}")
    @SaCheckPermission("delete_house")
    public JsonResponse Destroy(@PathVariable("id") Integer id) {
        return adminHouseService.destroy(id, (Integer) getUser().get("user_id"));
    }

    @GetMapping(value = "/admin6/poi")
    public JsonResponse getPoi(@RequestParam Map<String,Object> map){
        JSONObject jsonObject = new JSONObject(map);
        AdminPoiRequest adminPoiRequest = JSONObject.parseObject(jsonObject.toString(), AdminPoiRequest.class);
        return adminHouseService.getPoi(adminPoiRequest);
    }

    @Operation(summary = "重新生成二维码",description = "用于重新生成二手房预览二维码")
    @PostMapping("/admin6/houses/refresh_qrcode/{id}")
    @SaCheckPermission(value = {"update_house","create_house"},mode = SaMode.OR)
    public JsonResponse refreshHouseQrCode(@PathVariable("id") Integer id){
        return adminHouseService.refreshQrCode(id);
    }

}
