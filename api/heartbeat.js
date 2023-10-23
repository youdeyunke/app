let request = require('../utils/request.js');

// 心跳包，data可不传  1
export function  heartBeat(data={}){
    return request.post("/api/v6/heartbeat");
}