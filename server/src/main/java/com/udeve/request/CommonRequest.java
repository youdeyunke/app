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

@Data
public class CommonRequest implements Serializable {

    public String kw; // 搜索关键字
    public Integer page; // 请求的页码
    public Integer perPage; // 每页显示的数量
    public String scope; // 请求范围

    /**
     * 获取当前页码，如果未设置，则默认为1
     * @return 返回当前页码，缺省值为1
     */
    public Integer getPage(){
        return this.page == null ? 1 : this.page;
    }

    /**
     * 获取每页显示的数量，如果未设置，则默认为10；最大值为99999。
     * @return 返回每页显示的数量，缺省值为10，最大值为99999。
     */
    public Integer getPerPage(){
        return this.perPage == null ? 10:  Math.min(this.perPage, 99999);
    }
}
