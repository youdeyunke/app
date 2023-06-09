// 封装七牛云前端直接上传功能

const app = getApp()
// console.log("121qiniu_app",app);
var  cdnDomain = 'qiniucdn.udeve.cn'
var  cdnProtoco = 'http'

module.exports = {
    genUrl: function(key){
        return cdnProtoco + "://" + cdnDomain + '/' + key
    },

    getToken: function(cb){
        app.request({
            url: '/api/v1/qiniu_token/',
            method: 'POST',
            hideLoading: true,
            success: function(resp){
                var token = resp.data.data.token
                var key = resp.data.data.key
                return cb(token, key)
            }
        })
    },

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
        var _this = this
        this.getToken( function(token, key){
            var formData = {token: token, key: key}
            wx.uploadFile({
                url: 'https://up.qbox.me',
                filePath: filePath,
                name: 'file',
                formData: formData,
                success: function(resp){
                    wx.hideLoading()
                    console.log('qiniu resp', resp, 'formdata', formData )
                    if(resp.statusCode == 200 && resp.errMsg == "uploadFile:ok"){
                      var url =  _this.genUrl(key)
                      console.log('upload to qiniu success,url is:', url)
                      return typeof cb == 'function' && cb(url)
                    }else{
                      wx.showToast({
                        title: "上传文件失败",
                        icon: "none",
                        duration: 2000,
                      });
                    }
                }
            })
        })
    }

}
