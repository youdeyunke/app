let request = require('../utils/request.js');

/**
 * 海报模块 
 */

// 查询楼盘海报背景图片列表    1 
export function  gettPosterList(){
  return request.get("/api/v6/poster_templates");
}