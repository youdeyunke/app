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

import lombok.Data;

import javax.persistence.Column;
import java.io.Serializable;
import java.util.Date;

@Data
public class CatListVo implements Serializable {
    public Integer id;

    public String name;

    public Date createdAt;

    public Date updatedAt;

}
