let request = require('../utils/request.js');

/**
 * 线索管理模块
 */

// 写线索跟进日志   完成
export function createClueFollow(followData){
    return request.post("/api/v1/clue_follows", {follow: followData})
}

// 查询线索状态列表    完成
// 根据状态查询线索时候，传递query为{status_id: xxx}
export function  getClueStatusList(query){
    return request.get("/api/v1/clue_status", query)
}

// 拉取线索概况信息  完成
export function getClueSummary( ){
    request.get("/api/v1/clues/summary")
}


// 缺
// app.request({
//     url: '/api/v1/clues/?status_id=' + _this.data.statusId,
//     success: function(resp){
//       if(resp.data.status != 0){

// 拉取线索列表
export function getClueList(query){
    return request.get("/api/v1/clues", query)
}



    // app.request({
    //     url: '/api/v1/clues/' + _this.data.clueId,  
    //     success: function(resp){

// 拉取线索详情
export function getClueDetail(clueId){
    return request.get("/api/v1/clues/" + clueId)
}