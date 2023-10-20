let request = require('../utils/request.js');

/** 
 * 楼盘相册模块接口
 * **/


//  拉取相册   完成
export function getMediaCatList( query){
    return request.get("/api/v6/media_cats/" ,query );
}

// 删除相册   完成
export function deleteMediaCat( mediaCatId){
    return request.destroy("/api/v6/media_cats/"  + mediaCatId );
}

// 新建相册  完成
export function createMediaCat( data ){
    return request.post("/api/v6/media_cats/" , data);
}

// 修改相册   完成
export function updateMediaCat( catData ){
    return request.put("/api/v6/media_cats/" + catData.id , catData);
}

// 删除相册下的照片  完成
export function deleteMediaItem( mediaItemId){
    return request.destroy("/api/v6/media_items/"  + mediaItemId );
}

// 在相册中增加照片  完成
export function createMediaItem(data){
    // var data = {cat_id: mediaCatId, type: mediaType, url: mediaUrl}
    return request.post("/api/v6/media_items/" , data );
}