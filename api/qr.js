let request = require('../utils/request.js');

/** 
 * 二维码模块接口
 * **/

// 拉取二维码详细信息  完成
export function getQrDetail( qrId){
    return request.get("/api/v1/qrs/" + qrId );
}


// 缺1
// this.request({
//     url: '/api/v1/qrs/',
//     method: 'POST',
//     hideLoading: false,
//     data: {
//         path: path,
//         qr_data: extData
//     },
// 生成一张带数据的二维图片
export function createQrImage(path, extData){
    return request.post("/api/v1/qrs/", {
        path: path,
        qr_data: extData
    });
}