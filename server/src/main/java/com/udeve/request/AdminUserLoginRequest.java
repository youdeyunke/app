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

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
public class AdminUserLoginRequest implements Serializable {

    public String adminAuthCode;
    @Schema(description = "验证码uuid", example = "uuid")
    public String captchaUuid;
    public String code;
    @Schema(description = "手机号", example = "13000000000")
    public String mobile;
    @Schema(description = "邮箱", example = "123456@ud.com")
    public String email;
    @Schema(description = "密码", example = "123456")
    public String password;
    @Schema(description = "验证码", example = "123456")
    public String captchaValue;

}
