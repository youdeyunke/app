let request = require('../utils/request.js');

/** 
 * 过滤器模块接口
 * **/

// 拉取列表   完成
export function getFilterOptionList(query){
    return request.get("/api/v1/filter_options/", query  );
}