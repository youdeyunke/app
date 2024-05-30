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
public class AdminDistrictListVo implements Serializable {

    @Schema(description = "区域id", example = "1")
    public  Integer id;
    @Schema(description = "区域名称", example = "未央区")
    public String name;
    @Schema(description = "区域所属城市id", example = "1")
    public Integer cityId;
    @Schema(description = "区域是否公开", example = "true")
    public Boolean isPublic;
    @Schema(description = "区域排序", example = "1")
    public Integer number;
    @Schema(description = "区域完整名称", example = "西安市-未央区")
    public String fullname;

}
