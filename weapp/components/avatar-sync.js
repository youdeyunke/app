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
const upload = require("../utils/upload")
const userApi = require("../api/user")
// components/avatar-sync.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        syncAvatar (e) {
            console.log("e", e)
            // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
            // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
            var _this = this
            wx.getUserProfile({
                desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                success: (res) => {
                    var info = res.userInfo
                    console.log('userinfo', info)
                    var avatar = info.avatarUrl
                    // 上传到自己cdn，防止制作海报时候无法生成图片
                    var _this = this
                    wx.downloadFile({
                        url: avatar,
                        success: function (res) {
                            //  上传到自己服务器
                            console.log('头像下载到本地', res)
                            upload.upload(res.tempFilePath, function (url) {
                                info.avatarUrl = url
                                console.log('头像已上传到cdn ', url)
                                _this.doUpdate(info)
                            })


                        }
                    })


                }
            })
        },



        doUpdate: function (userInfo) {
            var user = app.globalData.userInfo
            var profile = {
                avatar: userInfo.avatarUrl,
                name: userInfo.nickName,
            }
            var _this = this
            userApi.updateUserProfile(user.id, profile).then((resp) => {
                if (resp.data.status == 0) {
                    _this.triggerEvent('change', {})
                    wx.showToast({
                        icon: 'none',
                        title: '微信头像同步成功',
                        duration: 2000,
                    })
                }
            })
        },

        _syncAvatar: function (e) {
            var _this = this
            wx.showModal({
                title: '提示',
                cancelText: "取消",
                confirmText: "同步",
                content: '确认要同步微信头像和昵称吗？',
                success (res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                        _this._syncAvatar(e)

                    }
                }
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

    }
})