let request = require('../utils/request.js');

export function createScore(key){
    return request.post("/api/v1/scores",{key: key});
}
export function getScoreList(data){
    return request.get("/api/v1/scores", data);
}
