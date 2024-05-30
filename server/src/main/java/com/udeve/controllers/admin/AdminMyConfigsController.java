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
import cn.binarywang.wx.miniapp.api.WxMaService;
import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import com.udeve.request.*;
import com.udeve.service.AsyncService;
import com.udeve.vo.AdminMyconfigDetailVo;
import com.udeve.entity.Myconfig;
import com.udeve.service.MyconfigService;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.AdminMyconfigDetailVoDemo;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.udeve.BaseApiController;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@SaCheckLogin
@Api(tags = "MyConfig管理")
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
@Slf4j
public class AdminMyConfigsController extends BaseApiController {

    @Autowired
    MyconfigService myconfigService;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    WxMaService wxMaService;
    @Autowired
    AsyncService asyncService;

    @Operation(summary = "获取MyConfig详情", description = "用于获取MyConfig详情")
    @GetMapping(value = "/admin6/myconfigs")
    public JsonResponse myconfigs() {
        Myconfig myconfig = myconfigService.get();
        AdminMyconfigDetailVo map = modelMapper.map(myconfig, AdminMyconfigDetailVo.class);
        map.setServerVersion(myconfigService.getServerVersion());
        map.setLastServerVersion(myconfigService.getLastServerVersion());
        // demo角色，不返回敏感信息
        String userType = (String) getUser().get("user_type");
        String[] array = userType.split(",");
        List<String> roleList = Arrays.asList(array);
        // 身份是demo
        if (roleList.contains("demo")) {
            AdminMyconfigDetailVoDemo map1 = modelMapper.map(map, AdminMyconfigDetailVoDemo.class);
            return JsonResponse.ok(map1);
        }
        return JsonResponse.ok(map);
    }


    @Operation(summary = "更新联系方式")
    @PatchMapping(value = "/admin6/myconfigs/contact_info")
    @SaCheckPermission("update_contact_info")
    public JsonResponse updateContactInfo(@RequestBody AdminMyconfigUpdateContactInfoRequest request){
        return myconfigService.updateContactInfo(request);
    }


    @Operation(summary = "更新服务器参数")
    @PatchMapping(value = "/admin6/myconfigs/server_info")
    @SaCheckPermission("update_myconfig_server")
    public JsonResponse updateAdminServerInfo(@Validated @RequestBody AdminMyconfigUpdateServerInfoRequest configServerInfo){
        return myconfigService.updateAdminServerInfo(configServerInfo);
    }

    @Operation(summary = "小程序设置")
    @PatchMapping(value = "/admin6/weapp/config")
    public JsonResponse weappConfig(@Validated @RequestBody AdminWeappConfigRequest request){
        return myconfigService.weappConfig(request);
    }


    @Operation(summary = "更新地图信息")
    @PatchMapping(value = "/admin6/myconfigs/map")
    @SaCheckPermission("update_myconfig_map")
    public JsonResponse updateMapInfo(@RequestBody AdminMyconfigUpdateMapRequest configMapInfo){
        return myconfigService.updateMapInfo(configMapInfo);
    }

    @Operation(summary = "版权信息变更")
    @PatchMapping("/admin6/myconfigs/update_copyright")
    public JsonResponse updateCopyright(@RequestBody AdminMyconfigUpdateCopyrightRequest copyrightRequest){
        return myconfigService.updateCopyright(copyrightRequest);
    }
}
