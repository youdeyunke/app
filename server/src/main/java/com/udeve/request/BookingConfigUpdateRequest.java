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
import java.util.List;

@Data
public class BookingConfigUpdateRequest implements Serializable {

    @NotNull(message = "星期不能为空")
    public Integer week;

    @NotNull(message = "时间不能为空")
    public List<String> hours;

    @NotNull(message = "状态不能为空")
    public Boolean status;

    @NotBlank(message = "备注不能为空")
    public String remark;
}
