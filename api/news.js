let request = require('../utils/request.js');

/** 
 * news模块接口
 * **/

// 拉取文章概况信息
export function getNewsSummary(){
    return request.get("/api/v1/news_summary/"  );
}

// 拉取文章列表
export function getNewsList(query){
    return request.get("/api/v1/news/", query  );
}

// 拉取文章分类信息
export function getNewsCatList(){
    return request.get("/api/v1/news_cats/"  );
}