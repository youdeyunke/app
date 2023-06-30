let request = require('../utils/request.js');

//完成
export function createScore(key){
    // TODO 停用此接口，用share.js替代；
    console.log("注意：createScore接口已经停用，用share.js替代");
    return request.post("/api/v1/scores",{key: key});
}
// 完成
export function getScoreList(data){
    return request.get("/api/v1/scores", data);
}
