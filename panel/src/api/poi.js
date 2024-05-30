/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
import request from '@/utils/request'

export function searchPoi (kw, cityId) {
    /* api doc https://lbs.qq.com/service/webService/webServiceGuide/webServiceSuggestion
     搜索指定分类
    filter=category=公交站
    搜索多个分类
    filter=category=大学,中学,房产小区,购物
    （注意参数值要进行url编码）
    */
    var category = '房产小区'
    var params = {
        keyword: kw,
        address_format: 'short',
        city_id: cityId,
        filter: "category=" + category
    }
    return request({
        url: '/admin6/poi',
        method: 'get',
        params
    })
}
