let request = require('../utils/request.js');

/** 
 * 二维码模块接口
 * **/

// 拉取二维码详细信息
export function getQrDetail( qrId){
    return request.get("/api/v1/qrs/" + qrId );
}