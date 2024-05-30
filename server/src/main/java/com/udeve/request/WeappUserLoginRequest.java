package com.udeve.request;
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

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

// 微信小程序登录请求
@Data
public class WeappUserLoginRequest implements Serializable {

    @NotBlank(message = "code不能为空")
    public String code;

    @NotBlank(message = "encryptedData不能为空")
    public String encryptedData;

    @NotBlank(message = "iv不能为空")
    public String iv;
}
