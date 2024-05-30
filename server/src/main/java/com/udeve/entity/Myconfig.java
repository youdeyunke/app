package com.udeve.entity;
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

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name=Myconfig.TABLE_NAME)
@Entity
@Data
public class Myconfig {
    public static final String TABLE_NAME = "myconfigs";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Column(name = "xcx_app_id")
    public String XcxAppId;

    public String companyName;

    public String companyDesc;

    public String logo;

    public String serviceWechat;

    public String serviceMobile;

    @Column(nullable = false)
    public LocalDateTime createdAt;

    @Column(nullable = false)
    public LocalDateTime updatedAt;

    public String cdnDomain;

    public String xcxName;

    public Float  lprRate;

    public String msgTplId;

    public String xcxCopyright;

    public Boolean isSaas;

    public Boolean isTrial;

    public LocalDateTime expireTime;

    public Integer instanceStatus;

    public Integer instanceId;

    public String instanceName;

    public String adminAuthCodforceLogine;

    public Integer projectId;

    public Boolean loginMethod;

    public Boolean forceLogin;

    public Boolean advLink;

    public Boolean serverStop;

    public Boolean fenxiaoEnable;

    public Boolean cdnHttps;

    public Boolean eventsubEnable;

    public Boolean tourEnable;

    public String xcxQr;

    public String xcxQrTest;

    public String xcxVersion;

    public Integer xcxStatus;

    public String xcxStatusDesc;

    public String projectUid;

    public Boolean overseaEnable;

    public String timAppId;

    public String timAppSecret;

    public String serviceWechatQr;

    public LocalDateTime xcxUpdatedAt;

    public Boolean watermark;

    public Integer protectedDays;

    public Integer confirmHours;

    public Integer protectedHours;

    public Integer confirmDays;

    public String aboutUs;

    public String statement;

    public String reportRule;

    public String uploadAllowedExtension;

    public String apiHost;

    // 以下是不能返回给前端的配置参数

    public String qqMapKey;

    public String xcxSecret;

    public Boolean weappInit =false;


    // 邮箱配置信息

    @Column(name = "email_host")
    public String emailHost;//平台地址

    @Column(name = "email_port")
    public Integer emailPort;//端口号

    @Column(name = "email_protocol")
    public String emailProtocol;//发送邮件的协议

    @Column(name = "email_username")
    public String emailUsername;//发送邮件的账号

    @Column(name = "email_password")
    public String emailPassword;//发送邮件的授权码




}
