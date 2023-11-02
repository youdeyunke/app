/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
let request = require('../utils/request.js');

//完成
export function createScore (key) {
    // TODO 停用此接口，用share.js替代；
    console.log("注意：createScore接口已经停用，用share.js替代");
    return request.post("/api/v1/scores", { key: key });
}
// 完成
export function getScoreList (data) {
    return request.get("/api/v6/scores", data);
}
