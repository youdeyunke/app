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
public class WeappNeedCreateRequest implements Serializable {

    @NotBlank(message = "area不能为空")
    public String area;
    @NotNull(message = "budgetMax不能为空")
    public Integer budgetMax;
    @NotNull(message = "budgetMin不能为空")
    public Integer budgetMin;
    public String content;
    @NotBlank(message = "housetype不能为空")
    public String housetype;
    @NotBlank(message = "name不能为空")
    public String name;
    @NotBlank(message = "mobile不能为空")
    public String mobile;
    public String points;
    public String position;
    public Boolean sex;
    public Integer cityId;
    public Integer districtId;

}
