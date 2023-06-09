let request = require('../utils/request.js');

// 更新用户信息(avatar/name)     未找到
export function updateUserProfile(userId,profile){
    // profile like {name:xxx, name: xxx}
    return  request.put("/api/v1/users/" + userId, {profile: profile});
}

// 完成
export function  bindXcxMobile(iv, encryptedData){
    return   request.post("/api/v1/users/bind_xcx_mobile", {iv: iv, encryptedData: encryptedData});
}


// 完成
export function updateAvatar(url){ 
    return   request.post("/api/v1/users/update_avatar", {avatar: url});
}



// 拉取当前账号的基本信息  完成
export function getMyselfInfo(){
    return request.get("/api/v1/users/myself");
}
