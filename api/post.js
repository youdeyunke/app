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
//     url: '/api/v1/post_licenses',
//     method: 'GET',
//     data: query,
//     success: function (res) {


// app.request({
//     url: '/api/v1/post_detail/' + _this.data.postId,
//     success: function (resp) {


// app.request({
//     url: '/api/v1/poster_templates/',
//     success: function (resp) {

// app.request({
//     url: '/api/v1/post_rank', 
//     data: query, 
//     success: function(res){


// app.request({
//     url: '/api/v1/post_tickets',
//     data: params,
//     success: function (res) {

// app.request({
//     url: '/api/v1/post_tickets/' + this.data.ticketId,
//     success: function (res) {

// app.request({
//     url:'/api/v1/post_vrs?post_id='+_this.data.postId,
//     success: function(res) {

// app.request({
//     url: '/api/v1/post_vrs/' + this.data.vrId, 
// success: function(resp){