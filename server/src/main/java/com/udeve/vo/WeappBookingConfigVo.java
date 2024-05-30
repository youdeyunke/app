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
import cn.hutool.core.util.ObjectUtil;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Data
public class WeappBookingConfigVo implements Serializable {

    public Integer week;

    public List<String> hours;

    public LocalDateTime createdAt;

    public LocalDateTime updatedAt;

    public void setHours(String hours) {
        if (ObjectUtil.isEmpty(hours)){
            return;
        }
        this.hours = Arrays.stream(hours.split(",")).toList();
    }
}
