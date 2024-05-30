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
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
public class CreateEventsRequest implements Serializable {
    @NotBlank(message = "发布作者不能为空")
    public String author;
    @NotNull(message = "动态分类id不能为空")
    public Integer catId;
    public String content;
    public String images;
    public String pubTime;
    public Boolean pushEnable = false;
    @NotBlank(message = "标题不能为空")
    public String title;
    public Boolean isPublic = false;
}
