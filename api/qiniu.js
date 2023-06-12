let request = require('../utils/request.js');
/**
 * 七牛云存储相关接口
 */


// 生成七牛上传的token
export function  genQiniuToken(){
    return request.get("/api/v1/qiniu/token");
}