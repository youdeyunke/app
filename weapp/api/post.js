/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
let request = require('../utils/request.js');


// 聊天消息中发送楼盘卡片  完成
export function sendPostCard (data) {
    return request.get("/api/v6/posts/hello", data);
}

// 拉取楼盘列表 完成
export function getPostList (data) {
    return request.get("/api/v6/posts/", data);
}

// 查询楼盘详情数据   完成
export function getPostDetail (pid) {
    return request.get("/api/v6/posts/" + pid);
}


// 拉取我收藏过的楼盘列表 完成
export function getFavPosts (query) {
    return request.get("/api/v6/posts/myfavs", query);
}



// 拉取楼盘详情页模块数据  完成
export function getPostBlocks (pid) {
    return request.get("/api/v6/posts/" + pid);
}

// 拉取楼盘bannersInfo信息数据
export function getPostBannerInfo (pid) {
    return request.get("/api/v6/post_banner_info/" + pid)
}

// 拉取楼盘基本信息  完成
export function getPostBaseInfo (pid) {
    return request.get("/api/v6/post_base_info/" + pid);
}

// 快速搜索楼盘，参数只需要传关键字既可   完成
export function quickSearch (kw) {
    return request.get("/api/v6/quicksearch", {
        kw: kw
    })
}



// 绑定楼盘客户关系   1  暂时不写
export function createPostCustomer (data) {
    return request.post("/api/v1/post_customers/", data);
}


// 已经删除了的功能
// app.request({
//     url:'/api/v1/post_docs?post_id='+this.data.postId,
//     success:function(res){



//   1
export function getPostDetailContent (pid) {
    return request.get("/api/v6/post_detail/" + pid);
}



// // 查询预售证详情  1
// export function getPostLicenseList(query){
//   return request.get("/api/v1/post_licenses", query);
// }

// 查询楼盘排行榜  1  先不做
export function getPostRank (query) {
    return request.get("/api/v6/post_rank", query);
}




// // 查询楼盘的vr列表   1
// export function  getPostVrList(pid){
//   return request.get("/api/v1/post_vrs", {post_id:pid});
// }

// // 查询楼盘的vr详情   1
// export function  getPostVrDetail(vid){
//   return request.get("/api/v1/post_vrs/"+vid);
// }


// 查询楼盘户型列表  1
export function getPostTypeList (query) {
    return request.get("/api/v6/types", query);
}

// 查询户型详情数据   1
// TODO 后端接口需要将types改为post_types
export function getPostTypeDetail (tid) {
    return request.get("/api/v6/types/" + tid);
}

// 查询一房一价表   1
export function getBuildingRoomList (query) {
    return request.get("/api/v6/building_rooms", query);
}

// 查询具体房间的详细数据  1  用不上了
export function getBuildingRoomDetail (roomId) {
    return request.get("/api/v1/building_rooms/" + roomId);
}

// 查询楼盘评测
export function getPostReviews(pid){
  return request.get("/api/v6/post_reviews/"+pid)
}

// 拉取楼盘动态总平图
export function getPostAirviews(pid){
  return request.get("/api/v6/posts_airview?id="+pid)
}
