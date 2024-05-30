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
module.exports = {
    functionHandle: function (config) {
        switch (config.function) {
            case 'location':
                // 导航到位置
                wx.openLocation({
                    name: config.locationName,
                    latitude: config.locationLat,
                    longitude: config.locationLng,
                })
                break;
            case 'call':
                var phone = config.phone
                if (!phone) {
                    return
                }
                wx.makePhoneCall({
                    phoneNumber: phone,
                    fail: function (res) {
                        // pass
                    }
                });
                break;
            case 'modal':
                wx.showModal({
                    title: config.modalTitle || '提示',
                    content: config.modalContent,
                    showCancel: false,
                })
                break;
            case 'logout':
                wx.showModal({
                    title: '退出登录',
                    content: '确定需要退出当前登录的账号吗？',
                    confirmText: '退出',
                    confirmColor: '#00ae66',
                    showCancel: true,
                    success (res) {
                        if (res.confirm) {
                            wx.setStorageSync('userInfo', null)
                            wx.setStorageSync('token', null)
                            app.globalData.userInfo = null
                            app.globalData.token = null
                            app.globalData.LOGIN_FLAG = 0
                            wx.reLaunch({
                              url: '/pages/myself/index',
                            })
                        }
                    }
                })
                break;
            case 'authsetting':
                wx.openSetting({
                    success (res) {
                        console.log(res.authSetting)
                        // res.authSetting = {
                        //   "scope.userInfo": true,
                        //   "scope.userLocation": true
                        // }
                    }
                })
                break;
        }
    },

    weappHandle: function (config) {
        //  打开另外一个小程序
        var appid = config.appid
        var path = config.apppath
        wx.navigateToMiniProgram({
            appId: appid,
            path: path,
        })
    },

    webHandle: function (config) {
        var url = config.url
        app.gotoWebview(url)
    },

    pageHandle: function (config) {
        var path = config.path
        var ot = config.opentype || 'navigateTo'

        switch (ot) {
            case 'switchTab':
                wx.switchTab({
                    url: path,
                });
                break;

            case 'navigateBack':
                wx.navigateBack({
                    delta: -1,
                })
                break;

            case 'navigateTo':
                wx.navigateTo({
                    url: path,
                    fail: function () {
                        wx.showToast({
                            icon: 'none',
                            title: '页面不存在',

                        })
                    },
                });
                break;

            case 'redirectTo':
                wx.redirectTo({
                    url: path,
                    fail: function () {
                        wx.showToast({
                            icon: 'none',
                            title: '页面不存在',
                        })
                    }
                })
                break;
        }
    },

    clickHandle: function (config) {
        // 点击按钮后，根据link对象，决定做和操作
        if (!config) {
            return
        }

        switch (config.cat) {
            case 'page':
                this.pageHandle(config)
                break;
            case 'web':
                this.webHandle(config)
                break;
            case 'weapp':
                this.weappHandle(config);
                break;
            case 'function':
                this.functionHandle(config)
                break;
        }
    },
}