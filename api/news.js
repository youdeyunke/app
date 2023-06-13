let request = require('../utils/request.js');

/** 
 * news模块接口
 * **/

// 拉取文章概况信息   完成
export function getNewsSummary(){
    return request.get("/api/v1/news_summary/"  );
}

// 拉取文章列表    完成
export function getNewsList(query){
    return request.get("/api/v1/news/", query  );
}

// 拉取文章分类信息   完成
export function getNewsCatList(){
    return request.get("/api/v1/news_cats/"  );
}


// 缺少
// app.request({
//     url: '/api/v1/news/' + _this.data.nid,
//     success: function (resp) {
//         _this.setData({
//             item: resp.data.data,
//         })
//         wx.setNavigationBarTitle({
//             title: resp.data.data.title,
//         });

//     }
// })

// 查询文章详细内容
export function  getNewsDetail(newsId){
    return request.get("/api/v1/news/" + newsId);
}