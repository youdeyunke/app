/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自有软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
let request = require('../utils/request.js');

// 更新用户信息(avatar/name)     1
export function updateUserProfile (profile) {
    // profile like {name:xxx, name: xxx}
    return request.put("/api/v6/users/myself", profile);
}

// 完成
export function bindXcxMobile (iv, encryptedData) {
    return request.post("/api/v1/users/bind_xcx_mobile", { iv: iv, encryptedData: encryptedData });
}


// 完成 未用到
export function updateAvatar (url) {
    return request.post("/api/v1/users/update_avatar", { avatar: url });
}

// 拉取当前账号的基本信息  完成
export function getMyselfInfo () {
    return request.get("/api/v6/users/myself");
}

// 查询用户信息   1
export function getUserProfileDetail (upId) {
    return request.get("/api/v1/user_profiles/" + upId);
}

// 更新用户信息   1
export function updateUserProfileDetail (info) {
    return request.put("/api/v1/user_profiles/" + info.id, info);
}

