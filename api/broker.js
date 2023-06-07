
let request = require('../utils/request.js');

// 拉取置业顾问列表
export function getBrokerList(query){
    return request.get("/api/v1/brokers/", query);
}

// 拉取置业顾问详情
export function getBrokerDetail(userId){
    return request.get("/api/v1/brokers/" + userId);
}

// 增加置业顾问主页浏览量
// 注意：这里要传user_id，而不是broker_id
export function updateBrokerViewsCount(userId){
    return request.post("/api/v1/brokers/view", {user_id:userId});
}


// 置业顾问申请入驻
export function createBroker(profile){
    return request.post("/api/v1/brokers/", profile);
}

// 拉取当前登录账号置业顾问申请入驻状态信息
export function checkBrokerStatus(){
    return request.post("/api/v1/brokers/check_status", {});
}


// 'brokers/show?user_id='+uid
// app.request({ 
//     url: '/api/v1/brokers/show?user_id=' + uid,  
//     success: function(resp){ 
//         if(resp.data.status != 0){
//             return 
//         }
//         _this.setData({broker: resp.data.data})
//     }
// })


// 'brokers/show'
// app.request({
//     url: '/api/v1/brokers/show',
//     data: {
//         user_id: uid
//     },
// )}


// 'brokers/like'
// app.request({
//     method: 'POST',
//     data: {
//         broker_id: id
//     },
//     url: '/api/v1/brokers/like',
// )}