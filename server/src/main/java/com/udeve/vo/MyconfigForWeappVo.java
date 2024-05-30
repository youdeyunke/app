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

import com.alibaba.fastjson.JSONObject;

import com.udeve.utils.constants.Constants;
import com.udeve.utils.text.StringUtils;
import lombok.Data;

@Data
public class MyconfigForWeappVo {
    public String textBanner;
    public Integer id;
    public String xcxAppId;
    public String msgTplId;
    public String statement;
    public String serviceWechatQr;
    public String serviceMobile;
    public String serviceWechat;
    public String companyName;
    public String companyDesc;

    public String xcxVersion;
    public String aboutUs;
    public String xcxCopyright;
    public String logo;
    public Float  lprRate;
    public String xcxName;
    public String cdnDomain;
    public String serverVersion;

    public String uploadAllowedExtension;

    public String lastServerVersion;

    public JSONObject color;

    public String getUploadAllowedExtension() {
        if (this.uploadAllowedExtension==null || ("").equals(this.uploadAllowedExtension)) {
            return StringUtils.join(Constants.DEFAULT_ALLOWED_EXTENSION,",");
        }
        return uploadAllowedExtension;
    }
}
