// 封装七牛云前端直接上传功能

const app = getApp()
let request = require("../utils/request.js")


module.exports = {
    upload: function(filePath, cb){
        // 拉取服务端配置信息
        var _this = this
        wx.showLoading({title: '上传中', mask: true})
        app.ensureConfigs((conf) => {
            cdnDomain = conf['cdn_domain']
            if(conf['cdn_https'] == true){
                cdnProtoco = 'https'
            }
            return _this._upload(filePath, cb)
        })
    },

    _upload: function(filePath, cb){
       
        var header={
          Authorization: wx.getStorageSync('token')
        }
        var url=request.getUrl("/api/v6/upload")
         // 将本地资源上传到服务器。
        wx.uploadFile({
          url: url,
          filePath: filePath,
          header:header,
          name: 'file',
          success: function(resp){
              wx.hideLoading()
              if(resp.statusCode == 200 && resp.errMsg == "uploadFile:ok"){
               if(resp.data) {
                var url = JSON.parse(resp.data).data.url
                return typeof cb == 'function' && cb(url)
               }
              }else{
                wx.showToast({
                  title: "上传文件失败",
                  icon: "none",
                  duration: 2000,
                });
              }
          }
      })
    }

}
