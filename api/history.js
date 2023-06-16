let request = require('../utils/request.js');

// 完成
export function  getHistoryList(query){
    return request.get("/api/v1/history", query);

}