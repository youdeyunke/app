let request = require('../utils/request.js');

export function getPostList(data){
    return request.get("/api/v2/posts", data);
}