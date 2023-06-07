let request = require('../utils/request.js');

//已完成
export function createScore(key){
    return request.post("/api/v1/scores",{key: key});
}
// 已完成
export function getScoreList(data){
    return request.get("/api/v1/scores", data);
}
