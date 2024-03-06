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

/**
 * 线索管理模块
 */

// 写线索跟进日志   完成
export function createClueFollow (followData) {
    return request.post("/api/v6/clue_follows", followData)
}

// 查询线索状态列表    完成
// 根据状态查询线索时候，传递query为{status_id: xxx}
export function getClueStatusList (query) {
    return request.get("/api/v6/clue_status", query)
}

// 拉取线索概况信息  完成
export function getClueSummary () {
    return request.get("/api/v6/clues/summary")
}




// 拉取线索列表   1
export function getClueList (query) {
    return request.get("/api/v6/clues", query)
}




// 拉取线索详情  1
export function getClueDetail (clueId) {
    return request.get("/api/v6/clues/" + clueId)
}