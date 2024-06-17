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
const app = getApp()
// 请修改为您自己的服务端地址，服务端安装请参考文档：http://doc.youdeyunke.com/zhunbei.html
//const apiHost = 'https://demo.youdeyunke.com';

const apiHost = 'http://udyk.natapp1.cc'

//const apiHost = 'https://m.kexuezhaofang.com'

// 唐山，租购并举
//const apiHost = 'https://lnfy.ts-est.com'

//const apiHost = 'https://qmyx.hbsrkj.com'

// 红城房交会
//const apiHost = 'https://mp.gaiya.com.cn'
const throttle = require('./throttle');

// 发送http请求
const http = ({
    url = '',
    data = {},
    ...other
} = {}) => {
    var header = {
        'content-type': 'application/json',
    }
    if (!header["Content-Type"]) {
        header["Content-Type"] = "application/json";
    }

    if (wx.getStorageSync('token')) {
        header.Authorization = 'Bearer ' +  wx.getStorageSync('token');
    }
    return new Promise((resolve, reject) => {
        wx.request({
            url: getUrl(url),
            data: data,
            header: header,
            ...other,
            success: function (res) {
                if (res.data.status == 500) {
                    wx.showModal({
                        title: "服务器错误",
                        content: "服务器出错了，请稍后重试",
                        success: function () {
                            return resolve(res);
                        },
                    });
                    wx.hideLoading()
                    return;
                }

                if ([2000, 2001].includes(res.data.status)) {
                    // token 过期,清空当前登录状态
                    // auth.gotoAuth("需要登录", "请先登录账号");
                    throttle.throttle(function () {
                        wx.hideLoading()
                        wx.navigateTo({
                            url: '/pkgAuth/pages/auth/index'
                        })
                    }, 1000)()
                    return resolve(res);
                }
                var error = res.data.error || res.data.message;
                if (res.data.status == 1 && error) {
                    wx.showModal({
                        title: "温馨提示",
                        content: error,
                        showCancel: false,
                        confirmText: "知道了",
                        success: function () {
                            return resolve(res);
                        }
                    });
                    return;
                }

                var t = app && app.globalData && app.globalData.myconfigs && app.globalData.myconfigs.timeout ? app.globalData.myconfigs.timeout : 0

                setTimeout(function () {
                    // 加载完成后
                    resolve(res)
                    wx.hideLoading();
                    wx.hideNavigationBarLoading();
                    wx.stopPullDownRefresh();
                }, t)
            },
            fail: function (res) {
                wx.hideNavigationBarLoading();
                wx.stopPullDownRefresh();
                wx.hideLoading();
                wx.hideToast();
            },
            complete: function () { }
        });

    })
}
// 判断是否需要拼接请求头
const getUrl = (url) => {
    if (url.indexOf('://') == -1) {
        url = apiHost + url;
    }
    return url
}


// get请求
const get = (url, data = {}) => {
    return http({
        url,
        data
    })
}
//   post请求
const post = (url, data = {}) => {
    return http({
        url,
        data,
        method: 'post'
    })
}
const put = (url, data = {}) => {
    return http({
        url,
        data,
        method: 'put'
    })
}

const destroy = (url, data = {}) => {
    return http({
        url,
        data,
        method: 'DELETE'
    })
}
module.exports = {
    get,
    post,
    put,
    destroy,
    getUrl,
    apiHost
}
