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
public class AdminQrCreateRequest implements Serializable {

    @NotBlank(message = "标题不能为空")
    @Schema(description = "标题", example = "标题")
    public String title;

    public String data;
    @NotBlank(message = "路径不能为空")
    @Schema(description = "小程序页面路径", example = "/pages/index/index")
    public String path;
}
