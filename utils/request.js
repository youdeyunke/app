var api =require("./api")
// 获取腾讯地图
export let qqmap =(param) => api.get("https://apis.map.qq.com/ws/place/v1/search",param)