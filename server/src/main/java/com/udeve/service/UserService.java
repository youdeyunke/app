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

import cn.binarywang.wx.miniapp.api.WxMaService;
import cn.binarywang.wx.miniapp.bean.WxMaJscode2SessionResult;
import cn.binarywang.wx.miniapp.bean.WxMaPhoneNumberInfo;
import cn.dev33.satoken.stp.SaLoginConfig;
import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.util.ObjectUtil;
import com.udeve.entity.User;
import com.udeve.entity.XcxUser;
import com.udeve.request.WeappUserLoginRequest;
import com.udeve.utils.JsonResponse;
import com.udeve.utils.ip2region.Ip2regionUtils;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.common.error.WxErrorException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import com.udeve.repository.BrokerProfileRepository;
import com.udeve.repository.UserRepository;
import com.udeve.repository.XcxUserRepository;
import javax.naming.AuthenticationException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Optional;

@Service
@Slf4j
public class UserService {

    @Autowired
    StringRedisTemplate stringRedisTemplate;

    @Autowired
    private XcxUserRepository xcxUserRepository;

    @Autowired
    WxMaService maService;

    @Autowired
    MyconfigService myconfigService;

    @Autowired
    BrokerProfileRepository brokerProfileRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    AdminLogService adminLogService;


    //@Autowired
    //WxMaService weappService;

    // 根据手机号码替换中间四位为****
    private String protectedMobileString(String mobile){
        return mobile.replaceAll("(\\d{3})\\d{4}(\\d{4})", "$1****$2");
    }

    // 处理微信小程序端账号登录请求
    public JsonResponse weappLogin(WeappUserLoginRequest loginRequest) throws WxErrorException {
        // 0. 检查系统用户数量是否大于授权码中用户数量
        // 1. 根据code获取session信息
        // 2. 根据session获取用户手机号码
        // 3. 如果用户不存在，创建一个新的用户
        // 4. 如果用户存在，更新用户信息
        // 5. 返回token


        WxMaJscode2SessionResult sessionInfo = maService.getUserService().getSessionInfo(loginRequest.getCode());
        String openid = sessionInfo.getOpenid();
        // 根据session 换取用户信息
        WxMaPhoneNumberInfo phoneInfo = maService.getUserService().getPhoneNoInfo(sessionInfo.getSessionKey(), loginRequest.getEncryptedData(), loginRequest.getIv());
        String mobile = phoneInfo.getPurePhoneNumber();
        log.info("微信手机授权登录结果：{}", phoneInfo.toString());
        log.info("openId：{}", openid);
        // 注册或登录账号
        User user = this.ensureMobile(mobile);
        if (user==null) {
            return JsonResponse.error("用户数量达到上限！");
        }
        //  创建xcx_user对象并记录用户的openid
        XcxUser xcxUser = this.ensureXcxUser(openid, this.protectedMobileString(mobile), user.getId());

        // 生成token（用户基本信息不在此接口返回，而是在后续的接口中返回）

        HashMap<String, Object> uData = new HashMap<>();
        uData.put("user_id", user.getId());
        uData.put("user_name", ObjectUtil.isNotEmpty(user.getName())?user.getName():user.getMobile());
        if (brokerProfileRepository.existsByUserIdAndStatus(user.getId(), 2)) {
            uData.put("user_type", "user,broker");
        } else {
            uData.put("user_type", "user");
        }
        uData.put("user_mobile", mobile);
        uData.put("user_openid", openid); // 切换接口以后，Openid都从这里获取

        StpUtil.login(user.getId(), SaLoginConfig.setExtraData(uData));
        /*user.setIsOnline(true);//在线
        userRepository.save(user);*/
        return JsonResponse.ok(StpUtil.getTokenValue());

    }

    public User ensureMobile(String mobile) {
        User user = userRepository.findFirstByMobile(mobile);
        if(user != null){
            return user;
        }
        // 创建一个新的对象
        User newUser = new User();
        newUser.setMobile(mobile);
        newUser.setName(this.protectedMobileString(mobile));
        userRepository.save(newUser);
        return newUser;
    }

    public XcxUser ensureXcxUser(String openid, String nickname, Integer userId){
        XcxUser xuser = xcxUserRepository.findFirstByOpenid(openid);
        if(xuser == null){
            xuser = new XcxUser();
            xuser.setOpenid(openid);
            xuser.setNickname(nickname);
            xuser.setUserId(userId);
        }
        xcxUserRepository.saveAndFlush(xuser);
        return xuser;
    }


    public User getUser(Integer userId) throws AuthenticationException {
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()){
            throw new AuthenticationException("用户不存在");
        }
        return user.get();
    }

    public String getOpenid(Integer userId) {
        //  返回openid
        XcxUser xuser =  xcxUserRepository.findFirstByUserId(userId);
        return xuser == null || "".equals(xuser.getOpenid()) ? null : xuser.getOpenid();
    }

    /**
     * 跟新用户ip地址及归属地
     * @param ip
     * @param userId
     */
    public void updateUserIp(String ip,Integer userId){
        userRepository.findById(userId).ifPresent(user -> {
            if (!ip.equals(user.getIp())) {
                user.setIp(ip);
                user.setIpRegion(Ip2regionUtils.getRegion(ip));
                userRepository.saveAndFlush(user);
            }
        });
    }


    /**
     * 记录user的uid
     * @param userId 用户id
     * @param uuidParam 用户携带的uuid 强制携带
     */
    public void recordUidForUser(Integer userId,Object uuidParam){
        if (uuidParam==null || ("").equals(uuidParam)){
            log.info("not param uid,current userId:{}",userId);
            return;
        }
        String uuidParamString = uuidParam.toString();
        Optional<User> userOptional = userRepository.findById(userId);
        boolean present = userOptional.isPresent();
        if (!present) {
            return;
        }
        User user = userOptional.get();
        //当前用户如果已经登录过了，并且当前用户的user表上的uid字段没有值，则写入uid到uid字段
        if (user.getUid()==null ||("").equals(user.getUid())) {
            user.setUid(uuidParamString);
            userRepository.saveAndFlush(user);
        }
        //当前用户如果已经登录过了，并且当前用户的user表上的uid字段跟前端传递过来的uid不相当了，则写入uid到uid字段
        if(!user.getUid().equals(uuidParamString)){
            user.setUid(uuidParamString);
            userRepository.saveAndFlush(user);

        }
    }


}
