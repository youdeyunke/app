let request = require('../utils/request.js');

// 更新用户信息(avatar/name)
export function updateUserProfile(userId,profile){
    // profile like {name:xxx, name: xxx}
    request.put("/api/v1/users/" + userId, {profile: profile});
}



// app.request({
//     method: 'POST',
//     url: '/api/v1/users/bind_xcx_mobile',
//     data: {
//       'iv': e.detail.iv,
//       'encryptedData': e.detail.encryptedData
//     },


// app.request({
//     url: '/api/v1/users/update_avatar',
//     data: {
//         avatar: url
//     },
//     method: 'POST',



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