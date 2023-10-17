let request = require('../utils/request.js');

// 完成
export function  getHistoryList(query){
    return request.get("/api/v6/history", query);

}

export function createHistory(data) {
  return request.post("/api/v6/history", data);
}