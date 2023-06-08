let request = require('../utils/request.js');


// 聊天消息中发送楼盘卡片
export function sendPostCard(data){
    return request.get("/api/v2/posts/hello", data);
}

// 拉取楼盘列表
export function getPostList(data){
  return request.get("/api/v1/posts/", data);
}

// app.request({
//     url: '/api/v1/posts/' + pid,
//     method: 'GET',
//     success: function (resp) {
//         _this.setData({
//             post: resp.data.data
//         })
//     }
// })


// app.request({
//     url: '/api/v1/posts/myfavs',
//     data: query,
//     hideLoading: true,


// 拉取楼盘详情页模块数据  替换完成
export function getPostBlocks(pid){
    return request.get("/api/v5/posts/"+pid);
}

// 拉取楼盘基本信息  替换完成
export function getPostBaseInfo(pid){
    return request.get("/api/v1/post_base_info/"+pid);
}

// 快速搜索楼盘，参数只需要传关键字既可
export function  quickSearch(kw){
  return request.get("/api/v1/quicksearch", {kw:kw})
}

