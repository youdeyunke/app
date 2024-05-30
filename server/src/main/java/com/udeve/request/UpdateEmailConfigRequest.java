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

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.io.Serializable;

@Data
public class UpdateEmailConfigRequest implements Serializable {

    @NotBlank(message = "平台地址不能为空")
    public String emailHost;

    @NotNull(message = "端口号不能为空")
    //校验大于零
    @Min(value = 0, message = "端口号必须大于0")
    public Integer emailPort;

    @NotBlank(message = "邮件协议不能为空")
    public String emailProtocol;

    @NotBlank(message = "发送邮件的邮箱地址不能为空")
    @Pattern(regexp = "^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$", message = "邮箱格式不正确")
    public String emailUsername;

    @NotBlank(message = "授权码不能为空")
    public String emailPassword;

}
