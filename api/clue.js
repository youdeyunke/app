let request = require('../utils/request.js');

/**
 * 线索管理模块
 */

// 写线索跟进日志
export function createClueFollow(followData){
    return request.post("/api/v1/clue_follows", {follow: followData})
}

// 查询线索状态列表
// 根据状态查询线索时候，传递query为{status_id: xxx}
export function  getClueStatusList(query){
    return request.get("/api/v1/clue_status", query)
}

// 拉取线索概况信息
export function getClueSummary( ){
    request.get("/api/v1/clues/summary")
}
