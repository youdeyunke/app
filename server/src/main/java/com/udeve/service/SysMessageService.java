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

import cn.binarywang.wx.miniapp.api.WxMaMsgService;
import cn.binarywang.wx.miniapp.api.WxMaService;
import cn.binarywang.wx.miniapp.bean.WxMaSubscribeMessage;
import com.udeve.entity.*;
import com.udeve.repository.SysMessageRepository;
import com.udeve.repository.UserRepository;
import com.udeve.repository.XcxUserRepository;
import com.udeve.request.CommonRequest;
import com.udeve.utils.JsonResponse;
import com.udeve.vo.SysMessageDetailVo;
import com.udeve.vo.SysMessageListVo;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.common.error.WxErrorException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class SysMessageService {

    @Autowired
    SysMessageRepository sysMessageRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    UserRepository userRepository;

    @Autowired
    XcxUserRepository xcxUserRepository;

    @Autowired
    MyconfigService myconfigService;

    @Autowired
    WxMaService wxMaService;


    /**
     * 根据接收者id获取系统消息列表
     * @param userId
     * @param request
     * @return
     */
    public JsonResponse getLastThreeMonthSysMessagesByReceiver(String userId,CommonRequest request){
        List<SysMessage> lists = sysMessageRepository.findLastThreeMonthByReceiver(userId, ((request.getPage() - 1)*request.getPerPage()), request.getPerPage());
        List<SysMessageListVo> sysMessageListVos = lists.stream().map(sysMessage -> modelMapper.map(sysMessage, SysMessageListVo.class)).collect(Collectors.toList());
        return JsonResponse.ok(sysMessageListVos);
    }

    /**
     * 全部已读
     * @param userId 当前登录用户的id
     * @return
     */
    public JsonResponse readAll(String userId) {
        sysMessageRepository.findByReceiver(userId).forEach(item -> {
            item.setUnread(false);
            item.setUpdatedAt(LocalDateTime.now());
            sysMessageRepository.saveAndFlush(item);
        });
        return JsonResponse.ok();
    }

    /**
     * 单条已读
     * @param id 要执行已读的id
     * @return
     */
    public JsonResponse readById(Integer id){
        sysMessageRepository.findById(id).ifPresent(sysMessage -> {
            sysMessage.setUnread(false);
            sysMessage.setUpdatedAt(LocalDateTime.now());
            sysMessageRepository.saveAndFlush(sysMessage);
        });
        return JsonResponse.ok();
    }

    /**
     * 根据id拉取消息内容
     * @param id
     * @return
     */
    public JsonResponse getContentById(Integer id){
        Optional<SysMessage> sysMessageOptional = sysMessageRepository.findById(id);
        if (sysMessageOptional.isEmpty()) {
            return JsonResponse.error("内容不存在");
        }
        SysMessageDetailVo map = modelMapper.map(sysMessageOptional.get(), SysMessageDetailVo.class);
        return JsonResponse.ok(map);
    }

    /**
     * 发送系统消息
     * @param cat 消息类型
     * @param title 消息标题
     * @param content 消息内容
     * @param receiverId 接收者id
     * @param url 跳转路径
     */
    public void sendSysMessage(String cat,String title,String content,Integer receiverId,String url){
        SysMessage sysMessage = new SysMessage();
        sysMessage.setCat(cat);
        sysMessage.setTitle(title);
        sysMessage.setContent(content);
        sysMessage.setReceiver(receiverId.toString());
        sysMessage.setUnread(true);//默认未读
        sysMessage.setCreatedAt(LocalDateTime.now());
        sysMessage.setUpdatedAt(LocalDateTime.now());
        sysMessage.setUrl(url);
        sysMessageRepository.saveAndFlush(sysMessage);
        pushWxMessage(sysMessage);//发送微信订阅消息
    }


    public void pushWxMessage(SysMessage sysMessage){
        String receiver = sysMessage.getReceiver();
        String title = sysMessage.getTitle();
        if("".equals(receiver) || "".equals(title)){
            log.error("receiver 或 title 为空，推送消息所需的必要参数为空，无法发送receiver：{}，title：{}",receiver,title);
            return;
        }
        XcxUser xcxUser =  xcxUserRepository.findFirstByUserId(Integer.valueOf(receiver));
        String openId = xcxUser == null || "".equals(xcxUser.getOpenid()) ? null : xcxUser.getOpenid();
        log.info("openid:{}",openId);
        if(openId==null){
            log.warn("用户：ReceiverId:{}，没有openId，无法发送微信订阅消息",sysMessage.getReceiver());
            return;
        }
        String msgTplId =  myconfigService.getMsgTplId();
        log.info("MsgTplId:{}",msgTplId);
        if(msgTplId==null || msgTplId.isEmpty()){
            log.error("MsgTplId is null . 无法发送微信订阅消息。MsgTplId:{}",msgTplId);
            return;
        }
        log.info("开始发送微信订阅消息...");
        String newContent = title;
        if (title.length()>20){
            newContent = title.substring(0,20);
        }
        try {
            WxMaMsgService msgService =  wxMaService.getMsgService();
            List<WxMaSubscribeMessage.MsgData> data = new ArrayList<>();
            WxMaSubscribeMessage.MsgData data1 = new WxMaSubscribeMessage.MsgData("name1", "系统通知");
            WxMaSubscribeMessage.MsgData data2 = new WxMaSubscribeMessage.MsgData("thing3", newContent);
            data.add(data1);
            data.add(data2);
            WxMaSubscribeMessage msg = WxMaSubscribeMessage.builder()
                    .toUser(openId)
                    .templateId(msgTplId)
                    .page(sysMessage.getUrl())
                    .lang("zh_CN")
                    .data(data).build();
            msgService.sendSubscribeMsg(msg);
            log.info("发送微信订阅消息成功！：{}-->{}",receiver,title);
        } catch (WxErrorException e) {
            log.warn("发送给---》【{}】失败：WxErrorException：{}",receiver,e.getMessage());
        }
    }

    /**
     * 删除系统消息
     * @param sysMessageId 系统消息的id
     * @return
     */
    public JsonResponse deleteSysMessage(Integer sysMessageId){
        sysMessageRepository.findById(sysMessageId).ifPresent(sysMessage -> {
            sysMessageRepository.deleteById(sysMessage.getId());
        });
        return JsonResponse.ok();
    }

}
