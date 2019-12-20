// 封装七牛云前端直接上传功能

const app = getApp()


module.exports = {

    cdnDomain: 'qiniucdn.udeve.cn',

    genUrl: function(key){
        return "https://" + this.cdnDomain + '/' + key
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
        var _this = this
        this.getToken( function(token, key){
            var formData = {token: token, key: key}
            wx.uploadFile({
                url: 'https://up.qbox.me',
                filePath: filePath,
                name: 'file',
                formData: formData,
                success: function(resp){
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
