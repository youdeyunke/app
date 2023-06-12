let request = require('../utils/request.js');

/**
 * 海报模块 
 */

// 查询楼盘海报背景图片列表
export function  gettPosterList(pid){
  return request.get("/api/v1/poster_templates", {post_id:pid});
}