let request = require('../utils/request.js');


// 好友点击助力
export function  createZhuliHaoyou(data){
    return request.post("/api/v1/zhuli_haoyou", data);

}

// 查询好友助力情况
export function  getZhuliHaoyouList(query){
    return request.get("/api/v1/zhuli_haoyou", query);
}

// 查询助力活动的详情
export function  getZhuliDetail(zhuliId){
    return request.get("/api/v1/zhuli/" + zhuliId);
}


// 助力成功，领取奖励
export function  createZhuliSuccess(data){
    return request.post("/api/v1/zhuli", data);
}

// 发起我的助力活动
export function joinZhuli(hid){
    return request.post("/api/v1/zhuli/join/" + hid);

}