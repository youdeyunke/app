package com.udeve.vo;
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

import com.udeve.utils.constants.Constants;
import com.udeve.utils.text.StringUtils;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class AdminMyconfigDetailVo implements Serializable {

    @Schema(description = "id", example = "1")
    public Integer id;
    @Schema(description = "小程序appid", example = "小程序appid")
    public String XcxAppId;
    @Schema(description = "公司名称", example = "公司名称")
    public String companyName;

    public String companyDesc;

    public String logo;

    public String serviceWechat;

    public String serviceMobile;

    public LocalDateTime createdAt;

    public LocalDateTime updatedAt;

    public String cdnDomain;

    public String xcxName;

    public Float  lprRate;

    public String msgTplId;

    public String xcxCopyright;


    public String mchKey;

    public String mchCert;

    public Boolean mchDebug;

    public String mchCallbackDomain;

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

    public String mchId;

    public Integer confirmHours;

    public Integer protectedHours;

    public Integer confirmDays;

    public String aboutUs;

    public String statement;

    public String reportRule;

    public String serverVersion;

    public String lastServerVersion;

    public String uploadAllowedExtension;

    public String apiHost;

    // 以下是不能返回给前端的配置参数


    public String qqMapKey;

    public String qiniuAk;

    public String qiniuSk;

    public String qiniuBucket;
    @Schema(description = "小程序secret", example = "小程序secret")
    public String xcxSecret;

    public Boolean weappInit =false;

    public String getUploadAllowedExtension() {
        if (this.uploadAllowedExtension==null || ("").equals(this.uploadAllowedExtension)) {
            return StringUtils.join(Constants.DEFAULT_ALLOWED_EXTENSION,",");
        }
        return uploadAllowedExtension;
    }
}
