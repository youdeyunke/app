let request = require('../utils/request.js');

/** 
 * city模块接口
 * **/

// v1版本的拉取城市  完成
export function getCityListV1(){
    return request.get("/api/v1/cities/"  );
}

// v2版本的拉取城市   完成 
export function getCityListV2(){
    return request.get("/api/v2/cities/"  );
}

export function getCityListV6(){
  return request.get("/api/v6/cities/"  );
}