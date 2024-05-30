/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
// 封装七牛云前端直接上传功能

const app = getApp()
let request = require("./request.js")
const throttle = require('./throttle');


module.exports = {
    upload: function (filePath, cb) {
        wx.showLoading({
            title: '上传中',
            mask: true
        })
        var header = {
            Authorization: 'Bearer ' +  wx.getStorageSync('token'),
        }
        var url = request.getUrl("/api/v6/upload")
        // 将本地资源上传到服务器。
        wx.uploadFile({
            url: url,
            filePath: filePath,
            header: header,
            name: 'file',
            success: function (resp) {
                var Data = JSON.parse(resp.data)
                wx.hideLoading()
                // if (resp.statusCode == 200 && resp.errMsg == "uploadFile:ok") {
                //     if (resp.data) {
                //         var url = Data.data.url
                //         return typeof cb == 'function' && cb(url)
                //     }
                // }
                if (Data.code == 2000 || Data.status == 2000 || Data.code == 2001 || Data.status == 2001) {
                    throttle.throttle(function () {
                        wx.hideLoading()
                        wx.navigateTo({
                            url: '/pkgAuth/pages/auth/index'
                        })
                    }, 1000)()
                } else if (resp.statusCode == 200 && resp.errMsg == "uploadFile:ok") {
                    if (resp.data) {
                        var url = Data.data.url
                        return typeof cb == 'function' && cb(url)
                    }
                } else {
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