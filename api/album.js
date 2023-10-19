let request = require('../utils/request.js');

/** 
 * album模块接口
 * **/

// 拉取album详细信息   完成
export function getAlbumDetail(albumId){
    return request.get("/api/v6/albums/" +albumId );
}

