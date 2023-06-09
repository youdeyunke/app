let request = require('../utils/request.js');


// 拉取装修情况列表   完成
export function getBookingList (){
    return request.get("/api/v1/fitments/");
}
