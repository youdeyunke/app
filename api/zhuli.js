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


// 好友点击助力  1
export function createZhuliHaoyou (data) {
    return request.post("/api/v6/zhuli_haoyou", data);

}

// 查询好友助力情况  1
export function getZhuliHaoyouList (query) {
    return request.get("/api/v6/zhuli_haoyou", query);
}

// 查询助力活动的详情   1
export function getZhuliDetail (zhuliId) {
    return request.get("/api/v6/zhuli/" + zhuliId);
}


// 助力成功，领取奖励  1
export function createZhuliSuccess (data) {
    return request.post("/api/v6/zhuli", data);
}

// 发起我的助力活动  完成
export function joinZhuli (hid) {
    return request.post("/api/v6/zhuli/join/", { id: hid });

}