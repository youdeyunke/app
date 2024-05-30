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
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import cn.hutool.core.util.ObjectUtil;
import com.alibaba.fastjson.JSONObject;
import com.udeve.BaseApiController;
import com.udeve.request.UpdateEmailConfigRequest;
import com.udeve.service.AdminEmailConfigService;
import com.udeve.utils.EmailUtil;
import com.udeve.utils.JsonResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@SaCheckLogin
@Slf4j
@SaCheckRole(value = {"admin","demo"},mode = SaMode.OR)
public class AdminEmailConfigController extends BaseApiController {

    @Autowired
    EmailUtil emailUtil;

    @Autowired
    AdminEmailConfigService adminEmailConfigService;

    @GetMapping("/admin6/email/info")
//    @SaCheckPermission("update_myconfig_mail")
    public JsonResponse getEmailConfig(){
        return adminEmailConfigService.getEmailConfig();
    }

    @PostMapping("/admin6/email/send_test")
//    @SaCheckPermission("update_myconfig_mail")
    public JsonResponse sendEmailTest(@RequestBody JSONObject req){
        String mail = req.getString("mail");
        //校验是否有输入
        if (ObjectUtil.isEmpty(mail)){
            return JsonResponse.error("请输入邮箱");
        }
        //校验是否是一个合法的邮件
        if (!emailUtil.isEmail(mail)){
            return JsonResponse.error("请输入正确的邮箱");
        }
        try {
            emailUtil.sendSimpleMail(mail,"测试邮件","这是一封测试邮件");
        }catch (Exception e){
            e.printStackTrace();
            if (e.getMessage().contains("Mail server connection failed")){
                return JsonResponse.error("发送失败：邮箱服务器连接失败");
            }
            return JsonResponse.error("发送失败：请检查邮箱配置是否正确！");
        }
        return JsonResponse.ok("已发送");
    }

    @PatchMapping("/admin6/email/config")
//    @SaCheckPermission("update_myconfig_mail")
    public JsonResponse updateEmailConfig(@Validated @RequestBody UpdateEmailConfigRequest req) {
        return adminEmailConfigService.updateEmailConfig(req);

    }
}
