let request = require('../utils/request.js');

/**
 * 合同模块
 */
// 拉取合同列表 
export function getContractList( ){
    return request.get("/api/v6/fdd/contracts")
}

// 拉取合同详情
export function getContractDetail(cid){
  return request.get("/api/v6/fdd/contracts/"+cid)
}