let request = require('../utils/request.js');
// 完成  检测完成  全局搜索方法名
export function getHouseList(data){
    return request.get("/api/v6/houses", data);
}
// 发布二手房
export function createHouse(data){
  return request.post("/api/v6/houses", data);
}

// 拉取楼盘详情页模块数据     完成
export function getHouseBlocks(pid){
    return request.get("/api/v6/houses/"+pid);
}

// 创建小区poi点
export function createSubdistrict(data){
  // {name:"xx", lagitude:xx, longitude:xx, street:xx,}
  return request.post("/api/v1/sub_districts", data);
}

// 拉取楼盘筛选条件
export function getHouseFilter(busi){
    return request.get("/api/v6/house_filters?business=" + busi);
}

// 拉取竞价规则   完成
export function getRuleDetail(ruleId){
  return request.get("/api/v6/auction_rules/"+ruleId);
}

// 报名参加竞拍
export function payAndJoin(ruleId){
    return request.post("/api/v6/auction_members/join", {rule_id: ruleId});
}

// 参与出价
export function createBid(ruleId){
    return request.post("/api/v6/auction_bids", {rule_id: ruleId});
}

// 拉取出价明细
export function getBidList(ruleId){
    return request.get("/api/v6/auction_bids", {rule_id: ruleId});
}

// 订阅竞拍提醒
export function createHouseAuctionRemind(houseId){
  return request.post("/api/v6/user_reminds", {target_id: houseId, target_type: "house.auction"});
}

// 取消订阅竞拍提醒
export function deleteHouseAuctionRemind(houseId){
  return request.destroy("/api/v6/user_reminds", {target_id: houseId, target_type: "house.auction"});
}