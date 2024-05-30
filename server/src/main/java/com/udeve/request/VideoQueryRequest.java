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

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class VideoQueryRequest extends CommonRequest implements Serializable {
    public String ids;

    public List<Integer> getIds() {
        if ("".equals(ids) || ids == null) {
            return null;
        }
        return Arrays.stream(ids.split(","))
                .map(Integer::parseInt)
                .collect(Collectors.toList());
    }
}
