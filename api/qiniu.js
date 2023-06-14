let request = require('../utils/request.js');
/**
 * 七牛云存储相关接口
 */


// 生成七牛上传的token   1 
export function  genQiniuToken(){
    return request.post("/api/v1/qiniu_token");
}