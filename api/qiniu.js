let request = require('../utils/request.js');
/**
 * 七牛云存储相关接口
 */


// 生成七牛上传的token   未发现
export function  genQiniuToken(){
    return request.post("/api/v1/qiniu/token");
}