let request = require('../utils/request.js');

/** 
 * 自定义页面模块接口
 * **/

// 拉取Page详细信息
export function getPageDetail(pageIdOrKey){
    return request.get("/api/v1/pages/" +pageIdOrKey );
}

// app.request({
//     url: '/api/v1/pages/' + v,
//     hideLoading: true,
//     data: q,
//     success: function (resp) {
//         var data = resp.data.data
//         _this.setData({
//           loading: false,
//           modules: data.modules,
//           pageConfig: data.config,
//         })
//         _this.setNavbar(data.config)
//         _this.triggerEvent('ready', data.config)
//     }
//   })

