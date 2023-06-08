let request = require('../utils/request.js');

// 更新用户信息(avatar/name)
export function updateUserProfile(userId,profile){
    // profile like {name:xxx, name: xxx}
    request.put("/api/v1/users/" + userId, {profile: profile});
}


export function  bindXcxMobile(iv, encryptedData){
    request.post("/api/v1/users/bind_xcx_mobile", {iv: iv, encryptedData: encryptedData});
}

// app.request({
//     method: 'POST',
//     url: '/api/v1/users/bind_xcx_mobile',
//     data: {
//       'iv': e.detail.iv,
//       'encryptedData': e.detail.encryptedData
//     },


export function updateAvatar(imageUrl){ 
    request.post("/api/v1/users/update_avatar", {avatar: url});
}

// app.request({
//     url: '/api/v1/users/update_avatar',
//     data: {
//         avatar: url
//     },
//     method: 'POST',


// 拉取当前账号的基本信息
export function  getMyselfInfo(){
    request.get("/api/v1/users/myself");
}

// const that = getApp()
// that.request({
//     url: '/api/v1/users/myself',
//     hideLoading: true,
//     success: function (resp) {
//         if (resp.data.status == 0) {
//             var user = resp.data.data
//             typeof cb == "function" && cb(user)
//         }
//     },