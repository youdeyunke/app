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

@Data
public class AdminMyconfigUpdateCopyrightRequest implements Serializable {

    @NotBlank(message = "版权文字不能为空")
    public String companyName;

    @NotBlank(message = "logo不能为空")
    public String logo;

}
