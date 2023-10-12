let request = require('../utils/request.js');


// 聊天消息中发送楼盘卡片  完成
export function sendPostCard(data) {
    return request.get("/api/v2/posts/hello", data);
}

// 拉取楼盘列表 完成
export function getPostList(data) {
    return request.get("/api/v6/posts/", data);
}
// 1
export function getAdminPostList(data) {
    return request.get("/api/v1/admin_posts/", data);
}
// 1
export function getAdminPostDetail(pid) {
    return request.get("/api/v1/admin_posts/" + pid);
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
    return request.get("/api/v6/posts/" + pid);
}

// 拉取楼盘bannersInfo信息数据
export function getPostBannerInfo(pid) {
    return request.get("/api/v6/post_banner_info/" + pid)
}

// 拉取楼盘基本信息  完成
export function getPostBaseInfo(pid) {
    return request.get("/api/v6/post_base_info/" + pid);
}

// 快速搜索楼盘，参数只需要传关键字既可   完成
export function quickSearch(kw) {
    return request.get("/api/v1/quicksearch", {
        kw: kw
    })
}



// 绑定楼盘客户关系   1
export function  createPostCustomer(data){
  return request.post("/api/v1/post_customers/", data);
}


// 已经删除了的功能
// app.request({
//     url:'/api/v1/post_docs?post_id='+this.data.postId,
//     success:function(res){



//   1
export function  getPostDetailContent(pid){
  return request.get("http://localhost:8080/api/v6/post_detail/" + pid);
}



// 查询预售证详情  1
export function getPostLicenseList(query){
  return request.get("/api/v1/post_licenses", query);
}

// 查询楼盘排行榜  1
export function  getPostRank(query){
  return request.get("/api/v1/post_rank", query);
}




// 查询楼盘的vr列表   1
export function  getPostVrList(pid){
  return request.get("/api/v1/post_vrs", {post_id:pid});
}

// 查询楼盘的vr详情   1
export function  getPostVrDetail(vid){
  return request.get("/api/v1/post_vrs/"+vid);
}


// 查询楼盘户型列表  1
export function  getPostTypeList(query){
  return request.get("http://192.168.31.45:8080/api/v6/types", query);
}

// 查询户型详情数据   1
// TODO 后端接口需要将types改为post_types
export function getPostTypeDetail(tid){
  return request.get("/api/v1/types/"+tid);
}

// 查询一房一价表   1
export function  getBuildingRoomList(query){
  return request.get("/api/v1/building_rooms", query);
}

// 查询具体房间的详细数据  1
export function  getBuildingRoomDetail(roomId){
  return request.get("/api/v1/building_rooms/"+roomId);
}

