let request = require('../utils/request.js');


// 聊天消息中发送楼盘卡片  完成
export function sendPostCard(data) {
    return request.get("/api/v2/posts/hello", data);
}

// 拉取楼盘列表 完成
export function getPostList(data) {
    return request.get("/api/v1/posts/", data);
}

// 查询楼盘详情数据   完成
export function getPostDetail(pid) {
    return request.get("/api/v1/posts/" + pid);
}


// 拉取我收藏过的楼盘列表 完成
export function getFavPosts(query) {
    return request.get("/api/v1/posts/myfavs", query);
}



// 拉取楼盘详情页模块数据  完成
export function getPostBlocks(pid) {
    return request.get("/api/v5/posts/" + pid);
}

// 拉取楼盘基本信息  完成
export function getPostBaseInfo(pid) {
    return request.get("/api/v1/post_base_info/" + pid);
}

// 快速搜索楼盘，参数只需要传关键字既可   完成
export function quickSearch(kw) {
    return request.get("/api/v1/quicksearch", {
        kw: kw
    })
}


// 缺
// this.request({
//     url: '/api/v1/post_customers/',
//     method: 'POST',
//     hideLoading: true,
//     data: data,
//     success: function (resp) {

// app.request({
//     url:'/api/v1/post_docs?post_id='+this.data.postId,
//     success:function(res){





// app.request({
//     url: '/api/v1/post_detail/' + _this.data.postId,
//     success: function (resp) {


// app.request({
//     url: '/api/v1/poster_templates/',
//     success: function (resp) {








// app.request({
//     url:'/api/v1/post_vrs?post_id='+_this.data.postId,
//     success: function(res) {



// 查询预售证详情
export function getPostLicenseList(query){
  return request.get("/api/v1/post_licenses", query);
}

// 查询楼盘排行榜
export function  getPostRank(query){
  return request.get("/api/v1/post_rank", query);
}


// 查询楼盘摇号数据
export function   getPostTicketList(query){
  return request.get("/api/v1/post_tickets", query);
}

// 查询摇号详情
export function  getPostTicketDetail(tid){
  return request.get("/api/v1/post_tickets/"+tid);
}


// 查询楼盘的vr列表
export function  getPostVrList(pid){
  return request.get("/api/v1/post_vrs", {post_id:pid});
}

// 查询楼盘的vr详情
export function  getPostVrDetail(vid){
  return request.get("/api/v1/post_vrs/"+vid);
}


// 查询楼盘户型列表
export function  getPostTypeList(query){
  return request.get("/api/v1/types", query);
}

// 查询户型详情数据
// TODO 后端接口需要将types改为post_types
export function getPostTypeDetail(tid){
  return request.get("/api/v1/types/"+tid);
}

// 查询一房一价表
export function  getBuildingRoomList(query){
  return request.get("/api/v1/building_rooms", query);
}

// 查询具体房间的详细数据
export function  getBuildingRoomDetail(roomId){
  return request.get("/api/v1/building_rooms/"+roomId);
}

