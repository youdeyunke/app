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

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;

@Data
public class WeappSimplePostListVo implements Serializable {

    @Schema(description = "id", example = "1")
    public Integer id;
    @Schema(description = "楼盘名称", example = "楼盘名称")
    public String title;
    @Schema(description = "楼盘地址", example = "楼盘地址")
    public String street;
    public String cover;

}
