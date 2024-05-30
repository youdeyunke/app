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
let request = require('../utils/request.js');

/** 
 * news模块接口
 * **/


// 拉取文章列表    完成
export function getNewsList (query) {
    return request.get("/api/v6/news/", query);
}

// 拉取文章分类信息   完成
export function getNewsCatList () {
    return request.get("/api/v6/news_cats/");
}

// 查询文章详细内容    1
export function getNewsDetail (newsId) {
    return request.get("/api/v6/news/" + newsId);
}