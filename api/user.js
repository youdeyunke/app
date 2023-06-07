let request = require('../utils/request.js');

// 更新用户信息(avatar/name)
export function updateUserProfile(userId,profile){
    // profile like {name:xxx, name: xxx}
    request.put("/api/v1/users/" + userId, {profile: profile});
}