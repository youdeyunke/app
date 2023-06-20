let request = require('../utils/request.js');
// 完成  检测完成  全局搜索方法名
export function getHouseList(data){
    return request.get("/api/v6/houses", data);
}

// 拉取楼盘详情页模块数据     完成
export function getHouseBlocks(pid){
    return request.get("/api/v6/houses/"+pid);
}

// 拉取竞价规则   完成
export function getRuleDetail(ruleId){
  return request.get("/api/v6/auction_rules/"+ruleId);
}


