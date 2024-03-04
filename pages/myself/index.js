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
const app = getApp()
const userApi = require("../../api/user")
const myselfApi = require('../../api/myself')
var auth = require('../../utils/auth.js');
const T = require('../../utils/test.js');


Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        headerBg: "",
        score: 0,
        // userIcons: [
        //     {
        //         name: '我的收藏1',
        //         iconKey: '18',
        //         url: '/pkgMyself/pages/favposts/index'
        //     },
        //     {
        //         name: '我的订阅',
        //         iconKey: '4',
        //         url: '/pkgMyself/pages/eventposts/index'
        //     },
        //     {
        //         name: '浏览历史',
        //         iconKey: '12',
        //         url: '/pkgMyself/pages/history/index'
        //     },
        //     {
        //         name: '我的预约',
        //         iconKey: '20',
        //         url: '/pkgMyself/pages/booking/index'
        //     },
        //     {
        //         name: '我的问答',
        //         iconKey: '19',
        //         url: '/pkgMyself/pages/qa/index'
        //     },
        //     //{name: '我的评论', iconKey: '19',url: '/pkgMyself/pages/comments/index'},
        //     {
        //         name: '我的卡券',
        //         iconKey: '22',
        //         url: '/pkgMyself/pages/coupons/index'
        //     },
        // ],

        // brokerIcons: [{
        //         name: '主营楼盘1',
        //         iconKey: '2',
        //         handle: "gotoPost",
        //     },
        //     {
        //         name: '我的主页',
        //         iconKey: '13',
        //         handle: "gotoProfile"
        //     },
        //     {
        //         name: '客户线索',
        //         iconKey: '27',
        //         url: '/pkgAdmin/pages/clue/home'
        //     },
        //     {
        //         name: '我的海报',
        //         iconKey: '24',
        //         url: '/pkgBroker/pages/broker/qr'
        //     },
        //     {
        //         name: '报备客户',
        //         iconKey: '23',
        //         url: '/pkgFenxiao/pages/fenxiao/report'
        //     },
        //     {
        //         name: '历史报备',
        //         iconKey: '22',
        //         url: '/pkgFenxiao/pages/fenxiao/index'
        //     },
        // ],

        cache: '0 kb', // cache value

        n: 0
    },

    gotoLoginPage: function (e) {
        wx.navigateTo({
            url: '/pkgAuth/pages/auth/index',
        })
    },

    gotoPost: function () {
        if (!this.data.userInfo.post_id) {
            wx.showToast({
                icon: 'none',
                title: '当前账号未绑定主营楼盘，请联系管理员绑定',
            })
            return
        }
        var url = '/pkgAdmin/pages/fangyuan/show?id=' + this.data.userInfo.post_id
        wx.navigateTo({
            url: url
        })
    },

    gotoProfile: function () {
        var url = '/pkgBroker/pages/broker/profile?id=' + this.data.userInfo.id
        wx.navigateTo({
            url: url
        })
    },

    doUpdate: function (userInfo) {
        var url = userInfo.avatarUrl
        //   ？？  该方法最终未调用
        userApi.updateAvatar(url).then((resp) => {
            if (resp.data.status == 0) {
                wx.showToast({
                    icon: 'none',
                    title: '微信头像同步成功',
                    duration: 2000,
                })
            }
        })
    },

    clearCache: function (e) {
        var _this = this
        wx.showModal({
            title: '操作提示',
            content: '确定要清除缓存吗，清除缓存后，小程序将会自动重启',
            success (res) {
                if (res.confirm) {
                    _this._clearCache(e)
                } else if (res.cancel) { }
            }
        })
    },

    _clearCache: function (e) {
        var _this = this
        var _keys = ['userInfo', 'token', 'myconfigs', 'location']
        var keys = this.data.cache.keys
        var cache = this.data.cache
        keys.forEach(function (key, i) {
            var remove = true
            _keys.forEach(function (_key, j) {
                if (_key == key) {
                    remove = false
                }
            })
            if (remove) {
                wx.removeStorage({
                    key: key
                })
                console.log('remove', key, remove)
            }
        })
        wx.showToast({
            title: '缓存已清除',
            icon: 'none',
            duration: 2000,
            success: function () {
                wx.reLaunch({
                    url: '/pages/home/home'
                })
            },
        })
    },


    loadCacheInfo: function () {
        var _this = this
        wx.getStorageInfo({
            success (res) {
                _this.setData({
                    cache: res
                })
            }
        })
    },

    openAuthSetting: function (e) {
        wx.openSetting({
            success (res) {
                console.log(res.authSetting)
                // res.authSetting = {
                //   "scope.userInfo": true,
                //   "scope.userLocation": true
                // }
            }
        })
    },

    navigatetTo: function (e) {
        console.log('e', e)
        var url = e.currentTarget.dataset.url
        console.log("url", url);
        wx.navigateTo({
            url: url,
        })
    },


    logoutHandle: function (e) {
        var _this = this
        wx.showModal({
            title: '退出登录',
            content: '确定需要退出当前登录的账号吗？',
            confirmText: '退出',
            confirmColor: '#00ae66',
            showCancel: true,
            success (res) {
                if (res.confirm) {
                    _this._logoutHandle()
                }
            }
        })
    },

    _logoutHandle: function () {
        wx.setStorageSync('userInfo', null)
        wx.setStorageSync('token', null)
        this.setData({
            userInfo: null
        })
        this.setData({
            userInfo: null
        })
        app.globalData.userInfo = null
        app.globalData.token = null
        app.globalData.LOGIN_FLAG = 0
        this.loadIcons()
    },

    syncAvatar: function (e) {
        var _this = this
        wx.showModal({
            title: '提示',
            cancelText: "取消",
            confirmText: "同步",
            content: '确认要同步微信头像吗？',
            success (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    _this._syncAvatar(e)

                }
            }
        })
    },

    callService: function (e) {
        var n = this.data.configs['service_mobile']
        wx.makePhoneCall({
            phoneNumber: n,
        })
    },

    _syncAvatar: function (e) {
        var _this = this
        wx.getSetting({
            success (res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: function (res) {
                            console.log(res.userInfo)
                            _this.doUpdate(res.userInfo)
                        }
                    })
                } else {
                    wx.showToast({
                        title: '请先允许授权',
                        duration: 2000,
                        icon: 'none',
                        mask: true,
                        success: function () {
                            wx.openSetting()
                        },
                    })
                }
            }
        })
    },

    getPhoneNumber: function (e) {

        if (!e.detail.iv) {
            this.setData({
                mobile: ' '
            })
            return false
        }

        if (this.data.mobile) {
            return false
        }

        wx.showLoading({
            title: '处理中',
            mask: true
        })
        var token = wx.getStorageSync('token')
        var that = this
        // ？？  该方法未调用
        userApi.bindXcxMobile(e.detail.iv, e.detail.encryptedData).then((res) => {
            if (res.data.status != 0) {
                wx.showModal({
                    content: '服务器出现错误，请稍后再试',
                    showCancle: false
                })
            } else {
                // 绑定手机号成功
                that.setData({
                    userInfo: res.data.data
                })
                wx.setStorageSync('userInfo', res.data.data)
                console.log(that.data.mobile)
                wx.showToast({
                    title: '绑定手机号成功',
                })
                app.loginBack()
            }
        })
    },

    gotoSetting: function (e) {
        wx.navigateTo({
            url: '/pages/myself/setting'
        })
    },


    loginHandle: function (e) {
        var _this = this
        auth.loginHandle(this, e, function (u) { })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var _this = this
        app.ensureConfigs(function (configs) {
            _this.setData({
                configs: configs
            })
        })
        var token = app.globalData.token
        // 如果是别人邀请注册的，就记录下referrer_id，注册时携带referrer_id
        if (q.referrer_id && q.referrer_id.length > 0) {
            console.log("推荐人的id 为", q.referrer_id)
            wx.setStorageSync('referrer_id', q.referrer_id)
            // 如果当前账号没有登录，就弹出收到邀请的提示
            if (!token) {
                wx.showModal({
                    title: '邀请注册',
                    content: '您收到了好友的注册邀请，是否现在注册？',
                    showCancel: true,
                    cancelText: '取消',
                    cancelColor: '#000000',
                    confirmText: '马上注册',
                    confirmColor: '#1989fa',
                    success: (result) => {
                        if (result.confirm) {
                            _this.gotoLoginPage()
                        }
                    },
                    fail: () => { },
                    complete: () => { }
                });
            }
        }
        this.loadCacheInfo()

        this.loadIcons()
    },

    loadIcons () {
        var _this = this
        myselfApi.getMyselfIcons().then((resp) => { 
            if (resp.data.code != 0) {
              return
            }
            var icons = resp.data.data
            var resIcons = []
            icons.forEach((icon) => {
                //循环icon.items，给每个对象都加上is_blank字段
                icon.items.forEach((item) => {
                    item.is_blank = false
                })
                //如果icon.items长度小于4，就将item填充到4个，如果icons.items.length大于5，就将item填充到5的倍数
                if (icon.items.length == 1) {
                    // for (let i = icon.items.length; i < 4; i++) {
                        icon.items.push({
                            url: '',
                            name: '',
                            icon_url: '',
                            is_blank: true
                        })
                    // }
                } else if (icon.items.length > 5) {
                    let length = icon.items.length
                    for (let i = length; i % 5 != 0; i++) {
                        icon.items.push({
                            url: '',
                            name: '',
                            icon_url: '',
                            is_blank: true
                        })
                    }
                }
                resIcons.push(icon)
            })
            _this.setData({
                myselfIcons: resIcons
            })
        })
    },

    saomaHandle: function () {
        wx.scanCode({
            success (res) {
                var path = res.result || res.path
                if (path == undefined) {
                    wx.showToast({
                        title: '二维码无效',
                        icon: 'none'
                    })
                    return
                }
                if (!path.startsWith('/')) {
                    path = '/' + path
                }
                wx.navigateTo({
                    url: path,
                })
            }
        })
    },



    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },



    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setPage('/pages/myself/index')
        }

        var _this = this
        var user = wx.getStorageSync('userInfo');
        this.setData({
            userInfo: user
        })
        this.loadIcons()
    },
    myQuit: function (e) {
        this.setData({
            userInfo: null
        })
        auth.logout()

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */

    onPullDownRefresh: function () {
        // 下拉刷新用户信息
        if (app.globalData.LOGIN_FLAG != 1) {
            console.log("当前用户未登录，不刷新")
            return false;
        }
        var _this = this;
        userApi.getMyselfInfo().then((resp) => {
            if (resp.data.code != 0) {
                return;
            }
            var user = resp.data.data;
            // 写入storage
            wx.setStorageSync('userInfo', user);
            _this.setData({
                userInfo: user
            });
        })
    },


    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    domain: function () {
        var _this = this
        this.data.n++
        if (this.data.n >= 10) {
            wx.navigateTo({
                url: '/pkgDebug/pages/debug/index',
                success: function () {
                    _this.setData({
                        n: 0
                    })
                }
            })
        }
    }
})